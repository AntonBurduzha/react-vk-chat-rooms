import React, {Component} from 'react'
import ChatListView from '../views/view.chat.list'
import userApi from '../../api/user.api'
import store from '../../store'
import {connect} from 'react-redux'
import userActions from '../../actions/user.actions'

class ChatListController extends Component {
  constructor(props){
    super(props);
    this.getCurrentChat = this.getCurrentChat.bind(this);
  }

  componentDidMount(){
    userApi.getChatList().then(chatlist => {
      store.dispatch(userActions.getDefaultChatList(chatlist.chatRoomList));
    });
  }

  getCurrentChat(event){
    let chatName = event.target.textContent;
    this.props.chatListData.forEach((chatRoom) => {
      if(chatName === chatRoom.name) localStorage.setItem('currentChat', chatName);
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

export default connect(mapStateToProps)(ChatListController);
