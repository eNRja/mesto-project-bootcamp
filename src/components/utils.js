export const popupInputPlace = document.querySelector('.popup__input_place');
export const popupInputUrl = document.querySelector('.popup__input_url');
export const popupInputName = document.querySelector('.popup__input_name');
export const popupInputText = document.querySelector('.popup__input_text');

export const openPopup = (element) => {
    element.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupKeyboard);
    element.addEventListener('click', closePopupFromEnywhere);
}

export const closePopup = (element) => {
    element.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupKeyboard);
    element.removeEventListener('click', closePopupFromEnywhere);
    popupInputName.value = '';
    popupInputText.value = '';
    popupInputPlace.value = '';
    popupInputUrl.value = '';
}

const closePopupFromEnywhere = (evt) => {
    if (evt.target.querySelector('.popup__container') || evt.target.querySelector('.popup__picture-container')) {
        closePopup(evt.target);
    }
}

const closePopupKeyboard = (evt) => {
    if (evt.key == 'Escape') {
        closePopup(document.querySelector('.popup_opened'));
    }
}