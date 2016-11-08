const Stock = require('./models/Stock')
const DataCreator = require('./services/DataCreator')
const dc = new DataCreator()

let connections = []

module.exports = (io) => {

  io.on('connection', (socket) => {

    connections.push(socket)

    dc.getChartReadyData()
      .then( data => socket.emit('activesymbols', data))
      .catch( err => console.log(err))


    socket.on('addStock', (stock) => {
      addStock(stock)
        .then( () => dc.getChartReadyData())
        .then( data => sendToAll('activesymbols', data))
        .catch( err => console.log(err))
    })

    socket.on('removeStock', (stock) => {
      console.log('remove')
      removeStock(stock)
        .then( () => dc.getChartReadyData())
        .then( data => sendToAll('activesymbols', data))
        .catch( err => console.log(err))
    })
  })
}



const addStock = (data) => {
  return Stock.findOne({ symbol: data.symbol })
    .then( stock => {
      if (!stock) {
        const newStock = new Stock()
        newStock.symbol = data.symbol
        newStock.fullName = data.fullName
        return newStock.save()
      }
    })
}

const removeStock = (data) => {
  return Stock.findOne({ symbol: data.symbol })
    .then( stock => {
      console.log(stock)
      if (stock)
        return stock.remove()
    })
}


const sendToAll = (msg, data) => {
  connections.map( socket => socket.emit(msg, data))
}
