const symbols = require('./data/symbols.json')
const Autocomplete = require('./services/Autocomplete')
const DataCreator = require('./services/DataCreator')

const dc = new DataCreator()
const ac = new Autocomplete(symbols)


module.exports = (app) => {

  app.get('/search/:symbol', (req, res) => {
    const symbol = req.params.symbol
    const matches = ac.findMatchingSymbols(symbol)

    res.send(matches)
  })

  app.get('/data', (req, res) => {
    dc.getChartReadyData()
      .then( data => res.send(data.chartData))
      .catch( err => console.log('error sending chartData:', err))
  })

}
