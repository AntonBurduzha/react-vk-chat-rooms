import React, {Component} from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { applyLoadingStrip, setUserActionComponentHeigth } from '../../api/common.api'
import { getMyChatList, removeMyChat } from '../../api/user.api'
import MyChatsView from '../views/my.chats.view'

export default class MyChatsContainer extends Component {
  constructor(props){
    super(props);
    this.getCurrentChat = this.getCurrentChat.bind(this);
    this.removeCurrentChat = this.removeCurrentChat.bind(this);
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

  removeCurrentChat (event) {
    let chatName = event.target.parentNode.childNodes[1].textContent;
    //removeMyChat(`chatName=${chatName}`);
    let removedElemIndex = 0;
    let updatedChatList = this.state.myChatRoomList.map((item, i) => {
      if (item.name === chatName) removedElemIndex = i;
      return item;
    });
    updatedChatList.splice(removedElemIndex, 1);
    this.setState({myChatRoomList: updatedChatList});
  }

  getCurrentChat(event) {
    let chatName = event.target.textContent;
    this.state.myChatRoomList.forEach((chatRoom) => {
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
        myChatRoomList={this.state.myChatRoomList}
        removeCurrentChat={this.removeCurrentChat}/>
    );
  }
}