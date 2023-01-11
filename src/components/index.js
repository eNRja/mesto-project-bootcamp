import '../pages/index.css';
import { enableValidation, hideInputError } from './validate.js';
import { openPopup, closePopup } from './modal.js';
import { getCards, getUserInfo, editProfile, addCard, editAvatar } from './api.js';
import { renderCard } from './card.js'
import { setProfileData, handleError, handleSubmit } from './utils.js'

export let idUser;
const popupPlace = document.querySelector('.popup__input_place');
const popupUrl = document.querySelector('.popup__input_url');
const popupName = document.querySelector('.popup__input_name');
const popupProfession = document.querySelector('.popup__input_text');
const popupInputAvatar = document.querySelector('.popup__input_avatar')
const buttonOpenPopupProfileEdit = document.querySelector('.profile__edit-button');
const buttonOpenPopupCardAdd = document.querySelector('.profile__add-button');
const buttonOpenPopupAvatar = document.querySelector('.profile__avatar-overlay');
const popupFormAddCard = document.querySelector('.popup__form_add-card');
const popupFormEditCard = document.querySelector('.popup__form_edit-profile')
const popupFormAvatar = document.querySelector('.popup__form_avatar');
export const profileName = document.querySelector('.profile__title');
export const profileProfession = document.querySelector('.profile__subtitle');
export const popupDelete = document.querySelector('.popup_delete');
export const profileAvatar = document.querySelector('.profile__avatar-picture');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddCard = document.querySelector('.popup_add-card');
const popupAvatar = document.querySelector('.popup_avatar');
const subSettings = { inputErrorClass: 'popup__input_type_error', errorClass: 'form__input-error_active', inactiveButtonClass: 'popup__btn_inactive' };
const { inactiveButtonClass, inputErrorClass, errorClass } = subSettings

buttonOpenPopupAvatar.addEventListener('click', function () {
    openPopup(popupAvatar);
});

buttonOpenPopupCardAdd.addEventListener('click', function () {
    openPopup(popupAddCard);
});

buttonOpenPopupProfileEdit.addEventListener('click', function () {
    popupName.value = profileName.textContent;
    popupProfession.value = profileProfession.textContent;
    hideInputError(popupFormEditCard, popupName, { inputErrorClass, errorClass });
    hideInputError(popupFormEditCard, popupProfession, { inputErrorClass, errorClass });
    openPopup(popupEditProfile);
});

popupFormAvatar.addEventListener('submit', (evt) => {
    evt.preventDefault();
    function makeRequest() {
        return editAvatar(popupInputAvatar.value).then((userData) => {
            profileAvatar.src = userData.avatar;
            closePopup(popupAvatar);
        });
    }
    handleSubmit(makeRequest, evt);
});

popupFormEditCard.addEventListener('submit', (evt) => {
    evt.preventDefault();
    function makeRequest() {
        return editProfile(popupName.value, popupProfession.value).then((userData) => {
            profileName.textContent = userData.name;
            profileProfession.textContent = userData.about;
            closePopup(popupEditProfile);
        });
    }
    handleSubmit(makeRequest, evt);
});

popupFormAddCard.addEventListener("submit", (evt) => {
    evt.preventDefault();
    function makeRequest() {
        return addCard(popupPlace.value, popupUrl.value).then((cardData) => {
            renderCard(cardData)
            closePopup(popupAddCard);
        });
    }
    handleSubmit(makeRequest, evt);
});

Promise.all([getUserInfo(), getCards()])
    .then(([userData, cards]) => {
        idUser = userData._id;
        setProfileData(userData);
        cards.reverse().forEach(renderCard);
    })
    .catch(handleError)

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__btn',
    inactiveButtonClass, inputErrorClass, errorClass
});