import './App.css';
import Post from './post';
import { renderAllPosts } from './api-service';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function App({ setUserId, userToken }) {
  const [allPosts, setAllPosts] = useState([]);
  const navigate = useNavigate();

  // console.log(renderAllPosts, 'renderAllPosts');

  function navigateToAddPost() {
    navigate('/add-post');
  }

  useEffect(() => {
    renderAllPosts(setAllPosts)
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
          {allPosts.map((post) => (
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
          ))}
        </ul>
      </div>
    </div>

  );
}

export default App;

