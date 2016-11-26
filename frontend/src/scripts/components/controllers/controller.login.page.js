import React, {Component} from 'react'
import LoginPageView from '../views/view.login.page'
import loginApi from '../../api/login.api'
import {connect} from 'react-redux'
import store from '../../store'
import setVkUserData from '../../actions/login.actions'
import {browserHistory} from 'react-router'

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
        self.setState({userId: userId});
        loginApi.getUserData(self.state.userId).then(result => {
          if(result.userInfo !== null){
            localStorage.setItem('user', result.userInfo.id);
            store.dispatch(setVkUserData(result.userInfo));
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
    if(self.state.userId === accessToken) {
      self.applyLoadingStrip();
      setTimeout(() => browserHistory.push('/userpage'), 800);
    }
    else {
      VK.Api.call('users.get', {uids: self.state.userId, fields: 'domain,photo_50,photo_200_orig'}, (obj) => {
        if(obj.response) {
          const userInfo = Object.assign({id: self.state.userId}, obj.response[0]);
          userInfo.domain = `https://vk.com/${userInfo.domain}`;

          const params = `id=${self.state.userId}&first_name=${userInfo.first_name}&last_name=${userInfo.last_name}&domain=${userInfo.domain}&photo_50=${userInfo.photo_50}&photo_200=${userInfo.photo_200_orig}`;
          loginApi.postUserData(params);
          localStorage.setItem('user', self.state.userId);
          store.dispatch(setVkUserData(userInfo));
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
    userData: state.loginState
  };
};

export default connect(mapStateToProps)(LoginPageController);
