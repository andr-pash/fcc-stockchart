import React from 'react'
import SearchBar from '../SearchBar/SearchBar'
import SearchResults from '../SearchResults/SearchResults'
import './sidebar.sass'


export default class SideBar extends React.Component {
  render() {

    const props = this.props

    return(
      <div className="sidebar__container">
        <div className="sidebar__title">
          <h1>StockChart</h1>
          <p>by Andreas Pashalides</p>
        </div>
        <div className="sidebar__search">
          <SearchBar { ...props} />
          <SearchResults { ...props } />
        </div>
      </div>
    )
  }
}
