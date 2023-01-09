import { request } from './utils.js'

const config = {
    baseUrl: 'https://nomoreparties.co/v1/wbf-cohort-4',
    headers: {
        authorization: '73a44441-a56c-467a-8e71-8a108a581902',
        'Content-Type': 'application/json'
    }
}

export const getCard = () => {
    return request(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
}

export const getInfo = () => {
    return request(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
}

export const addInfo = (nameValue, aboutValue) => {
    return request(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({ name: nameValue, about: aboutValue })
    })
}

// https://pictures.s3.yandex.net/frontend-developer/common/ava.jpg
export const addAvatar = (link) => {
    return request(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({ avatar: link })
    })
}

export const addCard = (nameValue, linkValue) => {
    return request(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({ name: nameValue, link: linkValue })
    })
}

export const deleteCard = (cardId) => {
    return request(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE', headers: config.headers
    })
}

export const createLike = (cardId) => {
    return request(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers,
    })
}

export const deleteLike = (cardId) => {
    return request(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
}