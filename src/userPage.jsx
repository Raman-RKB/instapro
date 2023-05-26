import './App.css';
import Post from './post';
import { renderAllUsersPosts } from './api-service';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function UserPage({ userId, userToken }) {
    const [allPosts, setAllPosts] = useState([]);
    const navigate = useNavigate();

    function navigateToMain() {
        navigate('/');
    }

    function navigateToAddPost() {
        navigate('/add-post');
    }

    useEffect(() => {
        renderAllUsersPosts(setAllPosts, userId)
    }, [])

    return (
        <div className="App">
            <div className="page-container">
                <div className="header-container">
                    <div className="page-header">
                        <div className="logo" onClick={navigateToMain}>instapro</div>
                        <button className="header-button add-or-login-button" onClick={navigateToAddPost}
                            style={userToken ? { display: 'block' } : { display: 'none' }}>
                            <div title="Добавить пост" className="add-post-sign"></div>
                        </button>
                        <Link to="/login">
                            <button className="header-button add-or-login-button">{userToken ? 'Выйти' : 'Войти'}</button>
                        </Link>
                    </div>
                </div>
                <div className="posts-user-header">
                    <img src={allPosts[0]?.user.imageUrl} className="posts-user-header__user-image" />
                    <p className="posts-user-header__user-name">{allPosts[0]?.user.name}</p>
                </div>
                <ul className="posts" >
                    {allPosts.map((post) => (
                        <Post
                            key={post.id}
                            img={post.imageUrl}
                            likes={post.likes}
                            description={post.description}
                            date={post.createdAt}
                            name={post.user.name}
                            userId={post.user.id}
                            userToken={userToken}
                        />
                    ))}
                </ul>
            </div>
        </div>

    );
}

export default UserPage;
