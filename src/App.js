import './App.css';
import Post from './post';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function App({ auth, setUserId }) {
  const [allPosts, setAllPosts] = useState([]);

  function renderAllPosts() {
    fetch('https://webdev-hw-api.vercel.app/api/v1/prod/instapro')
      .then((response) => response.json())
      .then((data) => setAllPosts(data.posts))
      .then(console.log(allPosts))
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
              <button class="header-button add-or-login-button"
                style={auth === true ? { display: 'block' } : { display: 'none' }}
              >
                <div title="Добавить пост" class="add-post-sign"></div>
              </button>
            </Link>
            <Link to="/login">
              <button className="header-button add-or-login-button">
                {auth === true ? 'Выйти' : 'Войти'}
              </button>
            </Link>
          </div>
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
              userAva={post.user.imageUrl}
              userId={post.user.id}
              setUserId={setUserId}
            />
          ))}
        </ul>
      </div>
    </div>

  );
}

export default App;

