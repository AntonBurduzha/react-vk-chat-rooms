import React, {Component} from 'react'
import UserServiceView from '../views/view.user.service'
import store from '../../store'
import {connect} from 'react-redux'

class UserServiceController extends Component {
  constructor() {
    super();
    this.selectMenuItem = this.selectMenuItem.bind(this);
    this.state = {
      userInfo: [{
        'id': '',
        'first_name': '',
        'last_name': '',
        'photo_50': '',
        'photo_200': ''
      }]
    };
  }

  componentDidMount() {
    let self = this;
    let userId = localStorage.getItem('user');

    fetch(`/userdata/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      response.json().then(userdata => {
        self.setState(userdata)
      });
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
      <UserServiceView first_name={this.state.userInfo.first_name}
                       last_name={this.state.userInfo.last_name}
                       photo_200={this.state.userInfo.photo_200}
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
