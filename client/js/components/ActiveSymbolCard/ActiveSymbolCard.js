import React from 'react'
import './activesymbolcard.sass'


export default class ActiveSymbolCard extends React.Component {

  constructor() {
    super()
    this.removeStock = this.removeStock.bind(this)
  }

  removeStock() {
    this.props.removeStock(this.props.symbol)
  }

  render() {

    const background = {
      background: this.props.color
    }

    return(
      <div className="activesymbol-card__container">
        <div className="activesymbol-card__text">
          <p className="activesymbol-card__symbol">{ this.props.symbol }</p>
          <p className="activesymbol-card__fullname">{ this.props.fullName }</p>
        </div>
        <div className="activesymbol-card__colorball" style={ background }></div>
        <div className="activesymbol-card__delete" onClick={ this.removeStock }></div>
      </div>
    )
  }
}
