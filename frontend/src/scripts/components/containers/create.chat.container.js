import React, {Component} from 'react'
import { setUserActionComponentHeigth, showEmptyFields, cleareCreateChatFields } from '../../api/common.api'
import { getChatList, postNewChat } from '../../api/user.api'
import CreateChatView from '../views/create.chat.view'
import update from 'immutability-helper';

export default class CreateChatContainer extends Component {
  constructor(props){
    super(props);
    this.getInputedChatName = this.getInputedChatName.bind(this);
    this.getInputedChatLogoURL = this.getInputedChatLogoURL.bind(this);
    this.applyChatCreating = this.applyChatCreating.bind(this);
    this.checkInputedData = this.checkInputedData.bind(this);
    this.changeEmptyField = this.changeEmptyField.bind(this);
    this.state = {
      userId: '',
      newChatData: {
        id: '',
        name: '',
        logo: '',
        owner: '',
        members: [],
        messages: []
      },
      chatRoomList: [],
      verify: true,
      chatCreated: false
    };
  }

  changeEmptyField(event){
    event.target.classList.remove('empty-fields');
  }

  getInputedChatName(event){
    let stateName = update(this.state.newChatData, {name: {$set: event.target.value},
      id: {$set: event.target.value.toLowerCase()}});
    this.setState({newChatData: stateName});
  }

  getInputedChatLogoURL(event){
    let stateLogo = update(this.state.newChatData, {logo: {$set: event.target.value}});
    this.setState({newChatData: stateLogo});
  }

  componentDidMount(){
    let self = this;
    let stateOwner = update(self.state.newChatData, {owner: {$set: localStorage.getItem('user')}});
    self.setState({newChatData: stateOwner});
    setUserActionComponentHeigth();
    getChatList().then(chatlist => {
      self.setState({chatRoomList: chatlist.chatRoomList});
    });
  }

  componentWillUnmount(){
    this.setState({chatCreated: false});
  }

  checkInputedData(){
    if(this.state.newChatData.name.length && this.state.newChatData.logo.length){
      for(let i = 0; i < this.state.chatRoomList.length; i++){
        if(this.state.newChatData.name === this.state.chatRoomList[i].name){
          this.setState({verify: false});
          break;
        }
      }
    }
    else {
      this.setState({verify: false});
      showEmptyFields(this.state.newChatData.name, this.state.newChatData.logo);
      let stateInputedData = update(this.state.newChatData, {logo: {$set: ''}, name: {$set: ''}, id: {$set: ''}});
      this.setState({newChatData: stateInputedData});
    }
  }

  applyChatCreating(){
    let promiseCheckInput = new Promise((resolve, reject) => resolve(this.checkInputedData()));
    promiseCheckInput.then(() => {
      if(this.state.verify){
        cleareCreateChatFields();
        let firstParam = `id=${this.state.newChatData.id}&name=${this.state.newChatData.name}`;
        let secondParam = `&logo=${this.state.newChatData.logo}&owner=${this.state.newChatData.owner}`;

        let stateChatList = update(this.state.chatRoomList, {$push: [this.state.newChatData]});
        this.setState({chatRoomList: stateChatList});
        postNewChat(firstParam+secondParam);
        this.setState({chatCreated: true});
      }
      else {
        cleareCreateChatFields();
        this.setState({verify: true});
      }
    });
  }

  render(){
    return (
      <CreateChatView
        getInputedChatName={this.getInputedChatName}
        getInputedChatLogoURL={this.getInputedChatLogoURL}
        applyChatCreating={this.applyChatCreating}
        changeEmptyField={this.changeEmptyField}
        chatCreated={this.state.chatCreated}/>
    );
  }
}