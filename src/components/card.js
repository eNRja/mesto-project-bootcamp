import {openPopup} from './modal.js'

const elements = document.querySelector(".elements__list");
const template = document.querySelector("#element").content.querySelector(".element");
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const popupPicture = document.querySelector('.popup_picture');

const createCard = (data) => {
    const card = template.cloneNode(true);
    const elementFindImage = card.querySelector(".element__image");
    card.querySelector(".element__title").textContent = data.name;
    elementFindImage.src = data.link;
    elementFindImage.alt = data.name;
    card.querySelector(".element__button-trash").addEventListener("click", handleDeleteCard);
    card.querySelector(".element__button-heart").addEventListener("click", handleActivateLikeCard);
    elementFindImage.addEventListener("click", () => handlePicture(data));
    return card;
};

const handleDeleteCard = (event) => {
    event.target.closest(".element").remove();
};

const handleActivateLikeCard = (event) => {
    event.target.classList.toggle("element__button-heart_active")
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