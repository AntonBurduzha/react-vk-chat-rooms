import React, {Component} from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import store from '../../store'
import userApi from '../../api/user.api'
import { applyLoadingStrip } from '../../api/common.api'
import { getDefaultChatList } from '../../actions/user.actions'
import { getSearchedChatList } from '../../actions/user.actions'
import SearchView from '../views/search.view'

class SearchController extends Component {
  constructor(props){
    super(props);
    this.getInputedChatNames = this.getInputedChatNames.bind(this);
    this.getSearchedChatList = this.getSearchedChatList.bind(this);
    this.getCurrentChat = this.getCurrentChat.bind(this);
    this.state = {
      'inputedChats': '',
      'chatListLoaded': false
    };
  }

  getInputedChatNames(event){
    this.setState({'inputedChats': event.target.value});
  }

  componentDidMount(){
    userApi.getChatList().then(chatlist => {
      store.dispatch(getDefaultChatList(chatlist.chatRoomList));
    });
  }

  getSearchedChatList(){
    let self = this;
    let searchedChatList = [];
    this.props.chatListData.forEach(chatItem => {
      let searchedChat = self.state.inputedChats.toLowerCase();
      if(chatItem.name.toLowerCase().indexOf(searchedChat) !== -1 && searchedChat.length !== 0){
        searchedChatList.push(chatItem);
      }
    });
    store.dispatch(getSearchedChatList(searchedChatList));
    this.state.inputedChats.length > 0 ? this.setState({'chatListLoaded': true}) : this.setState({'chatListLoaded': false})
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
      <SearchView
        getInputedChatNames={this.getInputedChatNames}
        getSearchedChatList={this.getSearchedChatList}
        searchedChatData={this.props.searchedChatData}
        getCurrentChat={this.getCurrentChat}
        searchedChatListLoaded={this.state.chatListLoaded}/>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    chatListData: state.chatListState,
    searchedChatData: state.searchState
  };
};

export default connect(mapStateToProps)(SearchController);