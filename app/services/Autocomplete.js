class Autocomplete {

  constructor(data) {
    this.data = data
    this.findMatchingSymbols = this.findMatchingSymbols.bind(this)
  }

  findMatchingSymbols(str) {

    const regex = new RegExp(`^${str}.+`, 'i')

    const matches = this.data.filter( el => {
      return regex.test(el.symbol)
    })

    if (matches.length > 35)
      matches.splice(35)

    return matches
  }
}

module.exports = Autocomplete
