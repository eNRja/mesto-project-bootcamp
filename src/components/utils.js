import { profileTitle, profileSubtitle } from './index.js';

export const createProfile = (data) => {
    profileTitle.textContent = data.name;
    profileSubtitle.textContent = data.about;
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