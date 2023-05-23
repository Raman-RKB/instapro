import './App.css';
import Post from './post';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function App({ auth, setUserId, userToken }) {
  const [allPosts, setAllPosts] = useState([]);
  const navigate = useNavigate();

  console.log(userToken, 'userToken в App');

  function navigateToAddPost() {
    navigate('/add-post');
  }

  function renderAllPosts() {
    fetch('https://webdev-hw-api.vercel.app/api/v1/prod/instapro')
      .then((response) => response.json())
      .then((data) => setAllPosts(data.posts))
  }

  useEffect(() => {
    renderAllPosts()
  }, [])

  return (
    <div className="App">
      <div className="page-container">
        <div className="header-container">
          <div className="page-header">
            <div className="logo">instapro</div>
            <button class="header-button add-or-login-button" onClick={navigateToAddPost}
              style={auth === true ? { display: 'block' } : { display: 'none' }}
            >
              <div title="Добавить пост" class="add-post-sign"></div>
            </button>
            <NavLink to="/login">
              <button className="header-button add-or-login-button">
                {auth === true ? 'Выйти' : 'Войти'}
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

