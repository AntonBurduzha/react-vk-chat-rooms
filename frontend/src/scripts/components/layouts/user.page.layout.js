import React, {Component} from 'react'
import UserServiceController from '../controllers/controller.user.service'

export default class UserPageLayout extends Component {
  constructor(props) {
    super(props);
    this.setUserPageHeigth = this.setUserPageHeigth.bind(this);
  }

  setUserPageHeigth(){
    let userServiceComponent = document.querySelectorAll('.container-user-page');
    let headerVK = document.querySelector('.header-vk');
    userServiceComponent.forEach((item) => {
      item.style.height = document.documentElement.clientHeight - headerVK.offsetHeight - 20 + 'px';
    });
  }

  componentDidMount(){
    this.setUserPageHeigth();
  }

  render() {
    return (
      <div className="row container-main">
        <UserServiceController />
        {this.props.children}
        <div className="col-md-3 container-user-page"></div>
      </div>
    )
  }
}
