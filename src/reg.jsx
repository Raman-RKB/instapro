import './App.css';
import { useState, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { onImageChangeQuery, registerClickQuery } from './api-service';
import { Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Reg({ setUserToken }) {
    const [name, setName] = useState("");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState("");
    const [regClickState, setRegClickState] = useState(false);
    const [regResponse, setRegResponse] = useState(false);
    const [imageHasBeenChosen, setImageHasBeenChosen] = useState(false);

    const navigate = useNavigate();
    const inputRef = useRef();

    function navigateToMain() {
        navigate('/');
    }

    function handleChooseAnotherImg() {
        setAvatar('')
        inputRef.current.click();
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

    function registerClick() {
        setRegClickState(true)
        if (name.length && login.length && password.length) {
            registerClickQuery(avatar, login, name, password)
                .then(data => {
                    setUserToken(data.user.token);
                    setRegResponse(true)
                    navigate('/login');
                })
                .catch(error => console.error('ошибка:', error))
        } else {
            alert('Вы ввели не все данные')
        }
    }

    function handleAvaUpload(event) {
        const img = event.target.files[0];
        const data = new FormData();
        data.append('file', img);

        onImageChangeQuery(data)
            .then(data => {
                setAvatar(data.fileUrl)
                setImageHasBeenChosen(true)
            })
    }

    return (
        <div className="page-container">
            <div className="header-container">
                <div className="page-header">
                    <h1 className="logo" onClick={navigateToMain}>instapro</h1>
                    <button className="header-button add-or-login-button">Войти</button>
                </div>
            </div>
            {!regResponse && regClickState ?
                <div className="spinner-container"><Spinner animation="border" /></div>
                :
                <div className="form">
                    <h3 className="form-title"> Регистрация&nbsp;в&nbsp;Instapro</h3>
                    <div className="form-inputs">
                        <div className="upload-image-container">
                            <div className="upload-image" style={{ display: imageHasBeenChosen ? 'none' : 'flex' }}>
                                <label className="file-upload-label secondary-button">
                                    <input type="file" className="file-upload-input" style={{ display: 'none' }} ref={inputRef} onChange={handleAvaUpload} />
                                    Выберите фото
                                </label>
                            </div>
                            {!avatar && imageHasBeenChosen ?
                                <div className="spinner-container"><Spinner animation="border" /></div>
                                :
                                <div className="file-upload-image-conrainer" style={{ display: avatar ? 'flex' : 'none' }}>
                                    <img className="file-upload-image" src={avatar} />
                                    <button className="file-upload-remove-button button" onClick={handleChooseAnotherImg}>Заменить фото</button>
                                </div>
                            }
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
            }

        </div>
    );
}

export default Reg;
