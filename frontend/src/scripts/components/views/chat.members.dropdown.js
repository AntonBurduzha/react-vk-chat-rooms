import React from 'react';
import Dropdown from 'muicss/lib/react/dropdown';
import DropdownItem from 'muicss/lib/react/dropdown-item';

export default class ChatMembersView extends React.Component {
  render() {
    let chatMembers;
    if(this.props.chatMembers.length > 0){
      chatMembers = this.props.chatMembers.map((item, i) => {
        return (
          <DropdownItem key={i} link={item.domain}>
            <img className="img-members" src={item.photo_50} alt="user_photo"/>
            <p className="text-members">{item.first_name}</p>
            <p className="text-members">{item.last_name}</p>
          </DropdownItem>
        );
      });
    }
    return (
      <Dropdown className="dropdown-members" color="primary" label="Участники">
        {chatMembers}
      </Dropdown>
    );
  }
}