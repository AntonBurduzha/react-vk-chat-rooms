import React, {Component} from 'react'
import { setUserActionComponentHeigth, showEmptyFields } from '../../api/common.api'
import { getChatList } from '../../api/user.api'
import CreateChatView from '../views/create.chat.view'
import update from 'immutability-helper';

export default class CreateChatContainer extends Component {
  constructor(props){
    super(props);
    this.getInputedChatName = this.getInputedChatName.bind(this);
    this.getInputedChatLogoURL = this.getInputedChatLogoURL.bind(this);
    this.applyChatCreating = this.applyChatCreating.bind(this);
    this.checkInputedData = this.checkInputedData.bind(this);
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
      'verify': true
    };
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

  checkInputedData(){
    let self = this;
    if(self.state.newChatData.name.length > 0 && self.state.newChatData.logo.length > 0){
      self.state.chatRoomList.forEach(item => {
        if(item.name === self.state.newChatData.name){
          self.setState({verify: false});
        }
      });
    }
    else {
      self.setState({verify: false});
      showEmptyFields(self.state.newChatData.name, self.state.newChatData.logo);
    }
  }

  applyChatCreating(){
    this.checkInputedData();
    //console.log(this.state.verify);
    //console.log(this.state.newChatData);
  }

  render(){
    return (
      <CreateChatView
        getInputedChatName={this.getInputedChatName}
        getInputedChatLogoURL={this.getInputedChatLogoURL}
        applyChatCreating={this.applyChatCreating}/>
    );
  }
}