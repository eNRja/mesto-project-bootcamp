const config = {
    baseUrl: 'https://nomoreparties.co/v1/wbf-cohort-4',
    headers: {
        authorization: '73a44441-a56c-467a-8e71-8a108a581902',
        'Content-Type': 'application/json'
    }
}

export const getCard = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
}

export const getInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
}

export const addInfo = (nameValue, aboutValue) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: nameValue,
            about: aboutValue
        })
    })
}

export const addCard = (nameValue, linkValue) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: nameValue,
            link: linkValue
        })
    })
}

// export const addAvatar = (link) => {
//     fetch(`${config.baseUrl}/users/me`, {
//         method: 'PATCH',
//         headers: config.headers,
//         body: JSON.stringify({
//             name: link
//         })
//     });
// }

export const deleteCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
}

export const createLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers,
    })
}

export const deleteLike = (cardId) => {
    return fetch(`https://nomoreparties.co/v1/wbf-cohort-4/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
}