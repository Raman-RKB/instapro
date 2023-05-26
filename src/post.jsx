import { useState } from 'react';
import './App.css';
import LikeNotActive from './img/like-not-active.svg';
import LikeActive from './img/like-active.svg';
import { refreshLikes, onLikeClick } from './api-service';
import { useNavigate } from 'react-router-dom';

function Post({ postId, img, likes, description, date, name, userAva, userId, setUserId, userToken }) {
    const [like, setLike] = useState(false);
    const [likeState, setLikeState] = useState(likes);
    const navigate = useNavigate();

    const dateObj = new Date(date);
    const now = new Date();
    const differenceMs = now - dateObj;
    const differenceDays = Math.floor(differenceMs / (1000 * 60 * 60 * 24));

    function handleUserClick() {
        setUserId(userId);
        navigate('/user-page')
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
                    <button className="like-button" onClick={onLikeClick(like, postId, userToken, setLike, userId, setLikeState)}>
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
