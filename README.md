
<img src="https://raw.githubusercontent.com/bichenkk/coinmon/master/logo.png">

[![Node version](https://img.shields.io/badge/node.js-%3E=_6.0-green.svg)](http://nodejs.org/download/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

> 💰 Cryptocurrency price ticker CLI.

Check cryptocurrencies' prices, changes on your console.
Best CLI tool for those who are both **Crypto investors** and **Engineers**.

All data comes from [coinmarketcap.com](https://coinmarketcap.com/) APIs.

## Upcoming 1.0.0
We are working hard to add more useful features on coinmon!
* redesign
* auto-refresh
* currency detail
* price chart

## Install

In order to use coinmon, make sure that you have [Node](https://nodejs.org/) version 6.0.0 or higher.

```
$ npm install -g coinmon
```

## Usage

To check the top 10 cryptocurrencies ranked by their market cap, simply enter
```
$ coinmon
```

## Options

### Convert to specific currency base

You can use the `-c` (or `--convert`) with the currency symbol to find in terms of another currency.
The default currency is USD and it supports AUD, BRL, CAD, CHF, CLP, CNY, CZK, DKK, EUR, GBP, HKD, HUF, IDR, ILS, INR, JPY, KRW, MXN, MYR, NOK, NZD, PHP, PKR, PLN, RUB, SEK, SGD, THB, TRY, TWD, ZAR.

```
$ coinmon -c eur // convert prices to Euro
$ coinmon -c jpy // convert prices to Yen
```

You can also use BTC as the price pair.

```
$ coinmon -c btc // convert prices to bitcoin
```

### Find specific coin(s)

You can use the `-f` (or `--find`) with coin symbol to search cryptocurrencies. You can add symbols seperated by comma.

```
$ coinmon -f btc // search coins included keyword btc
$ coinmon -f btc,eth // search coins included keyword btc or eth
```

### Find top coin(s)

You can use the `-t` (or `--top`) with the index to find the top n cryptocurrencies ranked by their market cap.

```
$ coinmon -t 50 // find top 50
$ coinmon -t 1000 // find top 1000
```

### Add your portfolio

You can use the `-p` (or `--portfolio`) to retrieve price info and value estimation for your personal crypto portfolio specified in $HOME/.coinmon/portfolio.json in the following format:

```
$ cd
$ mkdir .coinmon
$ cd .coinmon
$ touch portfolio.json
```

And you can use vim or editors to input your portfolio

```
{
  "btc": 10,
  "eth": 100,
  ...
}
```

```
$ coinmon -p // Retrieve the portfolio from $HOME/.coinmon/portfolio.json
$ coinmon -p /anotherDir/myportfolio.json // Retrieve the portfolio from specified directory
```

### Show specific columns

You can use the `-s` (or `--specific`) to display specific columns. You can add index seperated by comma.

```
0 - Rank (by Market Cap)
1 - Name
2 - Price
3 - Change 1H
4 - Change 24H
5 - Change 7D
6 - Market Cap
7 - Balance (when portfolio is enabled)
8 - Estimated Value (when portfolio is enabled)
```

```
$ coinmon -s 0,1,2 // Display only Rank, Coin and Price
$ coinmon -s 0,1,2,4 // Display only Rank, Coin, Price and Change 24H
```

### Rank specific columns

You can use the `-r` (or `--rank`) with the index to sort specific columns.

```
0 - Rank (by Market Cap)
1 - Name
2 - Price
3 - Change 1H
4 - Change 24H
5 - Change 7D
6 - Market Cap
7 - Balance (when portfolio is enabled)
8 - Estimated Value (when portfolio is enabled)
```

```
$ coinmon -t 100 -r 4 // Rank top 100 coins based on Change 24H column
$ coinmon -p -r 7  // Rank my portfolio based on Estimated Value column
```

### Show option menu

You can use the `-h` (or `--help`) to find all valid options of coinmon

```
$ coinmon -h
```

## Screenshot

<img src="https://raw.githubusercontent.com/bichenkk/coinmon/master/screenshot.png">

## Development

It's simple to run `coinmon` on your local computer.  
The following is step-by-step instruction.

```
$ git clone https://github.com/bichenkk/coinmon.git
$ cd coinmon
$ yarn
$ npm install -g
$ npm link
$ coinmon
```

## Docker

### Initial usage

```
$ docker run --rm -ti jaymoulin/coinmon
```

You can pass parameters just like `coinmon` binary

```
$ docker run --rm -ti jaymoulin/coinmon --help
```

### Local usage

#### Build image

```
$ docker build -t coinmon .
```

#### Usage

```
$ docker run --rm -ti coinmon
```

You can pass parameters just like `coinmon` binary

```
$ docker run --rm -ti coinmon --help
```

## Contributors

* @maticrivo 
* @pgila 
* @vladei 
* @jaymoulin
* @anilkilic

## License

MIT
