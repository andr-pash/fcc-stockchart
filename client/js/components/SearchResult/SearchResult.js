import React from 'react'
import './searchresult.sass'


let data = {"symbol":"AAAP","fullName":"Advanced Accelerator Applications S.A."}


export default class SearchResult extends React.Component {

  constructor() {
    super()

    this.addStock = this.addStock.bind(this)
  }

  addStock() {
    this.props.addStock(this.props.symbol, this.props.fullName)
  }

  render() {
    return(
      <div className="searchresult__container">
        <div className="searchresult__text">
          <p className="searchresult__symbol">{ this.props.symbol }</p>
          <p className="searchresult__fullname">{ this.props.fullName }</p>
        </div>
        <div className="searchresult__btn" onClick={ this.addStock }></div>
      </div>
    )
  }
}
