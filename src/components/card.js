import { openPopup, closePopup } from './modal.js'
import { createLike, deleteLike, deleteCard } from './api.js'
import { popupDelete, idUser } from './index.js'

const elements = document.querySelector(".elements__list");
const template = document.querySelector("#element").content.querySelector(".element");
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const popupPicture = document.querySelector('.popup_picture');
const popupBtnDeleteConfirm = document.querySelector('.popup__btn_delete')

const createCard = (data) => {
    const card = template.cloneNode(true);
    const elementFindImage = card.querySelector(".element__image");
    const elementBtnTrash = card.querySelector(".element__button-trash");
    card.querySelector(".element__title").textContent = data.name;
    card.setAttribute('id', data._id);
    elementFindImage.src = data.link;
    elementFindImage.alt = data.name;
    if (data._id) {
        makeLikes(data, card);
        if (data.likes.length !== 0) {
            card.querySelector('.element__count-heart').textContent = data.likes.length
        }
        if (data.owner._id !== idUser) {
            elementBtnTrash.remove();
        } else {
            elementBtnTrash.addEventListener("click", function gg(evt) {
                evt.preventDefault();
                confirmDeleteCard(card);
                openPopup(popupDelete);
            })
        }
    }
    card.querySelector(".element__button-heart").addEventListener("click", handleActivateLikeCard);
    elementFindImage.addEventListener("click", () => handlePicture(data));
    return card;
};

const confirmDeleteCard = (card) => {
    if (document.querySelector('.sure_for_remove')) {
        document.querySelector('.sure_for_remove').classList.remove('sure_for_remove')
    }
    card.classList.add('sure_for_remove')
    popupBtnDeleteConfirm.addEventListener("click", confirmDeleteCardIsConfirm);
}

const confirmDeleteCardIsConfirm = (event) => {
    event.preventDefault();
    closePopup(popupDelete);
    confirmDeleteCardConfirmed(document.querySelector('.sure_for_remove'));
    popupBtnDeleteConfirm.removeEventListener("click", confirmDeleteCardIsConfirm)
}

const confirmDeleteCardConfirmed = (sureForRemove) => {
    popupBtnDeleteConfirm.textContent = 'Удаление...';
    deleteCard(sureForRemove.id)
        .then((res) => {
            console.log(res);
            sureForRemove.remove();
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        })
        .finally(() => {
            popupBtnDeleteConfirm.textContent = 'Да';
        });
}

const makeLikes = (data, card) => {
    data.likes.forEach((element) => {
        if (element._id === idUser) {
            card.querySelector('.element__button-heart').classList.add("element__button-heart_active")
        }
    })
}

const handleActivateLikeCard = (event) => {
    const counter = event.target.closest('.element__btn-count').querySelector('.element__count-heart');
    if (!event.target.classList.contains("element__button-heart_active")) {
        createLike(event.target.closest('.element').id)
            .then((res) => {
                console.log(res)
                event.target.classList.toggle("element__button-heart_active");
                counter.textContent = +counter.textContent + 1;
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
            .finally(() => {
            });
    } else {
        deleteLike(event.target.closest('.element').id)
            .then((res) => {
                console.log(res)
                event.target.classList.toggle("element__button-heart_active");
                counter.textContent = +counter.textContent - 1;
                if (counter.textContent == 0) {
                    counter.textContent = '';
                }
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
            .finally(() => {
            });
    }
};

const handlePicture = (data) => {
    popupImage.src = data.link;
    popupImage.alt = data.name;
    popupCaption.textContent = data.name;
    openPopup(popupPicture);
}

export const renderCard = (data) => {
    elements.prepend(createCard(data));
};