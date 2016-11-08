const mongoose = require('mongoose')

const stockSchema = mongoose.Schema({
  symbol: { type: String, unique: true },
  fullName: String
})


module.exports = mongoose.model('Stock', stockSchema)
