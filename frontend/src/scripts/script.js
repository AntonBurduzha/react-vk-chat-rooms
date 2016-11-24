import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'

import MainLayout from './modules/components/layouts/main.layout'
import UserPageLayout from './modules/components/layouts/user.page.layout'

import LoginPageController from './modules/components/controllers/controller.login.page'
import ChatListController from './modules/components/controllers/controller.chat.list'
import SearchController from './modules/components/controllers/controller.search'
import CreateChatController from './modules/components/controllers/controller.create.chat'
import ChatController from './modules/components/controllers/controller.chat'

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path='/' component={MainLayout}>
      <IndexRoute component={LoginPageController} />
      <Route path="userpage" component={UserPageLayout}>
        <IndexRoute component={ChatListController} />
        <Route path="search_chat" component={SearchController}/>
        <Route path="create_chat" component={CreateChatController}/>
        <Route path="current_chat" component={ChatController}/>
      </Route>
    </Route>
  </Router>,
  document.getElementById('root')
);
