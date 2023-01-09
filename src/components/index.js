import '../pages/index.css';
import { enableValidation, hideInputError } from './validate.js';
import { openPopup, closePopup } from './modal.js';
import { getCard, getInfo, addInfo, addCard, addAvatar, deleteCard } from './api.js';
import { renderCard } from './card.js'
import { createProfile } from './utils.js'

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
export const profileAvatar = document.querySelector('.profile__avatar-picture');
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
    btnAvatar.textContent = 'Сохранение...';
    console.log(popupInputAvatar.value)
    addAvatar(popupInputAvatar.value)
        .then((res) => {
            console.log(res);
            profileAvatar.src = popupInputAvatar.value;
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        })
        .finally(() => {
            closePopup(popupAvatar);
            btnAvatar.textContent = 'Сохранить';
        });

});

popupFormEditCard.addEventListener('submit', (event) => {
    event.preventDefault();
    btnSave.textContent = 'Сохранение...';
    addInfo(popupInputName.value, popupInputText.value)
        .then((res) => {
            console.log(res);
            profileTitle.textContent = popupInputName.value;
            profileSubtitle.textContent = popupInputText.value;
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        })
        .finally(() => {
            closePopup(popupEditProfile);
            btnSave.textContent = 'Сохранить';
        });
});

popupFormAddCard.addEventListener("submit", (event) => {
    event.preventDefault();
    btnSubmit.textContent = 'Сохранение...';
    addCard(popupInputPlace.value, popupInputUrl.value)
        .then((res) => {
            console.log(res);
            renderCard(res)
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        })
        .finally(() => {
            closePopup(popupAddCard);
            btnSubmit.textContent = 'Сохранить';
        });
});

getInfo()
    .then((result) => {
        // console.log(result)
        idUser = result._id;
        createProfile(result);

    })
    .catch((err) => {
        console.log(`Ошибка: ${err}`);
    });

getCard()
    .then((result) => {
        // console.log(result)
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