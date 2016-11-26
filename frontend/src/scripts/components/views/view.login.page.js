import React from 'react'
import {Link} from 'react-router'

export default class LoginPageView extends React.Component {
  render() {
    return (
      <div className="row container-login">
        <div className="row main-article">
          <div className="col-md-offset-1 col-md-4 login-article">
            <h1 className="text-login text-center">Добро пожаловать</h1>
            <h1 className="text-login text-center">в</h1>
            <h1 className="text-login text-center">Vk Chat Rooms</h1>
          </div>
          <div className="col-md-7">
            <img src="../img/login-page-bg.jpg" className="img-login" alt="login-bg"/>
          </div>
        </div>
        <div className="row control-article">
          <button className="btn-sign-up" onClick={this.props.signUp}>Войти</button>
          <button className="btn-sign-up btn-sign-up-reg">
            <a className="text-btn-link" href="https://vk.com/login">Регистрация Vk</a>
          </button>
        </div>
        <div className="loading-strip"></div>
      </div>
    );
  }
}
