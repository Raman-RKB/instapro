import './App.css';

function Auth() {
    const baseUrl = 'https://webdev-hw-api.vercel.app/api/user';


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
                    <input type="text" id="name-input" class="input" placeholder="Имя" />
                    <input type="text" id="login-input" class="input" placeholder="Логин" />
                    <input type="password" id="password-input" class="input" placeholder="Пароль" />
                    <div class="form-error"></div>
                    <button class="button" id="login-button">Зарегистрироваться</button>
                </div>
                <div className="form-footer">
                    <p class="form-footer-title">
                        Уже есть аккаунт?
                        <button class="link-button" id="toggle-button">
                            Войти.
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Auth;
