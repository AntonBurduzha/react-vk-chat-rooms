import React, {Component} from 'react'

export default class ChatView extends Component {
  render(){
    return (
      <div className="col-md-6 container-user-action">
        <div className="article-chat-data">
          <img className="img-chat-logo" src={this.props.chatLogo} alt="chat-logo"/>
          <h4 className="title-chat-name">{this.props.chatName}</h4>
        </div>
        <div className="article-chat-tools">

        </div>
      </div>
    )
  }
}