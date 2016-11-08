import React from 'react'
import axios from 'axios'
import SideBar from '../SideBar/SideBar'
import ChartArea from '../ChartArea/ChartArea'
import './layout.sass'


export default class Layout extends React.Component {

  constructor() {
    super()

    this.state = {
      autocompleteSuggestions: [],
      activeSymbols: [],
      chartData: null
    }

    this.addStock = this.addStock.bind(this)
    this.removeStock = this.removeStock.bind(this)
    this.getAutocompleteMatches = this.getAutocompleteMatches.bind(this)
  }


  componentDidMount() {
    const socket = this.props.socket

    socket.on('activesymbols', (data) => {
      this.setState({
        activeSymbols: data.activeSymbols,
        chartData: data.chartData
       })
    })
  }


  getStockData() {
    axios.get('/data')
      .then( data => {
        console.log(data)
        this.setState({ chartData: data.data })
      })
      .catch( err => console.log(err))
  }


  addStock(symbol, fullName) {
    const socket = this.props.socket
    socket.emit('addStock', { symbol, fullName })
  }


  removeStock(symbol) {
    const socket = this.props.socket
    socket.emit('removeStock', { symbol })
  }


  getAutocompleteMatches(str) {
    axios.get('/search/' + str)
      .then( res => this.setState({ autocompleteSuggestions: res.data }))
      .catch( err => console.log(err))
  }


  render() {

    const props = {
      socket: this.props.socket,
      autocompleteSuggestions: this.state.autocompleteSuggestions,
      activeSymbols: this.state.activeSymbols,
      getAutocompleteMatches: this.getAutocompleteMatches,
      addStock: this.addStock,
      removeStock: this.removeStock,
      chartData: this.state.chartData
    }

    return (
      <div class="app__container">
        <SideBar { ...props }/>
        <ChartArea { ...props }/>
      </div>
    )
  }
}
