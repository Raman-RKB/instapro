import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { registerClickQuery, onImageChangeQuery } from './ApiService';
import { Spinner } from 'react-bootstrap';
import AddImg from './AddImg'
import 'bootstrap/dist/css/bootstrap.min.css';

function Reg({ setUserToken, imageUrl }) {
    const [name, setName] = useState("");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    function navigateToMain() {
        navigate('/');
    }

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
    // -------------------------------------------------------------------------------
    function registerClick() {
        setIsLoading(true)
        if (name.length && login.length && password.length) {
            registerClickQuery(login, name, password, localStorage.getItem('imgUrl'))
                .then(data => {
                    // eslint-disable-next-line no-unused-expressions
                    data.error ? (alert(data.error), setIsLoading(false)) : (setUserToken(data.user.token), setIsLoading(false), navigate('/login'))
                })
                .catch(error => console.error('ошибка:', error))
        } else {
            setIsLoading(false)
            alert('Вы ввели не все данные')
        }
    }

    return (
        <div className="page-container">
            <div className="header-container">
                <div className="page-header">
                    <h1 className="logo" onClick={navigateToMain}>instapro</h1>
                    <button className="header-button add-or-login-button">Войти</button>
                </div>
            </div>
            {isLoading ?
                <div className="spinner-container"><Spinner animation="border" /></div>
                :
                <div className="form">
                    <h3 className="form-title"> Регистрация&nbsp;в&nbsp;Instapro</h3>
                    <div className="form-inputs">
                        <AddImg />
                        <input type="text" id="name-input" class="input" placeholder="Имя" onChange={onNameSet} />
                        <input type="text" id="login-input" class="input" placeholder="Логин" onChange={onLoginSet} />
                        <input type="password" id="password-input" class="input" placeholder="Пароль" onChange={onPasswordSet} />
                        <div class="form-error"></div>
                        <button class="button" id="login-button" onClick={registerClick}>Зарегистрироваться</button>
                    </div>
                    <div className="form-footer">
                        <p class="form-footer-title">
                            Уже есть аккаунт?
                            <NavLink to='/login'>
                                <button class="link-button" id="toggle-button">
                                    &nbsp;Войти.
                                </button>
                            </NavLink>
                        </p>
                    </div>
                </div>
            }

        </div>
    );
}

export default Reg;
