import { openPopup, closePopup } from './modal.js'
import { createLike, deleteLike, deleteCard } from './api.js'
import { popupDelete, idUser } from './index.js'
import { renderLoading, handleError } from './utils.js'

const textYes = 'Да';
const textRemoving = 'Удаление...';
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
    const elementCountHeart = card.querySelector('.element__count-heart');
    const elementButtonHeart = card.querySelector('.element__button-heart');
    card.querySelector(".element__title").textContent = data.name;
    card.setAttribute('id', data._id);
    elementFindImage.src = data.link;
    elementFindImage.alt = data.name;
    makeLikesColor(data, elementCountHeart, elementButtonHeart);
    if (data.owner._id !== idUser) {
        elementBtnTrash.remove();
    } else {
        elementBtnTrash.addEventListener("click", (evt) => {
            evt.preventDefault();
            confirmDeleteCard(card);
            openPopup(popupDelete);
        })
    }
    elementButtonHeart.addEventListener("click", () => handleActivateLikeCard(elementCountHeart, elementButtonHeart));
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
    confirmDeleteCardConfirmed(document.querySelector('.sure_for_remove'));
    popupBtnDeleteConfirm.removeEventListener("click", confirmDeleteCardIsConfirm)
}

const confirmDeleteCardConfirmed = (sureForRemove) => {
    renderLoading(true, popupBtnDeleteConfirm, textYes, textRemoving);
    deleteCard(sureForRemove.id)
        .then((message) => {
            closePopup(popupDelete);
            sureForRemove.remove();
        })
        .catch(handleError)
        .finally(() => {
            renderLoading(false, popupBtnDeleteConfirm, textYes, textRemoving);
        });
}

const makeLikesColor = (data, elementCountHeart, elementButtonHeart) => {
    if (data.likes.length !== 0) {
        elementCountHeart.textContent = data.likes.length
    }
    data.likes.forEach((element) => {
        if (element._id === idUser) {
            elementButtonHeart.classList.add("element__button-heart_active")
        }
    })
}

const handleActivateLikeCard = (elementCountHeart, elementButtonHeart) => {
    if (elementButtonHeart.classList.contains("element__button-heart_active")) {
        deleteLike(elementButtonHeart.closest('.element').id)
            .then((cardData) => {
                elementButtonHeart.classList.remove("element__button-heart_active");
                elementCountHeart.textContent = cardData.likes.length;
                if (cardData.likes.length == 0) {
                    elementCountHeart.textContent = '';
                }
            })
            .catch(handleError)
    } else {
        createLike(elementButtonHeart.closest('.element').id)
            .then((cardData) => {
                elementButtonHeart.classList.add("element__button-heart_active");
                elementCountHeart.textContent = cardData.likes.length;
            })
            .catch(handleError)
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