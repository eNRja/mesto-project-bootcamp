const popup = document.querySelectorAll('.popup')
const popupBtnEscape = document.querySelectorAll('.popup__btn-escape')

export const openPopup = (element) => {
    element.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupKeyboard);
}

export const closePopup = (element) => {
    element.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupKeyboard);
}

const closePopupFromEnywhere = (evt) => {
    if (evt.target.classList.contains('popup')) {
        closePopup(evt.target);
    }
}

const closePopupKeyboard = (evt) => {
    if (evt.key == 'Escape') {
        closePopup(document.querySelector('.popup_opened'));
    }
}

popupBtnEscape.forEach((element) => {
    element.addEventListener('click', function () {
        closePopup(element.closest('.popup'));
    });
})

popup.forEach((element) => {
    element.addEventListener('click', closePopupFromEnywhere);
})