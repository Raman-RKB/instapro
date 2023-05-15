import './App.css';
import UserPage from './userPage';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

function App() {
  const [allPosts, setAllPosts] = useState([]);


  function renderAllPosts() {
    fetch('https://webdev-hw-api.vercel.app/api/v1/prod/instapro')
      .then((response) => response.json())
      .then((data) => setAllPosts(data.posts))
  }

  useEffect(() => {
    renderAllPosts()
  }, [])

  useEffect(() => {
    console.log(allPosts[0]);
  }, [allPosts])

  return (
    <div className="App">
      <div className="page-container">
        <div className="header-container">
          <div className="page-header">
            <div className="logo">instapro</div>
            <NavLink to='/login'>
              <button className="header-button add-or-login-button">Войти</button>
            </NavLink>
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
