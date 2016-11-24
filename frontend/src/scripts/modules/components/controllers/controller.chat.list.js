import React, {Component} from 'react'
import ChatListView from '../views/view.chat.list'

export default class ChatListController extends Component {
  constructor(props){
    super(props);
    this.getCurrentChat = this.getCurrentChat.bind(this);
    this.state = {chatRoomList: [{
      id: '',
      name: '',
      logo: ''
    }]};
  }

  componentDidMount(){
    let self = this;

    fetch('/userdata/chatlist', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(response => {
      response.json().then(chatlist => {
        self.setState(chatlist);
      });
    });
  }

  getCurrentChat(event){
    let chatName = event.target.textContent;
    this.state.chatRoomList.forEach((chatRoom) => {
      if(chatName === chatRoom.name) localStorage.setItem('currentChat', chatName);
    });
  }

  render(){
    return (
      <ChatListView getCurrentChat={this.getCurrentChat} chatRoomList={this.state.chatRoomList} />
    );
  }
}
