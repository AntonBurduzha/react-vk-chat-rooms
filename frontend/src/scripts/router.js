import React from 'react'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'

import MainLayout from './components/layouts/main.layout'
import UserPageLayout from './components/layouts/user.page.layout'

import LoginPageContainer from './components/containers/login.page.container'
import ChatListContainer from './components/containers/chat.list.container'
import MyChatsContainer from './components/containers/my.chats.container'
import SearchContainer from './components/containers/search.container'
import CreateChatContainer from './components/containers/create.chat.container'
import ChatContainer from './components/containers/chat.container'

export default(
  <Router history={browserHistory}>
    <Route path='/' component={MainLayout}>
      <IndexRoute component={LoginPageContainer} />
      <Route path="userpage" component={UserPageLayout}>
        <IndexRoute component={ChatListContainer} />
        <Route path="my_chats" component={MyChatsContainer}/>
        <Route path="search_chat" component={SearchContainer}/>
        <Route path="create_chat" component={CreateChatContainer}/>
        <Route path="current_chat" component={ChatContainer}/>
      </Route>
    </Route>
  </Router>
);