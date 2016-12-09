import React, {Component} from 'react'
import Modal from 'react-modal'

const removeModalStyles = {
  overlay : {
    backgroundColor   : 'rgba(94, 129, 168, 0.7)'
  },
  content : {
    border                : '1px solid #5e81a8',
    height                : '200px',
    width                 : '550px',
    top                   : '30%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

export default class RemoveChatModalView extends Component {
  render(){
    return (
      <Modal
        isOpen={this.props.modalIsOpen}
        style={removeModalStyles}
        contentLabel="Remove current chat">

        <h4 className="text-center">
          После удаления, вся история сообщений будет удалена.</h4>
        <h4 className="text-center">
          Вы уверенны, что хотите удалить этот чат?</h4>
        <div className="article-control-remove-chat">
          <button
            className="btn-remove-chat"
            onClick={this.props.removeCurrentChat}>Да</button>
          <button
            className="btn-remove-chat btn-remove-chat-right"
            onClick={this.props.closeModal}>Нет</button>
        </div>
      </Modal>
    );
  }
}