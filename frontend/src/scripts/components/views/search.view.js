import React, {Component} from 'react'

export default class SearchView extends Component {
  render(){
    let self = this;
    let searchedChatData;
    if(this.props.searchedChatData.length > 0){
      searchedChatData = this.props.searchedChatData.map(chatRoom => {
        return (
          <div key={chatRoom.id} className="article-chatroom">
            <img className="img-chatroom-list" src={chatRoom.logo} alt="marvel"/>
            <h3
              className="text-chatroom-list"
              onClick={self.props.getCurrentChat}>{chatRoom.name}</h3>
          </div>
        );
      })
    } else {
      if(this.props.searchedChatListLoaded) {
        searchedChatData = <p>Пока нет результатов</p>
      } else {
        searchedChatData = <p>Вы пока ничего не ввели</p>
      }
    }
    return (
      <div className="col-md-6">
        <div className="article-search">
          <h2>Введите название чата:</h2>
          <input
            className="input-search"
            type="text"
            placeholder="Название чата"
            onChange={this.props.getInputedChatNames}/>
          <button className="btn-search" onClick={this.props.getSearchedChatList}>Найти</button>
        </div>
        {searchedChatData}
      </div>
    )
  }
}