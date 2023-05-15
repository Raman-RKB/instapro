import './App.css';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Reg() {
    const baseUrl = 'https://webdev-hw-api.vercel.app/api/user';
    const [name, setName] = useState("");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

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
            fetch(baseUrl, {
                "login": `${login}`,
                "name": `${name}`,
                "password": `${password}`
            }).then(response => response.json())
                .then(data => console.log(data))
                .then(data => {
                    localStorage.setItem('userData', data)
                })
        } else {
            alert('Вы ввели не все данные')
        }
    }

    return (
        <div className="page-container">
            <div className="header-container">
                <div className="page-header">
                    <h1 className="logo">instapro</h1>
                    <button className="header-button add-or-login-button">instapro</button>
                </div>
            </div>
            <div className="form">
                <h3 className="form-title"> Регистрация&nbsp в&nbsp Instapro</h3>
                <div className="form-inputs">
                    <div className="upload-image-container">
                        <div className="upload-image">
                            <label className="file-upload-label secondary-button">
                                <input type="file"
                                    className="file-upload-input"
                                    style="display:none" />
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
                                Войти.
                            </button>
                        </NavLink>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Reg;
