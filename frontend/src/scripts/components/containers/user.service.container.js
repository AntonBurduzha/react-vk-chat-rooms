import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { getUserData } from '../../api/login.api'
import { setVkUserData } from '../../actions/login.actions'
import UserServiceView from '../views/user.service.view'

class UserServiceContainer extends Component {
  constructor() {
    super();
    this.selectMenuItem = this.selectMenuItem.bind(this);
  }

  componentDidMount() {
    let userId = localStorage.getItem('user');

    getUserData(userId).then(userdata => {
      this.props.setVkUserData(userdata.userInfo);
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
                       domain={this.props.userData.domain}
                       selectMenuItem={this.selectMenuItem}/>
    )
  }
}

UserServiceContainer.propTypes = {
  userData: PropTypes.object.isRequired,
  setVkUserData: PropTypes.func.isRequired
};

const mapStateToProps = function(state) {
  return {
    userData: state.userState
  };
};

const mapDispatchToProps = (dispatch) => ({
  setVkUserData: (data) => setVkUserData(dispatch, data)
});

export default connect(mapStateToProps, mapDispatchToProps)(UserServiceContainer);
