var request = require('request');
var flatten = require('flat');




//list of xchgs urls: an Array of exchange name, pair and endpoint url>
var urls = [    
	['foxbit', 'brlbtc', 'https://api.blinktrade.com/api/v1/BRL/ticker']
];


function getData(){
  urls.forEach(function(params){
    var xchg = params[0];
    var pair = params[1];
    var url = params[2];
      request( url, function (error, response, body){
        if (!error && response.statusCode == 200) {
          var toflat = JSON.parse(body);
          var data = flatten(toflat);
          console.log(data);
        }
      })
  })
}


getData();



/*  ['livecoin', 'btceur', 'https://api.livecoin.net/exchange/ticker/?currencyPair=BTC/EUR'],
  ['livecoin', 'btcusd', 'https://api.livecoin.net/exchange/ticker/?currencyPair=BTC/USD'],
  ['livecoin', 'btcrub', 'https://api.livecoin.net/exchange/ticker/?currencyPair=BTC/RUR'],
  ['livecoin', 'ltcbtc', 'https://api.livecoin.net/exchange/ticker/?currencyPair=LTC/BTC'],
  ['livecoin', 'ltcusd', 'https://api.livecoin.net/exchange/ticker/?currencyPair=LTC/USD'],
  ['livecoin', 'emcusd', 'https://api.livecoin.net/exchange/ticker/?currencyPair=EMC/USD'],
  ['livecoin', 'emcbtc', 'https://api.livecoin.net/exchange/ticker/?currencyPair=EMC/BTC'],
  ['livecoin', 'dashbtc', 'https://api.livecoin.net/exchange/ticker/?currencyPair=DASH/BTC'],
  ['livecoin', 'ethbtc', 'https://api.livecoin.net/exchange/ticker/?currencyPair=ETH/BTC'],
  ['livecoin', 'etheur', 'https://api.livecoin.net/exchange/ticker/?currencyPair=ETH/EUR'],
  ['livecoin', 'ethusd', 'https://api.livecoin.net/exchange/ticker/?currencyPair=ETH/USD'],
  ['livecoin', 'dogebtc', 'https://api.livecoin.net/exchange/ticker/?currencyPair=DOGE/BTC'],
  ['livecoin', 'lskbtc', 'https://api.livecoin.net/exchange/ticker/?currencyPair=LSK/BTC'],
  ['livecoin', 'leobtc', 'https://api.livecoin.net/exchange/ticker/?currencyPair=LEO/BTC'],
  ['btce', 'ethusd', 'https://btc-e.com/api/3/ticker/eth_usd'],
  ['btce', 'ethbtc', 'https://btc-e.com/api/3/ticker/eth_btc'],
  ['btce', 'ethltc', 'https://btc-e.com/api/3/ticker/eth_ltc'],
  ['btce', 'ltcbtc', 'https://btc-e.com/api/3/ticker/ltc_btc'],
  ['btce', 'ltcusd', 'https://btc-e.com/api/3/ticker/ltc_usd'],
  ['btce', 'ppcusd', 'https://btc-e.com/api/3/ticker/ppc_usd'],
  ['btce', 'nmcusd', 'https://btc-e.com/api/3/ticker/nmc_usd'],
  ['btce', 'btcusd', 'https://btc-e.com/api/3/ticker/btc_usd'],
  ['btce', 'btceur', 'https://btc-e.com/api/3/ticker/btc_eur'],
  ['btce', 'btcrub', 'https://btc-e.com/api/3/ticker/btc_rur'],
    ['bittrex', 'ltcbtc', 'https://bittrex.com/api/v1.1/public/getmarketsummary?market=BTC-LTC'],
  ['bittrex', 'ethbtc', 'https://bittrex.com/api/v1.1/public/getmarketsummary?market=BTC-ETH'],
  ['bittrex', 'etcbtc', 'https://bittrex.com/api/v1.1/public/getmarketsummary?market=BTC-ETC'],
  ['bittrex', 'ltcbtc', 'https://bittrex.com/api/v1.1/public/getmarketsummary?market=BTC-EGC'],
  ['bittrex', 'wavesbtc', 'https://bittrex.com/api/v1.1/public/getmarketsummary?market=BTC-WAVES'],
  ['bittrex', 'fctbtc', 'https://bittrex.com/api/v1.1/public/getmarketsummary?market=BTC-FCT'],
  ['bittrex', 'steembtc', 'https://bittrex.com/api/v1.1/public/getmarketsummary?market=BTC-STEEM'],
  ['bittrex', 'lskbtc', 'https://bittrex.com/api/v1.1/public/getmarketsummary?market=BTC-LSK'],
  ['bittrex', 'voxbtc', 'https://bittrex.com/api/v1.1/public/getmarketsummary?market=BTC-VOX'],
  ['bittrex', 'maidbtc', 'https://bittrex.com/api/v1.1/public/getmarketsummary?market=BTC-MAID'],
  ['bittrex', 'krbtc', 'https://bittrex.com/api/v1.1/public/getmarketsummary?market=BTC-KR'],
  ['bittrex', 'dracobtc', 'https://bittrex.com/api/v1.1/public/getmarketsummary?market=BTC-DRACO'],
  ['bittrex', 'nxtbtc', 'https://bittrex.com/api/v1.1/public/getmarketsummary?market=BTC-NXT'],
  ['bittrex', 'clubbtc', 'https://bittrex.com/api/v1.1/public/getmarketsummary?market=BTC-CLUB'],
  ['bittrex', 'dogebtc', 'https://bittrex.com/api/v1.1/public/getmarketsummary?market=BTC-DOGE'],
  ['bittrex', 'dashbtc', 'https://bittrex.com/api/v1.1/public/getmarketsummary?market=BTC-DASH'],
  ['bittrex', 'ftcbtc', 'https://bittrex.com/api/v1.1/public/getmarketsummary?market=BTC-FTC'],
  ['bittrex', 'xmrbtc', 'https://bittrex.com/api/v1.1/public/getmarketsummary?market=BTC-XMR'],
  ['bittrex', 'etceth', 'https://bittrex.com/api/v1.1/public/getmarketsummary?market=ETH-ETC'],
  ['bittrex', 'vtcbtc', 'https://bittrex.com/api/v1.1/public/getmarketsummary?market=BTC-VTC'],
  ['bittrex', 'vrcbtc', 'https://bittrex.com/api/v1.1/public/getmarketsummary?market=BTC-VRC'],
  ['bittrex', 'blkbtc', 'https://bittrex.com/api/v1.1/public/getmarketsummary?market=BTC-BLK']
  ['kraken', 'dogebtc', 'https://api.kraken.com/0/public/Ticker?pair=XXDGXXBT'],
  ['kraken', 'btceur', 'https://api.kraken.com/0/public/Ticker?pair=XXBTZEUR'],
  ['kraken', 'ethbtc', 'https://api.kraken.com/0/public/Ticker?pair=XETHXXBT'],
  ['kraken', 'etcbtc', 'https://api.kraken.com/0/public/Ticker?pair=XETCXXBT'],
  ['kraken', 'etceur', 'https://api.kraken.com/0/public/Ticker?pair=XETCZEUR'],
  ['kraken', 'etceth', 'https://api.kraken.com/0/public/Ticker?pair=XETCXETH'],
  ['kraken', 'daoeth', 'https://api.kraken.com/0/public/Ticker?pair=XDAOXETH'],
  ['kraken', 'ltcbtc', 'https://api.kraken.com/0/public/Ticker?pair=XLTCXXBT'],
  ['kraken', 'xrpbtc', 'https://api.kraken.com/0/public/Ticker?pair=XXRPXXBT'],
  ['kraken', 'daoeur', 'https://api.kraken.com/0/public/Ticker?pair=XDAOZEUR'],
  ['kraken', 'ltceur', 'https://api.kraken.com/0/public/Ticker?pair=XLTCZEUR'],
  ['bitfinex', 'ethbtc', 'https://api.bitfinex.com/v1/pubticker/ethbtc'],
  ['bitfinex', 'ltcbtc', 'https://api.bitfinex.com/v1/pubticker/ltcbtc'],
  ['bitfinex', 'etcbtc', 'https://api.bitfinex.com/v1/pubticker/etcbtc'],
  ['bter', 'ethbtc', 'http://data.bter.com/api/1/ticker/eth_btc'],
  ['bter', 'dashbtc', 'http://data.bter.com/api/1/ticker/dash_btc'],
  ['bter', 'etcbtc', 'http://data.bter.com/api/1/ticker/etc_btc'],
  ['bter', 'nxtbtc', 'http://data.bter.com/api/1/ticker/nxt_btc'],
  ['bter', 'vtcbtc', 'http://data.bter.com/api/1/ticker/vtc_btc'],
  ['bter', 'dogebtc', 'http://data.bter.com/api/1/ticker/doge_btc'],
  ['bter', 'ltcbtc', 'http://data.bter.com/api/1/ticker/ltc_btc'],
  ['bter', 'xmrbtc', 'http://data.bter.com/api/1/ticker/xmr_btc']
];*/