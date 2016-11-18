import React from 'react'
import UserPageView from './view.user.page'

export default class UserPageController extends React.Component {
  constructor() {
    super();
    this.setUserPageHeigth = this.setUserPageHeigth.bind(this);
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
    var self = this;
    self.setUserPageHeigth();
    let userId = localStorage.getItem('user');

    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', `/userdata/${userId}`, true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          let userdata = JSON.parse(xhr.responseText);
          resolve(self.setState(userdata));
        }
        else {
          reject({
            status: xhr.status,
            statusText: xhr.statusText
          });
        }
      };
      xhr.send();
    });
  }

  setUserPageHeigth(){
    let userInfoComponent = document.querySelector('.container-user-info');
    let headerVK = document.querySelector('.header-vk');
    userInfoComponent.style.height = document.documentElement.clientHeight - headerVK.offsetHeight - 20 + 'px';
  }

  render() {
    return (
      <div className="row container-main">
        <UserPageView first_name={this.state.userInfo.first_name}
                  last_name={this.state.userInfo.last_name}
                  photo_200={this.state.userInfo.photo_200} />
      </div>
    )
  }
}
