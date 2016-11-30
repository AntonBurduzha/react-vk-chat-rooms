import React, {Component} from 'react'

export default class ChatView extends Component {
  render(){
    let chatMsgList;
    if(this.props.chatMsgList.length > 0){
      chatMsgList = this.props.chatMsgList.map(msgData => {
        return (
          <div className="article-chat-message" key={msgData.text}>
            <a href={msgData.domain}>
              <img className="img-user-message" src={msgData.photo_50} alt="user-photo"/>
            </a>
            <a className="text-user-name-message" href={msgData.domain}>{msgData.first_name}</a>
            <p className="text-date-message">{msgData.date}</p>
            <p className="text-user-message">{msgData.text}</p>
          </div>
        );
      });
    } else {
      chatMsgList = <p className="text-search text-center">Пока нет сообщений</p>
    }

    return (
      <div className="col-md-6 container-user-action">
        <div className="article-chat-data">
          <img className="img-chat-logo" src={this.props.chatLogo} alt="chat-logo"/>
          <h4 className="title-chat-name">{this.props.chatName}</h4>
        </div>
        <div className="article-chat">
          {chatMsgList}
        </div>
        <div className="article-chat-tools">
          <textarea
            className="input-chat-message"
            rows="3"
            placeholder="Введите сообщение"
            onChange={this.props.getInputedMessage}/>
          <button
            className="btn-chat-message"
            onClick={this.props.postInputedMessage}>Отправить</button>
        </div>
      </div>
    )
  }
}