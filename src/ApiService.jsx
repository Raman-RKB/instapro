const baseUrl = 'https://webdev-hw-api.vercel.app/api/v1/prod/instapro';


export function renderAllPosts() {
    return fetch(baseUrl)
        .then((response) => response.json())
}

export function renderAllUsersPosts(setAllPosts, userId) {
    return fetch(baseUrl + `/user-posts/${userId}`)
        .then((response) => response.json())
        .then((data) => setAllPosts(data.posts))
}

export function onloginClickQuery(login, password) {
    return fetch('https://webdev-hw-api.vercel.app/api/user/login', {
        method: "POST",
        body: JSON.stringify({
            login: login,
            password: password
        })
    })
        .then(responce => responce.json())
}

export function onLikeQuery(postId, userToken) {
    return fetch(baseUrl + `/${postId}/like`, {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${userToken}`
        }
    })
        .then(response => response.json())
}

export function onDislikeQuery(postId, userToken) {
    return fetch(baseUrl + `/${postId}/dislike`, {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${userToken}`
        }
    })
        .then(response => response.json())
}

export function onRefreshLikeQuery(userId) {
    return fetch(baseUrl + `/user-posts/${userId}`)
        .then((response) => response.json())
}

export function onImageChangeQuery(data) {
    return fetch('https://webdev-hw-api.vercel.app/api/upload/image', {
        method: 'POST',
        body: data
    })
        .then(response => response.json())
}

export function onAddPostClickQuery(userToken, description, imageUrl) {
    return fetch('https://webdev-hw-api.vercel.app/api/v1/prod/instapro', {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${userToken}`
        },
        body: JSON.stringify({
            description: description,
            imageUrl: imageUrl
        })
    })
}

export function registerClickQuery(login, name, password, avatar) {
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
