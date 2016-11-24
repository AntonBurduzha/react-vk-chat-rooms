import React, {Component} from 'react'
import ChatView from '../views/view.chat'

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