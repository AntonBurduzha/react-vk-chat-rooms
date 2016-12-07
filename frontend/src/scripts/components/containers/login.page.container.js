import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { getUserData, postUserData } from '../../api/login.api'
import { applyLoadingStrip } from '../../api/common.api'
import { setVkUserId } from '../../actions/login.actions'
import LoginPageView from '../views/login.page.view'

class LoginPageContainer extends Component {
  constructor(props){
    super(props);
    this.signUp = this.signUp.bind(this);
    this.state = {'userId': ''};
  }

  componentDidMount(){
    let userId = '';
    VK.init({
      apiId: 5709095
    });
    VK.Auth.login((res) => {
      if (res.session) {
        userId = res.session.user['id'];
        this.props.setVkUserId(userId);
        getUserData(userId).then(result => {
          if(result.userInfo !== null){
            localStorage.setItem('user', result.userInfo.id);
          }
        });
      }
    });
  }

  signUp() {
    let self = this;
    var accessToken = localStorage.getItem('user');
    if(this.props.userId === accessToken) {
      applyLoadingStrip();
      setTimeout(() => browserHistory.push('/userpage'), 800);
    }
    else {
      VK.Api.call('users.get', {uids: this.props.userId, fields: 'domain,photo_50,photo_200_orig'}, (obj) => {
        if(obj.response) {
          const userInfo = Object.assign({id: this.props.userId}, obj.response[0]);
          userInfo.domain = `https://vk.com/${userInfo.domain}`;
          const paramsFirstPart = `id=${this.props.userId}&first_name=${userInfo.first_name}&last_name=${userInfo.last_name}`;
          const paramsLastPart = `&domain=${userInfo.domain}&photo_50=${userInfo.photo_50}&photo_200=${userInfo.photo_200_orig}`;
          postUserData(paramsFirstPart + paramsLastPart);
          localStorage.setItem('user', this.props.userId);
          self.applyLoadingStrip();
          setTimeout(() => browserHistory.push('/userpage'), 800);
        }
      });
    }
  }

  render(){
    return (
      <div className="row">
        <LoginPageView signUp={this.signUp} />
      </div>
    )
  }
}

LoginPageContainer.propTypes = {
  userId: PropTypes.string.isRequired,
  setVkUserId: PropTypes.func.isRequired
};

const mapStateToProps = function(state) {
  return {
    userId: state.loginState
  };
};

const mapDispatchToProps = (dispatch) => ({
  setVkUserId: (id) => setVkUserId(dispatch, id)
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPageContainer);
