import React, {Component} from 'react'
import CreateChatView from '../views/view.create.chat'

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