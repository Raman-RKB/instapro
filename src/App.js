import './App.css';
import UserPage from './userPage';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function App({ isLoggedIn }) {
  const [allPosts, setAllPosts] = useState([]);

  console.log(isLoggedIn, 'в App');

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
            <Link to="/add-post">
              <button class="header-button add-or-login-button" style={isLoggedIn === true ? { display: 'block' } : { display: 'none' }}>
                <div title="Добавить пост" class="add-post-sign"></div>
              </button>
            </Link>
            <Link to="/login">
              <button className="header-button add-or-login-button">{isLoggedIn === true ? 'Выйти' : 'Войти'}</button>
            </Link>
          </div>
        </div>
        <ul className="posts" >
          {allPosts && allPosts?.map((post) => (
            <UserPage
              key={post.id}
              img={post.imageUrl}
              likes={post.likes}
              description={post.description}
              date={post.createdAt}
              name={post.user.name}
              userAva={post.user.imageUrl}
              userId={post.user.id}
            />
          ))}
        </ul>
      </div>
    </div>

  );
}

export default App;
