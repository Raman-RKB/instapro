const baseUrl = 'https://wedev-api.sky.pro/api/v1/prod/instapro';

export async function renderAllPosts() {
    return fetch(baseUrl)
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error(response.status)
            }
        })
        .catch(error => {
            console.error(error)
            alert('Ошибка загрузки данных')
        })
}

export async function renderAllUsersPosts(userId) {
    try {
        const response = await fetch(baseUrl + `/user-posts/${userId}`);
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error(response.status)
        }
    } catch (error) {
        alert(error);
    }
}

export async function fetchLoginData(login, password) {
    try {
        const response = await fetch('https://wedev-api.sky.pro/api/user/login', {
            method: "POST",
            body: JSON.stringify({
                login: login,
                password: password
            })
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error(response.status)
        }
    } catch (error) {
        alert(error);
    }
}

export function fetchLike(postId, userToken) {
    return fetch(baseUrl + `/${postId}/like`, {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${userToken}`
        }
    })
        .then(response => response.json())
}

export function fetchDislike(postId, userToken) {
    return fetch(baseUrl + `/${postId}/dislike`, {
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
    return fetch('https://wedev-api.sky.pro/api/upload/image', {
        method: 'POST',
        body: data
    })
        .then(response => response.json())
}

export function fetchAddPost(userToken, description, imageUrl) {
    return fetch(baseUrl, {
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
    return fetch('https://wedev-api.sky.pro/api/user', {
        method: "POST",
        body: JSON.stringify({
            imageUrl: avatar,
            login: login,
            name: name,
            password: password
        })
    }).then(response => response.json())
}
