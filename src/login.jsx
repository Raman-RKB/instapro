import './App.css';

function Login() {


    return (
        <div class="page-container">
            <div class="header-container">
                <div class="page-header">
                    <h1 class="logo">instapro</h1>
                    <button class="header-button add-or-login-button">
                        Войти
                    </button>
                </div>
            </div>
            <div class="form">
                <h3 class="form-title">
                    Вход в&nbsp;Instapro
                </h3>
                <div class="form-inputs">
                    <input type="text" id="login-input" class="input" placeholder="Логин" />
                    <input type="password" id="password-input" class="input" placeholder="Пароль" />
                    <div class="form-error"></div>
                    <button class="button" id="login-button">Войти</button>
                </div>
                <div class="form-footer">
                    <p class="form-footer-title">
                        Нет аккаунта?
                        <button class="link-button" id="toggle-button">
                            Зарегистрироваться.
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;

