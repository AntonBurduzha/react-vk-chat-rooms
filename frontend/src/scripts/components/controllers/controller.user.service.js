import React, {Component} from 'react'
import UserServiceView from '../views/view.user.service'
import store from '../../store'
import {connect} from 'react-redux'
import loginApi from '../../api/login.api'
import loginActions from '../../actions/login.actions'

class UserServiceController extends Component {
  constructor() {
    super();
    this.selectMenuItem = this.selectMenuItem.bind(this);
  }

  componentDidMount() {
    let userId = localStorage.getItem('user');

    loginApi.getUserData(userId).then(userdata => {
      store.dispatch(loginActions.setVkUserData(userdata.userInfo));
    });
  }

  selectMenuItem(event){
    let menuItems = document.querySelectorAll('.link-user-service');
    for(let i = 0; i < menuItems.length; i++){
      menuItems[i].classList.remove('item-selected');
    }
    event.target.classList.add('item-selected');
  }

  render() {
    return (
      <UserServiceView first_name={this.props.userData.first_name}
                       last_name={this.props.userData.last_name}
                       photo_200={this.props.userData.photo_200}
                       selectMenuItem={this.selectMenuItem}/>
    )
  }
}

const mapStateToProps = function(state) {
  return {
    userData: state.loginState
  };
};

export default connect(mapStateToProps)(UserServiceController);
