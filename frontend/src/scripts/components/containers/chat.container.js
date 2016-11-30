import React, {Component} from 'react'
import { connect } from 'react-redux'
import store from '../../store'
import { getUserData } from '../../api/login.api'
import { getCurrentChatMsg, postCurrentChatMsg } from '../../api/chat.api'
import { setUserActionComponentHeigth, setChatArticleHeight } from '../../api/common.api'
import { setVkUserData } from '../../actions/login.actions'
import { setCurrentChatMsg } from '../../actions/chat.action'
import ChatView from '../views/chat.view'

class ChatContainer extends Component {
  constructor(props){
    super(props);
    this.getInputedMessage = this.getInputedMessage.bind(this);
    this.postInputedMessage = this.postInputedMessage.bind(this);
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

  }

  getInputedMessage(event){
    this.setState({inputedMessage: event.target.value});
  }

  postInputedMessage(){
    let date = new Date().toLocaleString();
    let params = {
      photo_50: `photo_50=${this.props.userData.photo_50}`,
      first_name: `&first_name=${this.props.userData.first_name}`,
      msgDate: `&date=${date}`,
      domain: `&domain=${this.props.userData.domain}`,
      msgText: `&text=${this.state.inputedMessage}`,
      chatName: `&chatName=${this.state.chatName}`
    };
    postCurrentChatMsg(params.photo_50 + params.first_name + params.msgDate + params.domain + params.msgText + params.chatName);
    document.querySelector('.input-chat-message').value = '';
    store.dispatch(postCurrentChatMsg([params]));
  }

  render(){
    console.log(this.props.chatMsgList);
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