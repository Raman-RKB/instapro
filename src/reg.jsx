import './App.css';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function Reg() {
    const baseUrl = 'https://webdev-hw-api.vercel.app';
    const [name, setName] = useState("");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState("");

    const navigate = useNavigate();

    function onNameSet(event) {
        const target = event.target.value;
        setName(target);
    }

    function onLoginSet(event) {
        const target = event.target.value;
        setLogin(target);
    }

    function onPasswordSet(event) {
        const target = event.target.value;
        setPassword(target);
    }

    function registerClick() {
        if (name.length && login.length && password.length) {
            fetch(baseUrl + '/api/user', {
                method: "POST",
                body: JSON.stringify({
                    imageUrl: avatar,
                    login: login,
                    name: name,
                    password: password
                })
            }).then(response => response.json())
                .then(data => {
                    localStorage.setItem('token', data.user.token);
                    localStorage.setItem('id', data.user._id);
                    localStorage.setItem('password', data.user.password);
                    localStorage.setItem('login', data.user.login);
                    navigate('/login');
                })
                .catch(error => console.log('ошибка:', error))
        } else {
            alert('Вы ввели не все данные')
        }
    }

    function handleAvaUpload(event) {
        const img = event.target.files[0];
        const data = new FormData();
        data.append('file', img);

        return fetch(baseUrl + "/api/upload/image", {
            method: 'POST',
            body: data
        })
            .then(response => response.json())
            .then(data => setAvatar(data.fileUrl))
    }

    return (
        <div className="page-container">
            <div className="header-container">
                <div className="page-header">
                    <h1 className="logo">instapro</h1>
                    <button className="header-button add-or-login-button">Войти</button>
                </div>
            </div>
            <div className="form">
                <h3 className="form-title"> Регистрация&nbsp;в&nbsp;Instapro</h3>
                <div className="form-inputs">
                    <div className="upload-image-container">
                        <div className="upload-image">
                            <label className="file-upload-label secondary-button">
                                <input type="file" className="file-upload-input" style={{ display: 'none' }} onChange={handleAvaUpload} />
                                Выберите фото
                            </label>
                        </div>
                    </div>
                    <input type="text" id="name-input" class="input" placeholder="Имя" onChange={onNameSet} />
                    <input type="text" id="login-input" class="input" placeholder="Логин" onChange={onLoginSet} />
                    <input type="password" id="password-input" class="input" placeholder="Пароль" onChange={onPasswordSet} />
                    <div class="form-error"></div>
                    <button class="button" id="login-button" onClick={registerClick}>Зарегистрироваться</button>
                </div>
                <div className="form-footer">
                    <p class="form-footer-title">
                        Уже есть аккаунт?
                        <NavLink to='/'>
                            <button class="link-button" id="toggle-button">
                                &nbsp;Войти.
                            </button>
                        </NavLink>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Reg;
