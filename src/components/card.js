import { openPopup } from './modal.js'
import { deleteCard, createLike, deleteLike } from './api.js'
import { popupDelete, idUser } from './index.js'

const elements = document.querySelector(".elements__list");
const template = document.querySelector("#element").content.querySelector(".element");
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const popupPicture = document.querySelector('.popup_picture');

const createCard = (data) => {
    const card = template.cloneNode(true);
    const elementFindImage = card.querySelector(".element__image");
    const elementBtnTrash = card.querySelector(".element__button-trash");
    card.querySelector(".element__title").textContent = data.name;
    card.setAttribute('id', data._id)
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
            elementBtnTrash.addEventListener("click", (event) => {
                openPopup(popupDelete, event);
            });
        }
    }
    card.querySelector(".element__button-heart").addEventListener("click", handleActivateLikeCard);
    elementFindImage.addEventListener("click", () => handlePicture(data));
    return card;
};

export const handleDeleteCard = (value) => {
    value.target.closest(".element").remove();
    deleteCard(value.target.closest('.element').id)
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        })
        .finally(() => {
        });
};

const makeLikes = (data, card) => {
    data.likes.forEach((element) => {
        if (element._id === idUser) {
            card.querySelector('.element__button-heart').classList.add("element__button-heart_active")
        }
    })
}

const handleActivateLikeCard = (event) => {
    event.target.classList.toggle("element__button-heart_active");
    const counter = event.target.closest('.element__btn-count').querySelector('.element__count-heart');
    if (event.target.classList.contains("element__button-heart_active")) {
        counter.textContent = +counter.textContent + 1;
        createLike(event.target.closest('.element').id)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
            .finally(() => {
            });
    } else {
        counter.textContent = +counter.textContent - 1;
        deleteLike(event.target.closest('.element').id)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
            .finally(() => {
            });
    }
    if (counter.textContent == 0) {
        counter.textContent = '';
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