import '../pages/index.css';
import { enableValidation, hideInputError } from './validate.js';
import { openPopup, closePopup } from './modal.js';
import { getCard, getInfo, addInfo, addCard, addAvatar } from './api.js';
import { handleDeleteCard, renderCard } from './card.js'
import { createProfile, renderLoading } from './utils.js'

export let idUser;
const popupInputPlace = document.querySelector('.popup__input_place');
const popupInputUrl = document.querySelector('.popup__input_url');
const popupInputName = document.querySelector('.popup__input_name');
const popupInputText = document.querySelector('.popup__input_text');
const popupInputAvatar = document.querySelector('.popup__input_avatar')
const buttonOpenPopupCardEdit = document.querySelector('.profile__edit-button');
const buttonOpenPopupCardAdd = document.querySelector('.profile__add-button');
const buttonOpenPopupAvatar = document.querySelector('.profile__avatar-overlay');
const popupFormAddCard = document.querySelector('.popup__form_add-card');
const popupFormEditCard = document.querySelector('.popup__form_edit-profile')
const popupFormAvatar = document.querySelector('.popup__form_avatar');
export const profileTitle = document.querySelector('.profile__title');
export const profileSubtitle = document.querySelector('.profile__subtitle');
export const popupDelete = document.querySelector('.popup_delete');
const popupFormDelete = document.querySelector('.popup__form_delete')
const profileAvatar = document.querySelector('.profile__avatar-picture');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddCard = document.querySelector('.popup_add-card');
const popupAvatar = document.querySelector('.popup_avatar');
const btnSubmit = document.querySelector('.popup__btn_submit');
const btnSave = document.querySelector('.popup__btn_save');
const btnAvatar = document.querySelector('.popup__btn_avatar');
const subSettings = { inputErrorClass: 'popup__input_type_error', errorClass: 'form__input-error_active', inactiveButtonClass: 'popup__btn_inactive' };
const { inactiveButtonClass, inputErrorClass, errorClass } = subSettings

buttonOpenPopupAvatar.addEventListener('click', function () {
    btnAvatar.classList.add(inactiveButtonClass);
    btnAvatar.setAttribute('disabled', true);
    popupInputAvatar.value = '';
    hideInputError(popupFormAvatar, popupInputAvatar, { inputErrorClass, errorClass });
    openPopup(popupAvatar);
});

buttonOpenPopupCardAdd.addEventListener('click', function () {
    btnSubmit.classList.add(inactiveButtonClass);
    btnSubmit.setAttribute('disabled', true);
    popupInputPlace.value = '';
    popupInputUrl.value = '';
    hideInputError(popupFormAddCard, popupInputPlace, { inputErrorClass, errorClass });
    hideInputError(popupFormAddCard, popupInputUrl, { inputErrorClass, errorClass });
    openPopup(popupAddCard);
});

buttonOpenPopupCardEdit.addEventListener('click', function () {
    popupInputName.value = profileTitle.textContent;
    popupInputText.value = profileSubtitle.textContent;
    btnSave.classList.remove(inactiveButtonClass);
    btnSave.removeAttribute('disabled');
    hideInputError(popupFormEditCard, popupInputName, { inputErrorClass, errorClass });
    hideInputError(popupFormEditCard, popupInputText, { inputErrorClass, errorClass });
    openPopup(popupEditProfile);
});

popupFormAvatar.addEventListener('submit', (event) => {
    event.preventDefault();
    profileAvatar.src = popupInputAvatar.value;
    // addAvatar();
    closePopup(popupAvatar);
});

popupFormEditCard.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log(event.target)
    profileTitle.textContent = popupInputName.value;
    profileSubtitle.textContent = popupInputText.value;
    renderLoading(true, event);
    addInfo(popupInputName.value, popupInputText.value)
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
            renderLoading(false, event)
        });
    closePopup(popupEditProfile);
});

popupFormAddCard.addEventListener("submit", (event) => {
    event.preventDefault();
    renderLoading(true, event);
    addCard(popupInputPlace.value, popupInputUrl.value)
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
            renderLoading(false, event);
        });

    setTimeout(() => {
        getCard()
            .then(res => {
                console.log(res.status, res.statusText);
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then((result) => {
                result.reverse().forEach((data) => {
                    if (data.name == popupInputPlace.value) {
                        renderCard(data)
                    }
                });
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            });
    }, "100")
    closePopup(popupAddCard);
});

export function addPopupFormDelete(value) {
    popupFormDelete.addEventListener("submit", (event) => {
        event.preventDefault();
        handleDeleteCard(value);
        closePopup(popupDelete);
    });
}

getInfo()
    .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => {
        idUser = result._id;
        createProfile(result);
    })
    .catch((err) => {
        console.log(`Ошибка: ${err}`);
    });

getCard()
    .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => {
        result.reverse().forEach((data) => renderCard(data));
    })
    .catch((err) => {
        console.log(`Ошибка: ${err}`);
    });

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__btn',
    inactiveButtonClass, inputErrorClass, errorClass
});