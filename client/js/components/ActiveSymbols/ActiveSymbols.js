import React from 'react'
import ActiveSymbolCard from '../ActiveSymbolCard/ActiveSymbolCard'
import './activesymbols.sass'


export default class ActiveSymbols extends React.Component {
  render() {

    let { activeSymbols } = this.props

    console.log(activeSymbols)

    const stocks = activeSymbols.map( (stock, i) => {
      return (
        <ActiveSymbolCard
          symbol={ stock.symbol }
          fullName={ stock.fullName || '' }
          color={ stock.color }
          removeStock={ this.props.removeStock }
          key={ i }
         />
      )
    })

    return(
      <div className="activesymbols__container">
        { stocks }
      </div>
    )
  }
}
