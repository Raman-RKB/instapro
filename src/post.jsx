import { useState } from 'react';
import './App.css';
import likeNotActive from './img/like-not-active.svg';
import likeActive from './img/like-active.svg';
import { useNavigate } from 'react-router-dom';
import { onDislikeQuery, onLikeQuery, onRefreshLikeQuery } from './api-service'


function Post({ postId, img, likes, description, date, name, userAva, userId, setUserId, userToken }) {
    const [like, setLike] = useState(false);
    const [likeState, setLikeState] = useState(likes);
    const navigate = useNavigate();

    const dateObj = new Date(date);
    const now = new Date();
    const differenceMs = now - dateObj;
    const differenceDays = Math.floor(differenceMs / (1000 * 60 * 60 * 24));
    const hoursAgo = Math.floor(differenceMs / (1000 * 60 * 60));
    const minutesAgo = Math.floor(differenceMs / (1000 * 60));

    function onLikeClick() {
        if (like) {
            onDislikeQuery(postId, userToken)
                .then(data => {
                    data && setLike(false)
                    refreshLikes()
                })
                .catch(error => console.error('ошибка:', error))
        } else {
            onLikeQuery(postId, userToken)
                .then(data => {
                    setLike(true)
                    refreshLikes()
                })
                .catch(error => console.error('ошибка:', error))
        }
    }

    function handleUserClick() {
        setUserId(userId);
        navigate('/user-page')
    }

    function refreshLikes() {
        onRefreshLikeQuery(userId)
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
                        <img src={like ? likeActive : likeNotActive}></img>
                    </button>
                    {likeState.length > 0 ? (
                        <p className="post-likes-text">
                            Нравится:&nbsp;
                            <strong>{likeState[0].name}</strong>
                            &nbsp;и&nbsp;
                            <strong>{`еще ${likeState.length - 1}`}</strong>
                        </p>
                    ) : (
                        <p className="post-likes-text">
                            Нравится:&nbsp;0
                        </p>
                    )}
                </div>
                <p className="post-text">
                    <span className="user-name">{name}&nbsp;</span>
                    {description}
                </p>

                {differenceMs > 86400000 ?
                    (<p className="post-date">{`${differenceDays} дня назад`}</p>)
                    :
                    (differenceMs > 3600000 ?
                        (<p className="post-date">{`${hoursAgo} час назад`}</p>)
                        :
                        (<p className="post-date">{`${minutesAgo} минута назад`}</p>))
                }
            </li>
        </>
    );
}

export default Post;
