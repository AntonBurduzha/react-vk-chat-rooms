import React, {Component} from 'react'
import {Link} from 'react-router'

export default class ChatListView extends Component {
  render(){
    let self = this;
    return (
      <div className="col-md-6">
        <h2 className="title-chatrooms-list">Список чатов: </h2>
        {this.props.chatListData.map(function (chatRoom) {
          return(
            <div key={chatRoom.id} className="article-chatroom">
              <img className="img-chatroom-list" src={chatRoom.logo} alt="marvel"/>
              <Link
                to="/userpage/current_chat"
                className="link-chatroom-list" onClick={self.props.getCurrentChat}>{chatRoom.name}</Link>
            </div>
          );
        })}
      </div>
    )
  }
}