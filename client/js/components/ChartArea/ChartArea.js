import React from 'react'
import Chart from '../Chart/Chart'
import ActiveSymbols from '../ActiveSymbols/ActiveSymbols'
import './chartarea.sass'



export default class ChartArea extends React.Component {
  render() {
    const props = this.props

    return(
      <div className="chartarea__container">
        <Chart { ...props }/>
        <ActiveSymbols { ...props }/>
      </div>
    )
  }
}
