import '../pages/index.css';
import { enableValidation, hideInputError } from './validate.js';
import { openPopup, closePopup } from './modal.js';
import { getCards, getUserInfo, addInfo, addCard, addAvatar, deleteCard } from './api.js';
import { renderCard } from './card.js'
import { setProfileData, renderLoading } from './utils.js'

export let idUser;
const textSave = 'Сохранить';
const textSaving = 'Сохранение...';
const textSubmit = 'Создать';
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
const popupBtnSubmit = document.querySelector('.popup__btn_submit');
const popupbtnSave = document.querySelector('.popup__btn_save');
const popupbtnAvatar = document.querySelector('.popup__btn_avatar');
const subSettings = { inputErrorClass: 'popup__input_type_error', errorClass: 'form__input-error_active', inactiveButtonClass: 'popup__btn_inactive' };
const { inactiveButtonClass, inputErrorClass, errorClass } = subSettings

buttonOpenPopupAvatar.addEventListener('click', function () {
    hideInputError(popupFormAvatar, popupInputAvatar, { inputErrorClass, errorClass });
    openPopup(popupAvatar);
});

buttonOpenPopupCardAdd.addEventListener('click', function () {
    hideInputError(popupFormAddCard, popupInputPlace, { inputErrorClass, errorClass });
    hideInputError(popupFormAddCard, popupInputUrl, { inputErrorClass, errorClass });
    openPopup(popupAddCard);
});

buttonOpenPopupCardEdit.addEventListener('click', function () {
    hideInputError(popupFormEditCard, popupInputName, { inputErrorClass, errorClass });
    hideInputError(popupFormEditCard, popupInputText, { inputErrorClass, errorClass });
    openPopup(popupEditProfile);
});

popupFormAvatar.addEventListener('submit', (event) => {
    event.preventDefault();
    renderLoading(true, popupbtnAvatar, textSave, textSaving);
    addAvatar(popupInputAvatar.value)
        .then((res) => {
            console.log(res);
            profileAvatar.src = popupInputAvatar.value;
            popupFormAvatar.reset();
            closePopup(popupAvatar);
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        })
        .finally(() => {
            renderLoading(false, popupbtnAvatar, textSave, textSaving);
        });
});

popupFormEditCard.addEventListener('submit', (event) => {
    event.preventDefault();
    renderLoading(true, popupbtnSave, textSave, textSaving);
    addInfo(popupInputName.value, popupInputText.value)
        .then((res) => {
            console.log(res);
            closePopup(popupEditProfile);
            profileTitle.textContent = popupInputName.value;
            profileSubtitle.textContent = popupInputText.value;
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        })
        .finally(() => {
            renderLoading(false, popupbtnSave, textSave, textSaving);
        });
});

popupFormAddCard.addEventListener("submit", (event) => {
    event.preventDefault();
    renderLoading(true, popupBtnSubmit, textSubmit, textSaving);
    addCard(popupInputPlace.value, popupInputUrl.value)
        .then((res) => {
            closePopup(popupAddCard);
            console.log(res);
            renderCard(res)
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        })
        .finally(() => {
            popupFormAddCard.reset();
            renderLoading(false, popupBtnSubmit, textSubmit, textSaving);
        });
});

Promise.all([getUserInfo(), getCards()])
    .then(([userData, cards]) => {
        idUser = userData._id;
        setProfileData(userData);
        cards.reverse().forEach(renderCard);
    })
    .catch(err => {
        console.log(`Ошибка: ${err}`);
    });

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__btn',
    inactiveButtonClass, inputErrorClass, errorClass
});