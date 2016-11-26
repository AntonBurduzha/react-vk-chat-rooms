import React, {Component} from 'react'
import {Link} from 'react-router'

export default class UserServiceView extends Component {
  render(){
    return (
      <div className="col-md-3 container-user-page">
        <div className="article-user-info">
          <img className="img-user-info" src={this.props.photo_200} alt="moe_litso"/>
          <p className="text-user-info">{this.props.first_name}</p>
          <p className="text-user-info text-user-info-name">{this.props.last_name}</p>
        </div>
        <div className="divider-user-service"></div>
        <div className="article-user-service">
          <ul className="list-user-service">
            <li className="item-user-service">
              <Link
                to="/userpage"
                className="link-user-service item-selected"
                onClick={this.props.selectMenuItem}>Все чаты</Link>
            </li>
            <li className="item-user-service">
              <Link
                to="/userpage/my_chats"
                className="link-user-service"
                onClick={this.props.selectMenuItem}>Мои чаты</Link>
            </li>
            <li className="item-user-service">
              <Link
                to="/userpage/search_chat"
                className="link-user-service"
                onClick={this.props.selectMenuItem}>Поиск чата</Link>
            </li>
            <li className="item-user-service">
              <Link
                to="/userpage/create_chat"
                className="link-user-service"
                onClick={this.props.selectMenuItem}>Создать чат</Link>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
