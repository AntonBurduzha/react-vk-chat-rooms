import React from 'react'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'

import MainLayout from './components/layouts/main.layout'
import UserPageLayout from './components/layouts/user.page.layout'

import LoginPageController from './components/controllers/controller.login.page'
import ChatListController from './components/controllers/controller.chat.list'
import MyChatsController from './components/controllers/controller.my.chats'
import SearchController from './components/controllers/controller.search'
import CreateChatController from './components/controllers/controller.create.chat'
import ChatController from './components/controllers/controller.chat'

export default(
  <Router history={browserHistory}>
    <Route path='/' component={MainLayout}>
      <IndexRoute component={LoginPageController} />
      <Route path="userpage" component={UserPageLayout}>
        <IndexRoute component={ChatListController} />
        <Route path="my_chats" component={MyChatsController}/>
        <Route path="search_chat" component={SearchController}/>
        <Route path="create_chat" component={CreateChatController}/>
        <Route path="current_chat" component={ChatController}/>
      </Route>
    </Route>
  </Router>
);