import React, {Component} from 'react'
import { setUserActionComponentHeigth } from '../../api/common.api'
import { getMyChatList } from '../../api/user.api'
import MyChatsView from '../views/my.chats.view'

export default class MyChatsContainer extends Component {
  constructor(props){
    super(props);
    this.getCurrentChat = this.getCurrentChat.bind(this);
    this.state = {
      myChatRoomList: []
    };
  }

  componentDidMount(){
    let self = this;
    let userId = localStorage.getItem('user');
    setUserActionComponentHeigth();
    getMyChatList(userId).then(chatlist => {
      self.setState({myChatRoomList: chatlist});
    });
  }

  getCurrentChat(event) {
    let chatName = event.target.textContent;
    this.state.searchedChatData.forEach((chatRoom) => {
      if (chatName === chatRoom.name) {
        localStorage.setItem('currentChatName', chatName);
        localStorage.setItem('currentChatLogo', chatRoom.logo);
        applyLoadingStrip();
        setTimeout(() => browserHistory.push('/userpage/current_chat'), 800);
      }
    });
  }

  render(){
    return (
      <MyChatsView
        getCurrentChat={this.getCurrentChat}
        myChatRoomList={this.state.myChatRoomList}/>
    );
  }
}