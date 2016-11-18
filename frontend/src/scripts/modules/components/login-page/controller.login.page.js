import React from 'react'
import LoginPageView from './view.login.page'

export default class LoginPageController extends React.Component {
  constructor(props){
    super(props);
    this.signUp = this.signUp.bind(this);
    this.state = {'userId': ''};
  }

  componentWillMount(){
    var self = this;
    let userId = '';
    VK.init({
      apiId: 5709095
    });
    VK.Auth.login((res) => {
      if (res.session) {
        userId = res.session.user['id'];
        self.setState({userId: userId});
        let xhr = new XMLHttpRequest();
        xhr.open('GET', `/userdata/${userId}`, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            let userdata = JSON.parse(xhr.responseText);
            if(userdata.userInfo !== null){
              localStorage.setItem('user', userdata.userInfo.id);
            }
          }
        };
        xhr.send();
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
          let first_name = obj.response[0].first_name;
          let last_name = obj.response[0].last_name;
          let photo_50 = obj.response[0].photo_50;
          let photo_200 = obj.response[0].photo_200_orig;
          let xhr = new XMLHttpRequest();
          xhr.open("POST", '/userdata', true);
          xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
          let params = `id=${self.state.userId}&first_name=${first_name}&last_name=${last_name}&photo_50=${photo_50}&photo_200=${photo_200}`;
          xhr.send(params);
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
