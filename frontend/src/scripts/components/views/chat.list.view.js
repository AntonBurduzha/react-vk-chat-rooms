import React, {Component} from 'react'

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
              <h3
                className="text-chatroom-list"
                onClick={self.props.getCurrentChat}>{chatRoom.name}</h3>
            </div>
          );
        })}
      </div>
    )
  }
}