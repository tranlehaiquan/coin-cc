#!/usr/bin/env node
const fs = require('fs')
const program = require('commander')
const axios = require('axios')
const ora = require('ora')
const Table = require('cli-table2')
const colors = require('colors')
const humanize = require('humanize-plus')
const validation = require('./validation.js')
const constants = require('./constants.js')

// helper functions
const list = value => value && value.split(',') || []
const getColoredChangeValueText = (value) => {
  const text = `${value}%`
  return value ? (value > 0 ? text.green : text.red) : 'NA'
}
program
  .version('0.0.15')
  .option('-c, --convert [currency]', 'Convert to your currency', validation.validateConvertCurrency, 'USD')
  .option('-f, --find [symbol]', 'Find specific coin data with coin symbol (can be a comma seperated list)', list, [])
  .option('-t, --top [index]', 'Show the top coins ranked from 1 - [index] according to the market cap', validation.validateNumber, 10)
  .option('-p, --portfolio', 'Retrieve coins specified in $HOME/.coinmon/portfolio.json file', validation.validatePorfolioConfigPath)
  .option('-h, --header [index]', 'Display specific columns (can be a comma seperated list)', list, [])
  .parse(process.argv)

console.log('\n')

// handle --convert
const convert = program.convert.toUpperCase()
const marketcapConvert = convert === 'BTC' ? 'USD' : convert

// handle --find [symbol]
const find = program.find

// handle --portfolio
const portfolio = program.portfolio

// handle --top [index]
const top = (find.length > 0 || portfolio) ? 1500 : program.top

// handle --header [index]
const defaultHeader = ['Rank', 'Coin', `Price ${convert}`, 'Change 1H', 'Change 24H', 'Change 7D', `Market Cap ${marketcapConvert}`].map(title => title.yellow)
if (portfolio) {
  defaultHeader.push('Estimated Value'.yellow)
}
const defaultColumns = defaultHeader.map((item, index) => index)
const column = program.header
const columns = column.length > 0 
? column.map(index => +index)
  .filter((index) => {
  return !isNaN(index)
    && index < defaultHeader.length
  }) 
: defaultColumns
const sortedColumns = columns.sort()
const header = sortedColumns.map(index => defaultHeader[index])
const table = new Table({
  chars: {
    'top': '-',
    'top-mid': '-',
    'top-left': '-',
    'top-right': '-',
    'bottom': '-',
    'bottom-mid': '-',
    'bottom-left': '-',
    'bottom-right': '-',
    'left': '║',
    'left-mid': '-',
    'mid': '-',
    'mid-mid': '-',
    'right': '║',
    'right-mid': '-',
    'middle': '│'
  },
  head: header
})

// read portfolio config
let portofolioCoins = []
let portfolioSum = 0
if (portfolio) {
  try {
    portfolioCoins = JSON.parse(fs.readFileSync(constants.portfolioPath).toString())
  } catch (error) {
    console.log(`Please include a valid json file.`.red)
    process.exit()
  }
}

// For testing
// console.log('--convert', convert)
// console.log('--find', find)
// console.log('--top', top)
// console.log('--portfolio', portfolio)
// console.log('--header', columns)

// show loading animation
const spinner = ora('Loading data').start()

// call coinmarketcap API
const sourceUrl = `https://api.coinmarketcap.com/v1/ticker/?limit=${top}&convert=${convert}`
axios.get(sourceUrl)
  .then(function (response) {
    spinner.stop()
    response.data
      .filter(record => {
          if (portfolio) {
            return Object.keys(portfolioCoins).some(keyword => record.symbol.toLowerCase() === keyword.toLowerCase())
          }
          if (find.length > 0) {
            return find.some(keyword => record.symbol.toLowerCase() === keyword.toLowerCase())
          }
        return true
      })
      .map(record => {
        // change 1h
        const percentChange1h = record.percent_change_1h
        const change1h = getColoredChangeValueText(record.percent_change_1h)
        // change 24h
        const percentChange24h = record.percent_change_24h
        const change24h = getColoredChangeValueText(record.percent_change_24h)
        // change 7d
        const percentChange7d = record.percent_change_7d
        const change7d = getColoredChangeValueText(record.percent_change_7d)
        // marketcap
        const marketCap = record[`market_cap_${marketcapConvert}`.toLowerCase()]
        const displayedMarketCap = marketCap ? humanize.compactInteger(marketCap, 3) : marketCap
        // final value
        const defaultValues = [
          record.rank,
          record.symbol,
          record[`price_${convert}`.toLowerCase()],
          change1h,
          change24h,
          change7d,
          displayedMarketCap,
        ]
        if (portfolio) {
          const portfolioGross = (portfolioCoins[record.symbol.toLowerCase()] * parseFloat(record[`price_${convert}`.toLowerCase()])).toFixed(2)
          portfolioSum = portfolioSum + parseFloat(portfolioGross)
          defaultValues.push(portfolioGross)
        }
        const values = sortedColumns.map(index => defaultValues[index])
        return values
      })
      .forEach(record => table.push(record))
    if (table.length === 0) {
      console.log('We are not able to find coins matching your keywords'.red)
    } else {
      console.log(`Data source from coinmarketcap.com at ${new Date().toLocaleTimeString()}`)
      console.log(table.toString())
      portfolio && console.log('Estimated portfolio: '.bold + `${portfolioSum.toFixed(2)}`.green + ` ${convert}\n`)
    }
  })
  .catch(function (error) {
    spinner.stop()
    console.error('Coinmon is not working now. Please try again later.'.red)
  })