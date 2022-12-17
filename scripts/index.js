const elements = document.querySelector(".elements__list");
const template = document.querySelector("#element").content.querySelector(".element");
const add = document.querySelector(".popup__btn_submit");
const escapeButtonAdd = document.querySelector('.popup__btn-escape_add');
const escapeButtonEdit = document.querySelector('.popup__btn-escape_edit');
const escapeButtonPicture = document.querySelector('.popup__btn-escape_picture');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const btnSubmit = document.querySelector('.popup__btn_submit')
const btnSave = document.querySelector('.popup__btn_save')

//Создать карточку
const createCard = (data) => {
    const card = template.cloneNode(true);
    card.querySelector(".element__title").textContent = data.name;
    card.querySelector(".element__image").src = data.link;
    card.querySelector(".element__image").alt = data.name;
    card.querySelector(".element__button-trash").addEventListener("click", handleDeleteCard);
    card.querySelector(".element__button-heart").addEventListener("click", handleActivateLikeCard);
    card.querySelector(".element__image").addEventListener("click", handlePicture);
    return card;
};

//Кнопка удалить
const handleDeleteCard = (event) => {
    event.target.closest(".element").remove();
};

//Кнопка сердце
const handleActivateLikeCard = (event) => {
    if (event.target.classList.contains("element__button-heart_active")) {
        event.target.classList.remove("element__button-heart_active");
    } else {
        event.target.closest(".element__button-heart").classList.add('element__button-heart_active');
    }
};

//Кнопка изображение
const handlePicture = (event) => {
    document.querySelector('.popup__image').src = event.target.closest('.element__image').src;
    document.querySelector('.popup__image').alt = event.target.closest('.element__image').alt;
    document.querySelector('.popup__caption').textContent = event.target.closest('.element').querySelector('.element__group').querySelector('.element__title').textContent;
    const popup = document.querySelector('.popup_picture');
    popup.classList.add('popup_opened');
}

//Добавить карточку в начало
const renderCard = (data) => {
    const popup = document.querySelector('.popup_add-card');
    elements.prepend(createCard(data));
};

//Ожидание нажатия на кнопку создать
btnSubmit.addEventListener("click", () => {
    const name = document.querySelector('.popup__input_place').value;
    const link = document.querySelector('.popup__input_url').value;
    const objForArray = { name: name.value, link: link.value };
    initialCards.push(objForArray);
    document.querySelector('.popup_add-card').classList.remove('popup_opened');
    renderCard({name, link})
    document.querySelector('.popup__input_place').value = '';
    document.querySelector('.popup__input_url').value = '';
});

//Кнопка добавить
addButton.addEventListener('click', function () {
    const popup = document.querySelector('.popup_add-card');
    popup.classList.add('popup_opened');
});

//Кнопка редактировать
editButton.addEventListener('click', function () {
    const popup = document.querySelector('.popup_edit-profile');
    popup.classList.add('popup_opened');
    editPopup();
});

//Кнопка закрыть всплывающее окно ADD
escapeButtonAdd.addEventListener('click', function () {
    const popup = document.querySelector('.popup_add-card');
    popup.classList.remove('popup_opened');
});

//Кнопка закрыть всплывающее окно EDIT
escapeButtonEdit.addEventListener('click', function () {
    const popup = document.querySelector('.popup_edit-profile');
    popup.classList.remove('popup_opened');
});

//Кнопка закрыть всплывающее окно PICTURE
escapeButtonPicture.addEventListener('click', function () {
    const popup = document.querySelector('.popup_picture');
    popup.classList.remove('popup_opened');
});

//Кнопка сохранить
btnSave.addEventListener('click', function () {
    document.querySelector('.profile__title').textContent = document.querySelector('.popup__input_name').value
    document.querySelector('.profile__subtitle').textContent = document.querySelector('.popup__input_text').value
    document.querySelector('.popup__input_name').value = '';
    document.querySelector('.popup__input_text').value = '';
    document.querySelector('.popup__input_name').placeholder = document.querySelector('.profile__title').textContent;
    document.querySelector('.popup__input_text').placeholder = document.querySelector('.profile__subtitle').textContent;
    document.querySelector('.popup_edit-profile').classList.remove('popup_opened');
});

//Создание массива карточек при загрузке экрана
initialCards.reverse().forEach((data) => renderCard(data));
//Создали отображение имя и описания по умолчанию
document.querySelector('.popup__input_name').placeholder = document.querySelector('.profile__title').textContent;
document.querySelector('.popup__input_text').placeholder = document.querySelector('.profile__subtitle').textContent;