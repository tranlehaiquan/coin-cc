<p align=center>
<img src="https://raw.githubusercontent.com/bichenkk/coinmon/master/logo.png">
</p>
<p align=center>
<a target="_blank" href="http://nodejs.org/download/" title="Node version"><img src="https://img.shields.io/badge/node.js-%3E=_6.0-green.svg"></a>
<a target="_blank" href="https://opensource.org/licenses/MIT" title="License: MIT"><img src="https://img.shields.io/badge/License-MIT-blue.svg"></a>
<a target="_blank" href="http://makeapullrequest.com" title="PRs Welcome"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg"></a>
</p>  


> Cryptocurrency price ticker CLI.

Check coin prices, changes on your console.
Best CLI tool for those who are both **Crypto investors** and **Engineers**.

All data comes from [coinmarketcap.com](https://coinmarketcap.com/) APIs.

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

### Options

You can use the `-t` (or `--top`) command with the index to check the top n cryptocurrencies ranked by their market cap.

```
$ coinmon --top 50
```

## Development

It's simple to run `coinmon` on your local computer.  
The following is step-by-step instruction.

```
$ git clone https://github.com/xxhomey19/nba-go.git
$ cd coinmon
$ yarn
$ npm install -g
$ npm link
$ coinmon
```

## License

MIT