const baseUrl = 'https://webdev-hw-api.vercel.app/api/v1/prod/instapro';

export function renderAllPosts(setAllPosts) {
    return fetch('https://webdev-hw-api.vercel.app/api/v1/prod/instapro')
        .then((response) => response.json())
        .then((data) => setAllPosts(data.posts))
        .then((data) => console.log(data))
}

export function renderAllUsersPosts(setAllPosts, userId) {
    fetch(`https://webdev-hw-api.vercel.app/api/v1/prod/instapro/user-posts/${userId}`)
        .then((response) => response.json())
        .then((data) => setAllPosts(data.posts))
}

export function loginClick(login, password, setUserToken, navigate) {
    if (login.length && password.length) {
        fetch('https://webdev-hw-api.vercel.app/api/user/login', {
            method: "POST",
            body: JSON.stringify({
                login: login,
                password: password
            })
        })
            .then(responce => responce.json())
            .then((data) => {
                setUserToken(data.user.token)
                console.log(data, 'ответ после логина');
                navigate('/');
            })
            .catch(error => console.log('ошибка:', error))

    }
}

export function onLikeClick(like, postId, userToken, setLike, userId, setLikeState) {
    if (like) {
        fetch(baseUrl + `/${postId}/dislike`, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${userToken}`
            }
        })
            .then(response => response.json())
            .then(data => {
                data && setLike(false)
                refreshLikes(userId, postId, setLikeState)
            })
            .catch(error => console.log('ошибка:', error))
    } else {
        fetch(baseUrl + `/${postId}/like`, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${userToken}`
            }
        })
            .then(response => response.json())
            .then(data => {
                data && setLike(true)
                refreshLikes(userId, postId, setLikeState)
            })
            .catch(error => console.log('ошибка:', error))
    }
}

export function refreshLikes(userId, postId, setLikeState) {
    fetch(`https://webdev-hw-api.vercel.app/api/v1/prod/instapro/user-posts/${userId}`)
        .then((response) => response.json())
        .then((data) => {
            for (let i = 0; i < data.posts.length; i++) {
                data.posts[i].id === postId && setLikeState(data.posts[i].likes)
            }
        })
}