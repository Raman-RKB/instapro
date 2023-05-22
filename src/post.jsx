import './App.css';
import LikeNotActive from './img/like-not-active.svg';
import { Link } from 'react-router-dom';

function Post({ img, likes, description, date, name, userAva, userId, setUserId }) {

    const dateObj = new Date(date);
    const now = new Date();
    const differenceMs = now - dateObj;
    const differenceDays = Math.floor(differenceMs / (1000 * 60 * 60 * 24));

    function handleUserClick() {
        setUserId(userId);
    }

    return (
        <>
            <li className="post">
                <Link to="/user-page">
                    {userAva && <div className="post-header" onClick={handleUserClick}>
                        <img className="post-header__user-image" src={userAva}></img>
                        <p className="post-header__user-name">{name}</p>
                    </div>}
                </Link>
                <div className="post-image-container">
                    <img className="post-image" src={img}></img>
                </div>
                <div className="post-likes">
                    <button className="like-button">
                        <img src={LikeNotActive}></img>
                    </button>
                    {likes.length > 0 ? (
                        <p className="post-likes-text">
                            Нравится:&nbsp;
                            <strong>{likes[0].name}</strong>
                            &nbsp;и&nbsp;
                            <strong>{`еще ${likes.length - 1}`}</strong>
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
