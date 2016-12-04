import React, {Component} from 'react'
import { setUserActionComponentHeigth, showEmptyFields } from '../../api/common.api'
import { getChatList } from '../../api/user.api'
import CreateChatView from '../views/create.chat.view'

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
      verify: true
    };
  }

  getInputedChatName(event){
    this.setState({newChatData: {name: event.target.value, id: event.target.value.toLowerCase()}});
  }

  getInputedChatLogoURL(event){
    this.setState(Object.assign(this.state.newChatData, {logo: event.target.value}));
  }

  componentDidMount(){
    let self = this;
    self.setState({newChatData: {owner: localStorage.getItem('user')}});
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
    } else {
      self.setState({verify: false});
      showEmptyFields(self.state.newChatData.name, self.state.newChatData.logo);
    }
  }

  applyChatCreating(){
    //this.checkInputedData();
    //console.log(this.state.verify);
    //console.log(this.state.newChatData);
  }

  render(){
    console.log(this.state);
    return (
      <CreateChatView
        getInputedChatName={this.getInputedChatName}
        getInputedChatLogoURL={this.getInputedChatLogoURL}
        applyChatCreating={this.applyChatCreating}/>
    );
  }
}