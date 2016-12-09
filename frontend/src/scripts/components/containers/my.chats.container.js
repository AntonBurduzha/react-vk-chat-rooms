import React, {Component} from 'react'
import { browserHistory } from 'react-router'
import { applyLoadingStrip, setUserActionComponentHeigth } from '../../api/common.api'
import { getMyChatList, removeMyChat } from '../../api/user.api'
import MyChatsView from '../views/my.chats.view'
import RemoveChatModalView from '../views/remove.chat.modal'

export default class MyChatsContainer extends Component {
  constructor(props){
    super(props);
    this.getCurrentChat = this.getCurrentChat.bind(this);
    this.removeCurrentChat = this.removeCurrentChat.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.state = {
      myChatRoomList: [],
      modalIsOpen: false,
      removedChatName: ''
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

  removeCurrentChat () {
    //removeMyChat(`chatName=${chatName}`);
    let removedElemIndex = 0;
    let updatedChatList = this.state.myChatRoomList.map((item, i) => {
      if (item.name === this.state.removedChatName) removedElemIndex = i;
      return item;
    });
    updatedChatList.splice(removedElemIndex, 1);
    this.setState({
      myChatRoomList: updatedChatList,
      removedChatName: '',
      modalIsOpen: false
    });
  }

  openModal(event){
    let chatName = event.target.parentNode.childNodes[1].textContent;
    this.setState({
      modalIsOpen: true,
      removedChatName: chatName
    });
  }

  closeModal(){
    this.setState({modalIsOpen: false});
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
      <div className="article-my-chats">
        <MyChatsView
          getCurrentChat={this.getCurrentChat}
          myChatRoomList={this.state.myChatRoomList}
          openModal={this.openModal}/>
        <RemoveChatModalView
          modalIsOpen={this.state.modalIsOpen}
          closeModal={this.closeModal}
          removeCurrentChat={this.removeCurrentChat}/>
      </div>
    );
  }
}