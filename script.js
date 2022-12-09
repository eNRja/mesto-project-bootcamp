//Открыть всплывающее окно
const editButton = document.querySelector('.profile__edit-button');
editButton.addEventListener('click', function() {
    const popup = document.querySelector('.popup');
    popup.classList.add('popup_opened');
    editPopup();
});

//Закрыть всплывающее окно
const escapeButton = document.querySelector('.popup__btn-escape');
escapeButton.addEventListener('click', function() {
    const popup = document.querySelector('.popup');
    popup.classList.remove('popup_opened');
    resetPopup();
});

//Добавить профиль
const addButton = document.querySelector('.profile__add-button');
addButton.addEventListener('click', function() {
    const popup = document.querySelector('.popup');
        popup.classList.add('popup_opened');
});

//Добавить шапку, имя и текст из профиля
function editPopup() {
    const popupTitle = document.querySelector('.popup__title');
    popupTitle.textContent = 'Редактировать профиль';
    const profileTitle = document.querySelector('.profile__title');
    const nameprofile = profileTitle.textContent;
    const popupEditName = document.querySelector('.popup__edit-name');
    popupEditName.textContent = nameprofile;
    const profileSubtitle = document.querySelector('.profile__subtitle');
    const textprofile = profileSubtitle.textContent;
    const popupEditText = document.querySelector('.popup__edit-text');
    popupEditText.textContent = textprofile;
}

//Вернуть в исходное состояние всплывающее окно
function resetPopup() {
    const popupTitle = document.querySelector('.popup__title');
    popupTitle.textContent = 'Добавить профиль';
    const popupEditName = document.querySelector('.popup__edit-name');
    popupEditName.textContent = 'Имя';
    const popupEditText = document.querySelector('.popup__edit-text');
    popupEditText.textContent = 'описание';
}