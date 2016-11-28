import React, {Component} from 'react'
import { setUserActionComponentHeigth } from '../../api/common.api'
import ChatView from '../views/chat.view'

export default class ChatContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      chatName: '',
      chatLogo: ''
    };
  }

  componentDidMount(){
    setUserActionComponentHeigth();
    const chatName = localStorage.getItem('currentChatName');
    const chatLogo = localStorage.getItem('currentChatLogo');
    this.setState({chatName: chatName, chatLogo: chatLogo});
  }

  render(){
    return (
      <ChatView
        chatLogo={this.state.chatLogo}
        chatName={this.state.chatName}/>
    );
  }
}