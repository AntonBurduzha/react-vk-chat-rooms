import React from 'react'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'

import MainLayout from './components/layouts/main.layout'
import UserPageLayout from './components/layouts/user.page.layout'

import LoginPageController from './components/controllers/login.page.controller'
import ChatListController from './components/controllers/chat.list.controller'
import MyChatsController from './components/controllers/my.chats.controller'
import SearchController from './components/controllers/search.controller'
import CreateChatController from './components/controllers/create.chat.controller'
import ChatController from './components/controllers/chat.controller'

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