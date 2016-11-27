import React, {Component} from 'react'
import ChatView from '../views/chat.view'

export default class ChatController extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <ChatView />
    );
  }
}