import React from "react";
import { createAuthProvider } from "../../auth/authProvider";
import { createTokenProvider } from "../../auth/tokenProvider";
import logo from '../../images/sibdev-logo.png';




const Auth = () => {
    const authProvider = createAuthProvider();
    const tokenProvider = createTokenProvider();

    return (
        <div className="auth">
            <div className="auth__container">
                <div className="auth__logo">
                    <img src={logo} alt="logo" />
                    <p>Вход</p>
                </div>
                <form className="auth__log_pass_block">
                    <div className="auth__log">
                        <label>Логин</label>
                        <input className="auth__input" />
                    </div>
                    <div className="auth__pass">
                        <label>Пароль</label>
                        <input className="auth__input" />
                    </div>
                </form>
                <div>
                    <button className="auth__sign_in" onClick={async() => { await authProvider.logIn("qwerty", "qwe")}}>Войти</button>
                </div>
            </div>
        </div>

    );
};

export default Auth;