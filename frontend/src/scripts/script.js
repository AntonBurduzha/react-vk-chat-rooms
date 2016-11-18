import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'

import App from './modules/app'
import LoginPageController from './modules/components/login-page/controller.login.page'
import UserPageController from './modules/components/user-page/controller.user.page'

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={LoginPageController} />
      <Route path="userpage" component={UserPageController} />
    </Route>
  </Router>,
  document.getElementById('root')
);
