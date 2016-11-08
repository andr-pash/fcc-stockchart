const yahoo = require('yahoo-finance')
const _ = require('lodash')
const moment = require('moment')
const roundround = require('roundround')
const Stock = require('../models/Stock')

class DataCreator {
  constructor() {
    this.colorPalette = [
      '#8dd3c7',
      '#ffffb3',
      '#bebada',
      '#fb8072',
      '#80b1d3',
      '#fdb462',
      '#b3de69',
      '#fccde5',
      '#d9d9d9',
      '#bc80bd',
      '#ccebc5',
      '#ffed6f'
    ]

    this._getActiveSymbols = this._getActiveSymbols.bind(this)
    this._retrieveDataYahoo = this._retrieveDataYahoo.bind(this)
    this._constructLabels = this._constructLabels.bind(this)
    this._constructDataSets = this._constructDataSets.bind(this)
  }


  _getActiveSymbols() {
    return Stock.find({}, {_id: 0, symbol: 1, fullName: 1})
      .catch( err => console.log('err getting stocks from db:', err))
  }


  _retrieveDataYahoo(
    symbols,
    from = moment(Date.now()).subtract(365, 'days').format('YYYY-MM-DD'),
    to = moment(Date.now()).format('YYYY-MM-DD'),
    period = 'm') {
      return yahoo.historical({
        symbols: symbols,
        from: from,
        to: to,
        period: period
      })
      .catch( err => console.log('err loading quotes:', err))
  }


  _constructLabels(data) {
    const firstElement = _.values(data)[0]
    return firstElement.map( el => moment(el.date).format('MMM YYYY'))
  }


  _constructDataSets(data) {

    const iterateColor = roundround(this.colorPalette)

    return _.values(data)
      .map( (quotes, i) => {
        return {
          label: quotes[0].symbol,
          data: quotes.map( quote => quote.close),
          backgroundColor: 'transparent',
          borderColor: iterateColor(),
          borderWidth: 2,
        }
      })
  }


  // ...
  _matchColor(arr1, arr2) {

    arr1 = arr1.map( el => {

      let obj = {
        symbol: el.symbol,
        fullName: el.fullName,
        color: ''
      }

      for(let j = 0; j < arr2.length; j++) {
        if (obj.symbol === arr2[j].label) {
          obj.color = arr2[j].borderColor
          break
        }
      }
      return obj
    })

    return arr1
  }


  getChartReadyData() {

    let chartData = {}
    let activeSymbols = []

    return this._getActiveSymbols()
      .then( symbols => {

        if (symbols.length === 0) {
          return null
        }

        activeSymbols = symbols
        let symbolArr = symbols.map( stock => stock.symbol)

        return this._retrieveDataYahoo(symbolArr)
      })
      .then( data => {

        if (!data) {
          return {
            activeSymbols: [],
            chartData: null
          }
        }

        chartData.labels = this._constructLabels(data)
        chartData.datasets = this._constructDataSets(data)

        activeSymbols = this._matchColor(activeSymbols, chartData.datasets)

        return {
          chartData,
          activeSymbols
        }
      })
      .catch( err => console.log('error constructing chartData:', err))
  }
}

module.exports = DataCreator
