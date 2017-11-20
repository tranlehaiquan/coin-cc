#!/usr/bin/env node
const program = require('commander');
const axios = require('axios');
const ora = require('ora');
const cfonts = require('cfonts');
const Table = require('cli-table2');
const colors = require('colors');
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
    'left-mid': '-' ,
    'mid': '-' ,
    'mid-mid': '-',
    'right': '║',
    'right-mid': '-',
    'middle': '│'
  },
  head: ['Rank'.yellow, 'Coin'.yellow, 'Price (USD)'.yellow, 'Change (24H)'.yellow, 'Change (1H)'.yellow, 'Market Cap (USD)'.yellow]
  , colWidths: [6, 10, 15, 15, 15 , 20]
});

cfonts.say('coinmon', {
  font: 'simple3d',
  align: 'left',
  colors: ['yellow'],
  background: 'Black',
  letterSpacing: 2,
  lineHeight: 1,
  space: true,
  maxLength: '0'
});
const spinner = ora('Loading data').start();
axios.get('https://api.coinmarketcap.com/v1/ticker/')
.then(function (response) {
  spinner.stop();
  console.log(`Data from coinmarketcap at ${new Date()}`)
  response.data
    .filter(record => +record.rank <= 10)
    .map(record => {
      const percentChange24h = record.percent_change_24h
      const textChange24h = `${percentChange24h}%`
      const change24h = percentChange24h > 0 ? textChange24h.green : textChange24h.red
      const percentChange1h = record.percent_change_1h
      const textChange1h = `${percentChange1h}%`
      const change1h = percentChange1h > 0 ? textChange1h.green : textChange1h.red
      return [
        record.rank,
        `💰  ${record.symbol}`, 
        record.price_usd, 
        change24h,
        change1h,
        record.market_cap_usd
      ]
    })
    .forEach(record => table.push(record))
  console.log(table.toString());
})
.catch(function (error) {
  console.log(error);
});