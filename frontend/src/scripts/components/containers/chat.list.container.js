import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { getChatList } from '../../api/user.api'
import { applyLoadingStrip, setUserActionComponentHeigth } from '../../api/common.api'
import { getDefaultChatList } from '../../actions/user.actions'
import ChatListView from '../views/chat.list.view'

class ChatListContainer extends Component {
  constructor(props){
    super(props);
    this.getCurrentChat = this.getCurrentChat.bind(this);
  }

  componentDidMount(){
    setUserActionComponentHeigth();
    getChatList().then(chatlist => {
      this.props.getDefaultChatList(chatlist.chatRoomList);
    });
  }

  getCurrentChat(event){
    let chatName = event.target.textContent;
    this.props.chatListData.forEach((chatRoom) => {
      if(chatName === chatRoom.name) {
        localStorage.setItem('currentChatName', chatName);
        localStorage.setItem('currentChatLogo', chatRoom.logo);
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

ChatListContainer.propTypes = {
  chatListData: PropTypes.arrayOf(PropTypes.object).isRequired,
  getDefaultChatList: PropTypes.func.isRequired
};

const mapStateToProps = function(state) {
  return {
    chatListData: state.chatListState
  };
};

const mapDispatchToProps = (dispatch) => ({
  getDefaultChatList: (chatListData) => getDefaultChatList(dispatch, chatListData)
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatListContainer);
