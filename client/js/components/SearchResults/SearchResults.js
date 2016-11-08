import React from 'react'
import SearchResult from '../SearchResult/SearchResult'
import './searchresults.sass'


export default class SearchResults extends React.Component {
  render() {

    const props = this.props

    const stocks = this.props.autocompleteSuggestions.map( (stock, i) => {
      return (
        <SearchResult
          symbol={ stock.symbol }
          fullName={ stock.fullName }
          addStock={ this.props.addStock }
          key={ i }
         />
      )
    })

    return(
      <div className="searchresults__container">
        { stocks }
      </div>
    )
  }
}
