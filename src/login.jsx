import './App.css';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Login({ setAuth, setUserToken }) {
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

    function loginClick() {
        if (login.length && password.length) {
            fetch('https://webdev-hw-api.vercel.app/api/user/login', {
                method: "POST",
                body: JSON.stringify({
                    login: login,
                    password: password
                })
            })
                .then(responce => responce.json())
                .then((data) => {
                    setUserToken(data.user.token)
                    setAuth(true);
                    console.log(data, 'ответ после логина');
                    navigate('/');
                })

                .catch(error => console.log('ошибка:', error))
        } else {
            alert('Вы ввели не все данные')
        }
    }

    useEffect(() => {
        setAuth(false);
    }, [])

    return (
        <>
            <div className="page-container">
                <div className="header-container">
                    <div className="page-header">
                        <h1 className="logo">instapro</h1>
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
                        <button className="button" id="login-button" onClick={loginClick}>Войти</button>
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

