import './App.css';
import LikeNotActive from './img/like-not-active.svg';
// import UserPage from './userPage';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Post({ img, likes, description, date, name, userAva, userId }) {
    const baseUrl = 'https://webdev-hw-api.vercel.app/api/v1/prod/instapro';
    const [userPosts, setUserPosts] = useState();


    const dateObj = new Date(date);
    const now = new Date();
    const differenceMs = now - dateObj;
    const differenceDays = Math.floor(differenceMs / (1000 * 60 * 60 * 24));

    function handleUserClick() {
        fetch(baseUrl.concat(`/user-posts/${userId}`)).then(response => response.json()).then(data => setUserPosts(data));
    }

    // useEffect(() => {
    //     console.log(userPosts, 'userPosts');
    // }, [userPosts])

    return (
        <>
            <li className="post">
                <Link to="/user-page">
                    <div className="post-header" onClick={handleUserClick}>
                        <img className="post-header__user-image" src={userAva}></img>
                        <p className="post-header__user-name">{name}</p>
                    </div>
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
            {/* <UserPage userPosts={userPosts} /> */}
        </>
    );
}

export default Post;
