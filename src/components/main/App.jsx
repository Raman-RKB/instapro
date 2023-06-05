import './style/App.css';
import Post from '../modules/Post';
import { renderAllPosts, renderAllUsersPosts } from '../../ApiService';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App({ setUserId, userToken, userId }) {
  const [allPosts, setAllPosts] = useState([]);
  const [userPageNav, setUserPageNav] = useState(false);
  const navigate = useNavigate();

  function navigateToAddPost() {
    navigate('/add-post');
  }

  function getAllPosts() {
    renderAllPosts()
      .then(data => {
        setAllPosts(data.posts)
      })
  }

  function rerenderToMain() {
    setUserPageNav(false)
    getAllPosts()
  }

  useEffect(() => {
    getAllPosts()
  }, [])

  useEffect(() => {
    if (userId) {
      async function fetchData() {
        const data = await renderAllUsersPosts(userId);
        if (data) {
          setAllPosts(data?.posts);
        }
      }
      fetchData()
    }
  }, [userId])

  return (
    <div className="app">
      <div className="page-container">
        <div className="header-container">
          <div className="page-header">
            <div className="logo" onClick={userPageNav ? rerenderToMain : null}>instapro</div>
            <button className={`header-button add-or-login-button ${userToken ? 'logged-in' : 'logged-out'}`}
              onClick={navigateToAddPost}
            >
              <div title="Добавить пост" className="add-post-sign"></div>
            </button>
            <NavLink to="/login">
              <button className="header-button add-or-login-button">
                {userToken ? 'Выйти' : 'Войти'}
              </button>
            </NavLink>
          </div>
        </div>
        {userPageNav && <div className="posts-user-header">
          <img src={allPosts[0]?.user.imageUrl} className="posts-user-header__user-image" />
          <p className="posts-user-header__user-name">{allPosts[0]?.user.name}</p>
        </div>}
        <ul className="posts" >
          {allPosts.length ? (allPosts.map((post) => (
            <Post
              key={post.id}
              img={post.imageUrl}
              likes={post.likes}
              description={post.description}
              date={post.createdAt}
              name={post.user.name}
              userAva={!userPageNav && post.user.imageUrl}
              userId={post.user.id}
              setUserId={setUserId}
              userToken={userToken}
              postId={post.id}
              setUserPageNav={setUserPageNav}
            />
          ))) : <div className="spinner-container"><Spinner animation="border" /></div>}
        </ul>
      </div>
    </div >

  );
}

export default App;

