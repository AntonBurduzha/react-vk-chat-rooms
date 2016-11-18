import React from 'react'
import {Link} from 'react-router'

export default class App extends React.Component {
  constructor(){
    super();
    this.logout.bind(this);
  }
  logout(){
    VK.Auth.logout();
  }
  render(){
    return (
      <div>
        <div className="header-vk">
          <a href="https://vk.com">
            <img src="../img/vk_logo.jpg" alt="vk_logo"/>
          </a>
          <Link to="/" className="link-logout" onClick={this.logout}>Выйти</Link>
        </div>
        {this.props.children}
      </div>
    )
  }
}