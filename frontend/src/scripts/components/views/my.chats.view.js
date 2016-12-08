import React, {Component} from 'react'

export default class MyChatsView extends Component {
  render(){
    let self = this;
    let myChatData;
    if(this.props.myChatRoomList.length > 0){
      myChatData = this.props.myChatRoomList.map((chatRoom, i) => {
        return (
          <div key={i} className="article-chatroom-list">
            <img className="img-chatroom-list" src={chatRoom.logo} alt="marvel"/>
            <h3
              className="text-chatroom-list"
              onClick={self.props.getCurrentChat}>{chatRoom.name}</h3>
            <button
              className="btn-remove-my-chat"
              onClick={self.props.removeCurrentChat}>Удалить</button>
          </div>
        );
      })
    } else {
      myChatData = <p className="text-search text-center">Вы не создали ни одного чата. Перейдите во вкладку "Создать чат"</p>
    }
    return (
      <div className="col-md-6 container-user-action">
        <h3 className="title-chatrooms-list">Мои чаты: </h3>
        {myChatData}
      </div>
    )
  }
}