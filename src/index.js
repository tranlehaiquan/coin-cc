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
  head: ['Coin'.yellow, 'Price (USD)'.yellow, 'Change (24H)'.yellow, 'Market Cap (USD)'.yellow]
  , colWidths: [10, 20, 20, 20]
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
  response.data
    .filter(record => +record.rank <= 5)
    .map(record => [
      `💰  ${record.symbol}`, 
      record.price_usd, 
      record.percent_change_24h > 0 ? record.percent_change_24h.green : record.percent_change_24h.red,
      record.market_cap_usd
    ])
    .forEach(record => table.push(record))
  console.log(table.toString());
})
.catch(function (error) {
  console.log(error);
});

// program
//   .arguments('<coin>')
//   .action(function(coin) {
//     console.log('coin: %s', coin);
//   })
//   .parse(process.argv);