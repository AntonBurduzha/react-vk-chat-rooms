import React, {Component} from 'react'
import { setUserActionComponentHeigth } from '../../api/common.api'
import MyChatsView from '../views/my.chats.view'

export default class MyChatsContainer extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    setUserActionComponentHeigth();
  }

  render(){
    return (
      <MyChatsView />
    );
  }
}