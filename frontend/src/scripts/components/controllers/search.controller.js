import React, {Component} from 'react'
import SearchView from '../views/search.view'

export default class SearchController extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <SearchView />
    );
  }
}