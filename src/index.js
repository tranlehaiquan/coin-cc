#!/usr/bin/env node
var program = require('commander');
var axios = require('axios');

axios.get('https://api.coinmarketcap.com/v1/ticker/')
.then(function (response) {
  console.log(response);
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