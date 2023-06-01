const baseUrl = 'https://wedev-api.sky.pro';

export async function renderAllPosts() {
    return fetch(baseUrl + '/api/v1/prod/instapro')
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error('Ошибка: ' + response.status)
            }
        })
}

export async function renderAllUsersPosts(userId) {
    try {
        const response = await fetch(baseUrl + `/user-posts/${userId}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

export async function fetchLoginData(login, password) {
    try {
        const response = await fetch(baseUrl + '/api/user/login', {
            method: "POST",
            body: JSON.stringify({
                login: login,
                password: password
            })
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

export function fetchLike(postId, userToken) {
    return fetch(`https://wedev-api.sky.pro/api/v1/roman-kaiko/instapro/${postId}/like`, {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${userToken}`
        }
    })
        .then(response => response.json())
}

export function fetchDislike(postId, userToken) {
    return fetch(baseUrl + `/api/${postId}/dislike`, {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${userToken}`
        }
    })
        .then(response => response.json())
}

export function fetchRefreshLike(userId) {
    return fetch(baseUrl + `/user-posts/${userId}`)
        .then((response) => response.json())
}

export function fetchImageChange(data) {
    return fetch(baseUrl + '/api/upload/image', {
        method: 'POST',
        body: data
    })
        .then(response => response.json())
}

export function fetchAddPost(userToken, description, imageUrl) {
    return fetch(baseUrl + '/api/v1/prod/instapro', {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${userToken}`
        },
        body: JSON.stringify({
            description: description,
            imageUrl: imageUrl
        })
    })
        .then(response => response.json())
}

export function fetchRegisterData(login, name, password, avatar) {
    return fetch(baseUrl + '/api/user', {
        method: "POST",
        body: JSON.stringify({
            imageUrl: avatar,
            login: login,
            name: name,
            password: password
        })
    }).then(response => response.json())
}
