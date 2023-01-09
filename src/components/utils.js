import { profileTitle, profileSubtitle, profileAvatar } from './index.js';

export const createProfile = (data) => {
    profileTitle.textContent = data.name;
    profileSubtitle.textContent = data.about;
    profileAvatar.src = data.avatar;
};

export function renderLoading(isLoading, event) {
    const value = event.target.querySelector('.popup__btn');
    if (isLoading) {
        value.textContent = 'Сохранение...';
    }
    else {
        if (value.classList.contains('popup__btn_submit')) {
            value.textContent = 'Создать';
        } else {
            value.textContent = 'Сохранить';
        }
    }
}

export function request(url, options) {
    return fetch(url, options).then(checkResponse)
}

function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}