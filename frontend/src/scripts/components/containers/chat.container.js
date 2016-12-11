import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { getUserData } from '../../api/login.api'
import { getCurrentChatMsg, postCurrentChatMsg } from '../../api/chat.api'
import { setUserActionComponentHeigth, setChatArticleHeight, scrollDown } from '../../api/common.api'
import { setVkUserData } from '../../actions/login.actions'
import { setCurrentChatMsg, setCurrentChatMsgData } from '../../actions/chat.action'
import ChatView from '../views/chat.view'
import update from 'immutability-helper';

const io = require('socket.io-client');

class ChatContainer extends Component {
  constructor(props){
    super(props);
    this.getInputedMessage = this.getInputedMessage.bind(this);
    this.postInputedMessage = this.postInputedMessage.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.handleEnterKeyPress = this.handleEnterKeyPress.bind(this);
    this.showAddedMembers = this.showAddedMembers.bind(this);
    this.state = {
      chatName: '',
      chatLogo: '',
      inputedMessage: '',
      socket: io(),
      chatMembers: []
    };
  }

  componentWillUnmount(){
    const userId = localStorage.getItem('user');
    this.state.socket.emit('leave.room', this.state.chatName, userId);
    let leavedMembers = this.state.chatMembers;
    let removedMemberIndex = 0;
    leavedMembers.forEach((item, i) => {
      if(item.id === userId) removedMemberIndex = i;
    });
    leavedMembers.splice(removedMemberIndex, 1);
    this.setState({chatMembers: leavedMembers});
  }

  sendMessage(msgData) {
    this.props.setCurrentChatMsgData(msgData);
  }

  showAddedMembers(chatMembers) {
    const addedUsers = update(this.state.chatMembers, {$push: [chatMembers]});
    this.setState({chatMembers: addedUsers});
  }

  componentDidMount(){
    setUserActionComponentHeigth();
    setChatArticleHeight();
    const chatName = localStorage.getItem('currentChatName');
    const chatLogo = localStorage.getItem('currentChatLogo');
    const userId = localStorage.getItem('user');
    this.setState({chatName: chatName, chatLogo: chatLogo});

    getUserData(userId).then(userdata => {
      this.props.setVkUserData(userdata.userInfo);
      this.state.socket.emit('joined.members', chatName, userdata.userInfo);
    });
    getCurrentChatMsg(chatName).then(chatMsg => {
      this.props.setCurrentChatMsg(chatMsg);
    });
    this.state.socket.emit('room', chatName, userId);
    this.state.socket.on('joined.members', this.showAddedMembers);
    this.state.socket.on('send.message', this.sendMessage);
    this.state.socket.on('leave.room');
    scrollDown();
  }

  getInputedMessage(event){
    this.setState({inputedMessage: event.target.value});
  }

  handleEnterKeyPress(event){
    if (event.charCode === 13) {
      this.postInputedMessage();
    }
  }

  postInputedMessage(){
    if(this.state.inputedMessage.length > 0){
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
      postCurrentChatMsg(firstParam + secondParam);
      document.querySelector('.input-chat-message').value = '';
      this.state.socket.emit('send.message', params);
    }
  }

  render(){
    return (
      <ChatView
        chatLogo={this.state.chatLogo}
        chatName={this.state.chatName}
        chatMembers={this.state.chatMembers}
        getInputedMessage={this.getInputedMessage}
        postInputedMessage={this.postInputedMessage}
        chatMsgList={this.props.chatMsgList}
        handleEnterKeyPress={this.handleEnterKeyPress}/>
    );
  }
}

ChatContainer.propTypes = {
  userData: PropTypes.object.isRequired,
  chatMsgList: PropTypes.arrayOf(PropTypes.object).isRequired,
  setVkUserData: PropTypes.func.isRequired,
  setCurrentChatMsg: PropTypes.func.isRequired,
  setCurrentChatMsgData: PropTypes.func.isRequired
};

const mapStateToProps = function(state) {
  return {
    userData: state.userState,
    chatMsgList: state.chatState
  };
};

const mapDispatchToProps = (dispatch) => ({
  setVkUserData: (data) => setVkUserData(dispatch, data),
  setCurrentChatMsg: (msgList) => setCurrentChatMsg(dispatch, msgList),
  setCurrentChatMsgData: (msgData) => setCurrentChatMsgData(dispatch, msgData)
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer);