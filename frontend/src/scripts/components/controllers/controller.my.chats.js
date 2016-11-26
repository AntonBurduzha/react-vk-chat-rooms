import React, {Component} from 'react'
import MyChatsView from '../views/view.my.chats'

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