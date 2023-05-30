import './style/App.css';
import Post from './Post';
import { renderAllPosts } from './ApiService';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App({ setUserId, userToken }) {
  const [allPosts, setAllPosts] = useState([]);
  const navigate = useNavigate();

  function navigateToAddPost() {
    navigate('/add-post');
  }

  useEffect(() => {
    renderAllPosts()
      .then(posts => setAllPosts(posts?.posts))
  }, [])

  return (
    <div className="App">
      <div className="page-container">
        <div className="header-container">
          <div className="page-header">
            <div className="logo">instapro</div>
            <button class="header-button add-or-login-button" onClick={navigateToAddPost}
              style={userToken ? { display: 'block' } : { display: 'none' }}
            >
              <div title="Добавить пост" class="add-post-sign"></div>
            </button>
            <NavLink to="/login">
              <button className="header-button add-or-login-button">
                {userToken ? 'Выйти' : 'Войти'}
              </button>
            </NavLink>
          </div>
        </div>
        <ul className="posts" >
          {allPosts.length ? (allPosts.map((post) => (
            <Post
              key={post.id}
              img={post.imageUrl}
              likes={post.likes}
              description={post.description}
              date={post.createdAt}
              name={post.user.name}
              userAva={post.user.imageUrl}
              userId={post.user.id}
              setUserId={setUserId}
              userToken={userToken}
              postId={post.id}
            />
          ))) : <div className="spinner-container"><Spinner animation="border" /></div>}
        </ul>
      </div>
    </div>

  );
}

export default App;

