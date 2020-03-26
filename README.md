
<img src="https://raw.githubusercontent.com/bichenkk/coinmon/master/logo.png">

[![Node version](https://img.shields.io/badge/node.js-%3E=_6.0-green.svg)](http://nodejs.org/download/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

> 💰 Cryptocurrency price ticker CLI.

Check cryptocurrencies' prices, changes on your console.
Best CLI tool for those who are both **Crypto investors** and **Engineers**.

All data comes from [coincap](https://coincap.io/) APIs.

## Quick Update
* As coinmarketcap API is only free with API keys, we moved to use coincap API and disabled some features.

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
