import { useEffect, useState } from 'react';
import './style/Post.css';
import likeNotActive from '../../img/like-not-active.svg';
import likeActive from '../../img/like-active.svg';
import { fetchDislike, fetchLike, fetchRefreshLike } from '../../ApiService'


function Post({ postId, img, likes, description, date, name, userAva, userId, setUserId, userToken, setUserPageNav }) {
    const [like, setLike] = useState(false);
    const [likeState, setLikeState] = useState(likes);

    const dateObj = new Date(date);
    const now = new Date();
    const differenceMs = now - dateObj;
    const differenceDays = Math.floor(differenceMs / (1000 * 60 * 60 * 24));
    const hoursAgo = Math.floor(differenceMs / (1000 * 60 * 60));
    const minutesAgo = Math.floor(differenceMs / (1000 * 60));

    let postAge = null;
    if (differenceMs > 86400000) {
        postAge = <p className="post-date">{`${differenceDays} дн назад`}</p>;
    } else if (differenceMs > 3600000) {
        postAge = <p className="post-date">{`${hoursAgo} ч назад`}</p>;
    } else if (differenceMs < 60000) {
        postAge = <p className="post-date">{`только что`}</p>;
    } else {
        postAge = <p className="post-date">{`${minutesAgo} мин назад`}</p>;
    }

    let usersLikesIndicator = null;
    if (likeState.length === 0) {
        usersLikesIndicator = <p className="post-likes-text">Нравится:&nbsp;0</p>
    } else if (likeState.length === 1) {
        usersLikesIndicator = <p className="post-likes-text">
            Нравится:&nbsp;
            <strong>{likeState[0].name}</strong>
        </p>
    } else if (likeState.length > 1) {
        usersLikesIndicator = <p className="post-likes-text">
            Нравится:&nbsp;
            <strong>{likeState[0].name}</strong>
            &nbsp;и&nbsp;
            <strong>{`еще ${likeState.length - 1}`}</strong>
        </p>
    }

    function onLikeClick() {
        if (like) {
            fetchDislike(postId, userToken)
                .then(data => {
                    data && setLike(false)
                    refreshLikes()
                })
                .catch(error => console.error('ошибка:', error))
        } else {
            fetchLike(postId, userToken)
                .then(data => {
                    setLike(true)
                    refreshLikes()
                })
                .catch(error => console.error('ошибка:', error))
        }
    }

    function handleUserClick() {
        setUserId(userId);
        setUserPageNav(true);
    }

    function refreshLikes() {
        fetchRefreshLike(userId)
            .then((data) => {
                for (let i = 0; i < data.posts.length; i++) {
                    data.posts[i].id === postId && setLikeState(data.posts[i].likes)
                }
            })
    }

    useEffect(() => {
        for (let i = 0; i < likes.length; i++) {
            likes[i].id === localStorage.getItem('loggedUserId') && setLike(true)
        }
    }, [likes])

    return (
        <>
            <li className="post">
                {userAva && <div className="post-header" onClick={handleUserClick}>
                    <img className="post-header__user-image" src={userAva}></img>
                    <p className="post-header__user-name">{name}</p>
                </div>}
                <div className="post-image-container">
                    <img className="post-image" src={img}></img>
                </div>
                <div className="post-likes">
                    <button className="like-button" onClick={onLikeClick}>
                        <img src={like ? likeActive : likeNotActive}></img>
                    </button>
                    {usersLikesIndicator}
                </div>
                <p className="post-text">
                    <span className="user-name">{name}&nbsp;</span>
                    {description}
                </p>
                {postAge}
            </li>
        </>
    );
}

export default Post;
