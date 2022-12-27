import {openPopup, closePopup, popupInputPlace, popupInputUrl, popupInputName, popupInputText} from './utils.js';
import {popupPicture, renderCard} from './card.js';
import {checkInputValidity} from './validate.js';
import {form, inactiveButtonClass} from '../index.js';


export const listenDocument = () => {

    const buttonOpenPopupCardEdit = document.querySelector('.profile__edit-button');
    const buttonOpenPopupCardAdd = document.querySelector('.profile__add-button');
    const buttonClosePopupCardAdd = document.querySelector('.popup__btn-escape_add');
    const buttonClosePopupCardEdit = document.querySelector('.popup__btn-escape_edit');
    const buttonClosePopupCardPicture = document.querySelector('.popup__btn-escape_picture');
    const popupFormAddCard = document.querySelector('.popup__form_add-card');
    const popupFormEditCard = document.querySelector('.popup__form_edit-profile')
    const profileTitle = document.querySelector('.profile__title');
    const profileSubtitle = document.querySelector('.profile__subtitle');
    const popupEditProfile = document.querySelector('.popup_edit-profile');
    const popupAddCard = document.querySelector('.popup_add-card');
    const btnSubmit = document.querySelector('.popup__btn_submit');
    const btnSave = document.querySelector('.popup__btn_save');



    buttonOpenPopupCardAdd.addEventListener('click', function () {
        btnSubmit.classList.add(inactiveButtonClass);
        const formElement = popupAddCard.querySelector(form)
        checkInputValidity(formElement, popupInputPlace);
        checkInputValidity(formElement, popupInputUrl);
        openPopup(popupAddCard);
    });

    buttonOpenPopupCardEdit.addEventListener('click', function () {
        popupInputName.value = profileTitle.textContent;
        popupInputText.value = profileSubtitle.textContent;
        const formElement = popupEditProfile.querySelector(form)
        checkInputValidity(formElement, popupInputName);
        checkInputValidity(formElement, popupInputText);
        btnSave.classList.remove(inactiveButtonClass);
        openPopup(popupEditProfile);
    });

    buttonClosePopupCardAdd.addEventListener('click', function () {
        closePopup(popupAddCard);
    });

    buttonClosePopupCardEdit.addEventListener('click', function () {
        closePopup(popupEditProfile);
    });


    buttonClosePopupCardPicture.addEventListener('click', function () {
        closePopup(popupPicture);
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

}