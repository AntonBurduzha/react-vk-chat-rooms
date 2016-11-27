import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import store from '../../store'
import userApi from '../../api/user.api'
import { applyLoadingStrip } from '../../api/common.api'
import { getDefaultChatList } from '../../actions/user.actions'
import ChatListView from '../views/chat.list.view'

class ChatListContainer extends Component {
  constructor(props){
    super(props);
    this.getCurrentChat = this.getCurrentChat.bind(this);
  }

  componentDidMount(){
    userApi.getChatList().then(chatlist => {
      store.dispatch(getDefaultChatList(chatlist.chatRoomList));
    });
  }

  getCurrentChat(event){
    let chatName = event.target.textContent;
    this.props.chatListData.forEach((chatRoom) => {
      if(chatName === chatRoom.name) {
        localStorage.setItem('currentChat', chatName);
        applyLoadingStrip();
        setTimeout(() => browserHistory.push('/userpage/current_chat'), 800);
      }
    });
  }

  render(){
    return (
      <ChatListView
        getCurrentChat={this.getCurrentChat}
        chatListData={this.props.chatListData} />
    );
  }
}

const mapStateToProps = function(state) {
  return {
    chatListData: state.chatListState
  };
};

export default connect(mapStateToProps)(ChatListContainer);
