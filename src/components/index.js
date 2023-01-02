import '../pages/index.css';
import { renderCard } from './card.js';
import { enableValidation, hideInputError } from './validate.js';
import { openPopup, closePopup } from './modal.js'

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const popupInputPlace = document.querySelector('.popup__input_place');
const popupInputUrl = document.querySelector('.popup__input_url');
const popupInputName = document.querySelector('.popup__input_name');
const popupInputText = document.querySelector('.popup__input_text');
const buttonOpenPopupCardEdit = document.querySelector('.profile__edit-button');
const buttonOpenPopupCardAdd = document.querySelector('.profile__add-button');
const popupFormAddCard = document.querySelector('.popup__form_add-card');
const popupFormEditCard = document.querySelector('.popup__form_edit-profile')
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddCard = document.querySelector('.popup_add-card');
const btnSubmit = document.querySelector('.popup__btn_submit');
const btnSave = document.querySelector('.popup__btn_save');
const subSettings = {inputErrorClass: 'popup__input_type_error', errorClass: 'form__input-error_active'};
const {inputErrorClass, errorClass} = subSettings

buttonOpenPopupCardAdd.addEventListener('click', function () {
    btnSubmit.classList.add('popup__btn_inactive');
    btnSubmit.setAttribute('disabled', true);
    popupInputPlace.value = '';
    popupInputUrl.value = '';
    hideInputError(popupFormAddCard, popupInputPlace, {inputErrorClass, errorClass});
    hideInputError(popupFormAddCard, popupInputUrl, {inputErrorClass, errorClass});
    openPopup(popupAddCard);
});

buttonOpenPopupCardEdit.addEventListener('click', function () {
    popupInputName.value = profileTitle.textContent;
    popupInputText.value = profileSubtitle.textContent;
    btnSave.classList.remove('popup__btn_inactive');
    btnSubmit.removeAttribute('disabled');
    hideInputError(popupFormEditCard, popupInputName, {inputErrorClass, errorClass});
    hideInputError(popupFormEditCard, popupInputText, {inputErrorClass, errorClass});
    openPopup(popupEditProfile);
});
 
popupFormEditCard.addEventListener('submit', (event) => {
    event.preventDefault();
    profileTitle.textContent = popupInputName.value
    profileSubtitle.textContent = popupInputText.value
    closePopup(popupEditProfile);
});

popupFormAddCard.addEventListener("submit", (event) => {
    event.preventDefault();
    const obj = { name: popupInputPlace.value, link: popupInputUrl.value };
    renderCard(obj);
    closePopup(popupAddCard);
});

initialCards.reverse().forEach((data) => renderCard(data));
enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__btn',
    inactiveButtonClass: 'popup__btn_inactive',
    inputErrorClass, errorClass
});