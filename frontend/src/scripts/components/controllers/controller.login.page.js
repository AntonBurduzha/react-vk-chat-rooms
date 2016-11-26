import React, {Component} from 'react'
import LoginPageView from '../views/view.login.page'

export default class LoginPageController extends Component {
  constructor(props){
    super(props);
    this.signUp = this.signUp.bind(this);
    this.state = {'userId': ''};
  }

  componentWillMount(){
    let self = this;
    let userId = '';
    VK.init({
      apiId: 5709095
    });
    VK.Auth.login((res) => {
      if (res.session) {
        userId = res.session.user['id'];
        self.setState({userId: userId});

        fetch(`/userdata/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(response => {
          response.json().then(result => {
            if(result.userInfo !== null){
              localStorage.setItem('user', result.userInfo.id);
            }
          });
        });
      }
    });
  }

  signUp() {
    let self = this;
    var accessToken = localStorage.getItem('user');
    if(self.state.userId === accessToken) {
      return true;
    }
    else {
      VK.Api.call('users.get', {uids: self.state.userId, fields: 'photo_50,photo_200_orig'}, (obj) => {
        if(obj.response) {
          let {first_name, last_name, photo_50, photo_200_orig} = obj.response[0];
          let params = `id=${self.state.userId}&first_name=${first_name}&last_name=${last_name}&photo_50=${photo_50}&photo_200=${photo_200_orig}`;

          fetch('/userdata', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params
          });
        }
        localStorage.setItem('user', self.state.userId);
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
