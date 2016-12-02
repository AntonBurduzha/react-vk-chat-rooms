import React, {Component} from 'react'
import { connect } from 'react-redux'
import store from '../../store'
import { getUserData } from '../../api/login.api'
import { getCurrentChatMsg, postCurrentChatMsg } from '../../api/chat.api'
import { setUserActionComponentHeigth, setChatArticleHeight } from '../../api/common.api'
import { setVkUserData } from '../../actions/login.actions'
import { setCurrentChatMsg, setCurrentChatMsgData } from '../../actions/chat.action'
import ChatView from '../views/chat.view'
let io = require('socket.io-client');

let socket = io();

class ChatContainer extends Component {
  constructor(props){
    super(props);
    this.getInputedMessage = this.getInputedMessage.bind(this);
    this.postInputedMessage = this.postInputedMessage.bind(this);
    this.messageRecieve = this.messageRecieve.bind(this);
    this.state = {
      chatName: '',
      chatLogo: '',
      inputedMessage: ''
    };
  }

  componentDidMount(){
    setUserActionComponentHeigth();
    setChatArticleHeight();
    const chatName = localStorage.getItem('currentChatName');
    const chatLogo = localStorage.getItem('currentChatLogo');
    const userId = localStorage.getItem('user');
    this.setState({chatName: chatName, chatLogo: chatLogo});

    getUserData(userId).then(userdata => {
      store.dispatch(setVkUserData(userdata.userInfo));
    });
    getCurrentChatMsg(chatName).then(chatMsg => {
      store.dispatch(setCurrentChatMsg(chatMsg));
    });
    socket.on('send.message', this.messageRecieve);
  }

  messageRecieve(msgData){
    store.dispatch(setCurrentChatMsgData(msgData));
  }

  getInputedMessage(event){
    this.setState({inputedMessage: event.target.value});
  }

  postInputedMessage(){
    let date = new Date().toLocaleString();
    let params = {
      photo_50: this.props.userData.photo_50,
      first_name: this.props.userData.first_name,
      date: date,
      domain: this.props.userData.domain,
      text: this.state.inputedMessage,
      chatName: this.state.chatName
    };
    let firstParam = `photo_50=${params.photo_50}&first_name=${params.first_name}&date=${params.date}`;
    let secondParam = `&domain=${params.domain}&text=${params.text}&chatName=${params.chatName}`;
    //postCurrentChatMsg(firstParam + secondParam);
    document.querySelector('.input-chat-message').value = '';
    socket.emit('send.message', params);
  }

  render(){
    return (
      <ChatView
        chatLogo={this.state.chatLogo}
        chatName={this.state.chatName}
        getInputedMessage={this.getInputedMessage}
        postInputedMessage={this.postInputedMessage}
        chatMsgList={this.props.chatMsgList}/>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    userData: state.loginState,
    chatMsgList: state.chatState
  };
};

export default connect(mapStateToProps)(ChatContainer);