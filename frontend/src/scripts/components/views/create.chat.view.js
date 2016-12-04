import React, {Component} from 'react'

export default class CreateChatView extends Component {
  render(){
    return (
      <div className="col-md-6 container-user-action">
        <h3 className="title-chatrooms-list title-search-chatrooms-list">Меню создания чата:</h3>
        <div className="article-create-chat">
          <p className="text-create-chat">Название чата:</p>
          <input
            className="input-create-chat input-create-chat-name"
            placeholder="Название чата"
            type="text"
            onChange={this.props.getInputedChatName}/>
          <p className="text-create-chat">URL логотипа чата:</p>
          <input
            className="input-create-chat input-create-chat-url"
            placeholder="URL логотипа"
            type="text"
            onChange={this.props.getInputedChatLogoURL}/>
          <div className="tooltip-create-chat">Подсказка
            <span className="tooltiptext-create-chat">
              Загрузите изображение
              на одном из сайтов:
              <ul className="list-create-chat">
                <li className="text-left list-item-create-chat">imgdepo.com</li>
                <li className="text-left list-item-create-chat">imgur.com</li>
                <li className="text-left list-item-create-chat">pixs.ru</li>
              </ul>
              Вставьте ссылку полученную после загрузки.
            </span>
          </div>
          <button
            className="btn-create-chat"
            onClick={this.props.applyChatCreating}>Создать</button>
        </div>
      </div>
    )
  }
}