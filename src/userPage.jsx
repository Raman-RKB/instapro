import './App.css';
import Post from './post';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function UserPage({ auth, userId }) {
    const [allPosts, setAllPosts] = useState([]);

    function renderAllPosts() {
        fetch(`https://webdev-hw-api.vercel.app/api/v1/prod/instapro/user-posts/${userId}`)
            .then((response) => response.json())
            .then((data) => setAllPosts(data.posts))
            .then(console.log(allPosts, 'что пришло по юзаку'))
    }

    useEffect(() => {
        renderAllPosts()
        console.log(auth, 'что по авторизации');
    }, [])

    useEffect(() => {
        console.log(userId, 'userPage');
    }, [userId])

    return (
        <div className="App">
            <div className="page-container">
                <div className="header-container">
                    <div className="page-header">
                        <Link to="/">
                            <div className="logo">instapro</div>
                        </Link>
                        <Link to="/add-post">
                            <button className="header-button add-or-login-button" style={auth === true ? { display: 'block' } : { display: 'none' }}>
                                <div title="Добавить пост" className="add-post-sign"></div>
                            </button>
                        </Link>
                        <Link to="/login">
                            <button className="header-button add-or-login-button">{auth === true ? 'Выйти' : 'Войти'}</button>
                        </Link>
                    </div>
                </div>
                <div className="posts-user-header">
                    <img src={allPosts[0]?.user.imageUrl} className="posts-user-header__user-image" />
                    <p className="posts-user-header__user-name">{allPosts[0]?.user.name}</p>
                </div>
                <ul className="posts" >
                    {allPosts && allPosts?.map((post) => (
                        <Post
                            key={post.id}
                            img={post.imageUrl}
                            likes={post.likes}
                            description={post.description}
                            date={post.createdAt}
                            name={post.user.name}
                            userId={post.user.id}
                        />
                    ))}
                </ul>
            </div>
        </div>

    );
}

export default UserPage;
