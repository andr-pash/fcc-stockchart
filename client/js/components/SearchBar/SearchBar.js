import React from 'react'
import './searchbar.sass'


export default class SearchBar extends React.Component {

  constructor() {
    super()

    this.state = {
      searchTerm: ''
    }

    this.handleChange = this.handleChange.bind(this)
  }


  handleChange(evt) {
    this.state.searchTerm = evt.target.value
    if (this.state.searchTerm !== '')
      this.props.getAutocompleteMatches(this.state.searchTerm)
  }

  render() {
    return(
      <div className="searchbar__container">
        <input
          type="text"
          className="searchbar__input"
          onChange={ this.handleChange }
        />
      </div>
    )
  }
}
