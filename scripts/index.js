const elements = document.querySelector(".elements__list");
const template = document.querySelector("#element").content.querySelector(".element");
const buttonOpenPopupCardEdit = document.querySelector('.profile__edit-button');
const buttonOpenPopupCardAdd = document.querySelector('.profile__add-button');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const buttonClosePopupCardAdd = document.querySelector('.popup__btn-escape_add');
const buttonClosePopupCardEdit = document.querySelector('.popup__btn-escape_edit');
const buttonClosePopupCardPicture = document.querySelector('.popup__btn-escape_picture');
const btnSubmit = document.querySelector('.popup__btn_submit');
const btnSave = document.querySelector('.popup__btn_save');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const popupPicture = document.querySelector('.popup_picture');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddCard = document.querySelector('.popup_add-card');
const popupInputPlace = document.querySelector('.popup__input_place');
const popupInputUrl = document.querySelector('.popup__input_url');
const popupInputName = document.querySelector('.popup__input_name');
const popupInputText = document.querySelector('.popup__input_text');

//Создать карточку
const createCard = (data) => {
    const card = template.cloneNode(true);
    const elementFindImage = card.querySelector(".element__image");
    card.querySelector(".element__title").textContent = data.name;
    elementFindImage.src = data.link;
    elementFindImage.alt = data.name;
    card.querySelector(".element__button-trash").addEventListener("click", handleDeleteCard);
    card.querySelector(".element__button-heart").addEventListener("click", handleActivateLikeCard);
    card.querySelector(".element__image").addEventListener("click", () => handlePicture(elementFindImage));
    return card;
};

//Кнопка удалить
const handleDeleteCard = (event) => {
    event.target.closest(".element").remove();
};

//Кнопка сердце
const handleActivateLikeCard = (event) => {
    event.target.classList.toggle("element__button-heart_active")
};

//Кнопка изображение
const handlePicture = (data) => {
    const elementFindImage = data.closest('.element__image');
    popupImage.src = elementFindImage.src;
    popupImage.alt = elementFindImage.alt;
    popupCaption.textContent = data.closest('.element').querySelector('.element__group').querySelector('.element__title').textContent;
    openPopup(popupPicture);
}

//Добавить карточку в начало
const renderCard = (data) => {
    const popup = document.querySelector('.popup_add-card');
    elements.prepend(createCard(data));
};

//Открыть popup
const openPopup = (element) => {
    element.classList.add('popup_opened');
}

//Закрыть popup
const closePopup = (element) => {
    element.classList.remove('popup_opened');
}

//Ожидание нажатия на кнопку создать
btnSubmit.addEventListener("click", () => {
    renderCard((popupInputPlace.value), (popupInputUrl.value));
    closePopup(popupAddCard);
    popupInputPlace.value = '';
    popupInputUrl.value = '';
});

//Кнопка добавить
buttonOpenPopupCardAdd.addEventListener('click', function () {
    openPopup(popupAddCard);
});

//Кнопка редактировать
buttonOpenPopupCardEdit.addEventListener('click', function () {
    openPopup(popupEditProfile);
    editPopup();
});

//Кнопка закрыть всплывающее окно ADD
buttonClosePopupCardAdd.addEventListener('click', function () {
    const popup = document.querySelector('.popup_add-card');
    closePopup(popupAddCard);
});

//Кнопка закрыть всплывающее окно EDIT
buttonClosePopupCardEdit.addEventListener('click', function () {
    const popup = document.querySelector('.popup_edit-profile');
    closePopup(popupEditProfile);
});

//Кнопка закрыть всплывающее окно PICTURE
buttonClosePopupCardPicture.addEventListener('click', function () {
    const popup = document.querySelector('.popup_picture');
    closePopup(popupPicture);
});

//Кнопка сохранить
btnSave.addEventListener('click', function () {
    profileTitle.textContent = popupInputName.value
    profileSubtitle.textContent = popupInputText.value
    closePopup(popupEditProfile);
    popupInputName.value = '';
    popupInputText.value = '';
});

//Создание массива карточек при загрузке экрана
initialCards.reverse().forEach((data) => renderCard(data));