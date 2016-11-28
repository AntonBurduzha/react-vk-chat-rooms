import React, {Component} from 'react'
import { setUserActionComponentHeigth } from '../../api/common.api'
import CreateChatView from '../views/create.chat.view'

export default class CreateChatContainer extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    setUserActionComponentHeigth();
  }

  render(){
    return (
      <CreateChatView />
    );
  }
}