import React, {Component} from 'react'
import LoginPageView from '../views/view.login.page'
import loginApi from '../../api/login.api'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import loginActions from '../../actions/login.actions'
import store from '../../store'

class LoginPageController extends Component {
  constructor(props){
    super(props);
    this.signUp = this.signUp.bind(this);
    this.applyLoadingStrip = this.applyLoadingStrip.bind(this);
    this.state = {'userId': ''};
  }

  componentDidMount(){
    let self = this;
    let userId = '';
    VK.init({
      apiId: 5709095
    });
    VK.Auth.login((res) => {
      if (res.session) {
        userId = res.session.user['id'];
        store.dispatch(loginActions.setVkUserId(userId));
        loginApi.getUserData(userId).then(result => {
          if(result.userInfo !== null){
            localStorage.setItem('user', result.userInfo.id);
          }
        });
      }
    });
  }

  applyLoadingStrip(){
    let loadingStrip = document.querySelector('.loading-strip');
    loadingStrip.style.animation = 'strip-progress .8s';
  }

  signUp() {
    let self = this;
    var accessToken = localStorage.getItem('user');
    if(this.props.userId === accessToken) {
      self.applyLoadingStrip();
      setTimeout(() => browserHistory.push('/userpage'), 800);
    }
    else {
      VK.Api.call('users.get', {uids: this.props.userId, fields: 'domain,photo_50,photo_200_orig'}, (obj) => {
        if(obj.response) {
          const userInfo = Object.assign({id: this.props.userId}, obj.response[0]);
          userInfo.domain = `https://vk.com/${userInfo.domain}`;

          const params = `id=${this.props.userId}&first_name=${userInfo.first_name}&last_name=${userInfo.last_name}&domain=${userInfo.domain}&photo_50=${userInfo.photo_50}&photo_200=${userInfo.photo_200_orig}`;
          loginApi.postUserData(params);
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

const mapStateToProps = function(state) {
  return {
    userId: state.loginState
  };
};

export default connect(mapStateToProps)(LoginPageController);
