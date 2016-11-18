import React from 'react'

export default class UserPageView extends React.Component {
  render(){
    return (
      <div className="col-md-3 container-user-info">
        <div className="article-user-info">
          <img className="img-user-info" src={this.props.photo_200} alt="moe_litso"/>
          <p className="text-user-info">{this.props.first_name}</p>
          <p className="text-user-info text-user-info-name">{this.props.last_name}</p>
        </div>
      </div>
    )
  }
}
