import React, {Component} from 'react'
import CreateChatView from '../views/create.chat.view'

export default class CreateChatController extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <CreateChatView />
    );
  }
}