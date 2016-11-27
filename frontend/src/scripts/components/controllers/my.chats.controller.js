import React, {Component} from 'react'
import MyChatsView from '../views/my.chats.view'

export default class MyChatsController extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <MyChatsView />
    );
  }
}