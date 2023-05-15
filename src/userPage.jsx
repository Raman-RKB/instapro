import './App.css';
import LikeNotActive from './img/like-not-active.svg';
import MyAva from './img/Raman.webp';

function User({ img, likesQuantity, description, date }) {
    const dateObj = new Date(date);
    const now = new Date();
    const differenceMs = now - dateObj;
    const differenceDays = Math.floor(differenceMs / (1000 * 60 * 60 * 24));



    // console.log(differenceMs);

    return (
        <li className="post">
            <div className="post-header">
                <img className="post-header__user-image" src={MyAva}></img>
                <p className="post-header__user-name">Админ</p>
            </div>
            <div className="post-image-container">
                <img className="post-image" src={img}></img>
            </div>
            <div className="post-likes">
                <button className="like-button">
                    <img src={LikeNotActive}></img>
                </button>
                <p className="post-likes-text">
                    Нравится:&nbsp;
                    <strong>Роман</strong>
                    &nbsp;и&nbsp;
                    <strong>{`еще ${likesQuantity - 1}`}</strong>
                </p>
            </div>
            <p className="post-text">
                <span className="user-name">Админ&nbsp;</span>
                {description}
            </p>
            <p className="post-date">{`${differenceDays} дней назад`}</p>
        </li>
    );
}

export default User;
