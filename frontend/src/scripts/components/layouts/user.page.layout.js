import React, {Component} from 'react'
import { setUserServiceHeigth } from '../../api/common.api'
import UserServiceContainer from '../containers/user.service.container'

export default class UserPageLayout extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    setUserServiceHeigth();
  }

  render() {
    return (
      <div className="row container-main">
        <UserServiceContainer />
        {this.props.children}
        <div className="col-md-3 container-user-page"></div>
      </div>
    )
  }
}
