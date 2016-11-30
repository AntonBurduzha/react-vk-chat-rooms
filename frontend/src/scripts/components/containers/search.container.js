import React, {Component} from 'react'
import { browserHistory } from 'react-router'
import { getSearchedChatList } from '../../api/user.api'
import { applyLoadingStrip, setUserActionComponentHeigth } from '../../api/common.api'
import SearchView from '../views/search.view'

export default class SearchContainer extends Component {
  constructor(props){
    super(props);
    this.getInputedChatNames = this.getInputedChatNames.bind(this);
    this.getSearchedChatList = this.getSearchedChatList.bind(this);
    this.getCurrentChat = this.getCurrentChat.bind(this);
    this.state = {
      'inputedChats': '',
      'chatListLoaded': false,
      searchedChatData: []
    };
  }

  componentDidMount(){
    setUserActionComponentHeigth();
  }

  getInputedChatNames(event){
    this.setState({'inputedChats': event.target.value});
  }

  getSearchedChatList(){
    let self = this;
    this.state.inputedChats.length > 0 ? this.setState({'chatListLoaded': true}) : this.setState({'chatListLoaded': false});
    let inputedChatName = self.state.inputedChats.toLowerCase();
    getSearchedChatList(inputedChatName).then(chatlist => {
      self.setState({searchedChatData: chatlist});
    });
  }

  getCurrentChat(event){
    let chatName = event.target.textContent;
    this.state.searchedChatData.forEach((chatRoom) => {
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
      <SearchView
        getInputedChatNames={this.getInputedChatNames}
        getSearchedChatList={this.getSearchedChatList}
        getCurrentChat={this.getCurrentChat}
        searchedChatData={this.state.searchedChatData}
        searchedChatListLoaded={this.state.chatListLoaded}/>
    );
  }
}