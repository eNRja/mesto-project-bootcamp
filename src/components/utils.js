import { profileName, profileProfession, profileAvatar } from './index.js';

export const setProfileData = (data) => {
    profileName.textContent = data.name;
    profileProfession.textContent = data.about;
    profileAvatar.src = data.avatar;
};

export function handleSubmit(request, evt, loadingText = "Сохранение...") {
    const submitButton = evt.submitter;
    const initialText = submitButton.textContent;
    renderLoading(true, submitButton, initialText, loadingText);
    request()
        .then(() => {
            evt.target.reset();
        })
        .catch((err) => {
            console.error(`Ошибка: ${err}`);
        })
        .finally(() => {
            renderLoading(false, submitButton, initialText);
        });
}

export function renderLoading(isLoading, button, buttonText = 'Сохранить', loadingText = 'Сохранение...') {
    if (isLoading) {
        button.textContent = loadingText
    } else {
        button.textContent = buttonText
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

export const handleError = (err) => {
    console.log(`Ошибка: ${err}`);
  };