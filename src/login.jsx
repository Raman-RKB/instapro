import './App.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { loginClick } from './api-service';

function Login({ setUserToken }) {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    function onLoginSet(event) {
        const target = event.target.value;
        setLogin(target);
    }

    function onPasswordSet(event) {
        const target = event.target.value;
        setPassword(target);
    }

    return (
        <>
            <div className="page-container">
                <div className="header-container">
                    <div className="page-header">
                        <Link to="/">
                            <h1 className="logo">instapro</h1>
                        </Link>
                        <button className="header-button add-or-login-button">
                            Войти
                        </button>
                    </div>
                </div>
                <div className="form">
                    <h3 className="form-title">
                        Вход в&nbsp;Instapro
                    </h3>
                    <div className="form-inputs">
                        <input type="text" id="login-input" className="input" placeholder="Логин" onChange={onLoginSet} />
                        <input type="password" id="password-input" className="input" placeholder="Пароль" onChange={onPasswordSet} />
                        <div className="form-error"></div>
                        <button className="button" id="login-button" onClick={loginClick(login, password, setUserToken, navigate)}>Войти</button>
                    </div>
                    <div className="form-footer">
                        <p className="form-footer-title">
                            Нет аккаунта?
                            <Link to="/reg">
                                <button className="link-button" id="toggle-button">Зарегистрироваться.</button>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;

