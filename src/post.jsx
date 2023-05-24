import { useState } from 'react';
import './App.css';
import LikeNotActive from './img/like-not-active.svg';
import LikeActive from './img/like-active.svg';
import { useNavigate } from 'react-router-dom';

function Post({ postId, img, likes, description, date, name, userAva, userId, setUserId, userToken }) {
    const [like, setLike] = useState(false);
    const [likeState, setLikeState] = useState(likes);
    const navigate = useNavigate();

    const baseUrl = 'https://webdev-hw-api.vercel.app/api/v1/prod/instapro';

    const dateObj = new Date(date);
    const now = new Date();
    const differenceMs = now - dateObj;
    const differenceDays = Math.floor(differenceMs / (1000 * 60 * 60 * 24));

    function onLikeClick() {
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
                    refreshLikes()
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
                    refreshLikes()
                })
                .catch(error => console.log('ошибка:', error))
        }
    }

    function handleUserClick() {
        setUserId(userId);
        navigate('/user-page')
    }

    function refreshLikes() {
        fetch(`https://webdev-hw-api.vercel.app/api/v1/prod/instapro/user-posts/${userId}`)
            .then((response) => response.json())
            .then((data) => {
                for (let i = 0; i < data.posts.length; i++) {
                    data.posts[i].id === postId && setLikeState(data.posts[i].likes)
                }
            })
    }

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
                        <img src={like ? LikeActive : LikeNotActive}></img>
                    </button>
                    {likeState.length > 0 ? (
                        <p className="post-likes-text">
                            Нравится:&nbsp;
                            <strong>{likeState[0].name}</strong>
                            &nbsp;и&nbsp;
                            <strong>{`еще ${likeState.length - 1}`}</strong>
                        </p>
                    ) : ''}
                </div>
                <p className="post-text">
                    <span className="user-name">{name}&nbsp;</span>
                    {description}
                </p>
                <p className="post-date">{`${differenceDays} дней назад`}</p>
            </li>
        </>
    );
}

export default Post;
