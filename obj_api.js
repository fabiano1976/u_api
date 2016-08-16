var request = require('request');
var flatten = require('flat');
var myDB = {};


//list of xchgs urls: an Array of exchange name, pair and endpoint url>
var urls = [ 
	['livecoin', 'btceur', 'https://api.livecoin.net/exchange/ticker/?currencyPair=BTC/EUR'],
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
	['btce', 'nmcbtc', 'https://btc-e.com/api/3/ticker/nmc_btc'],
	['btce', 'btcusd', 'https://btc-e.com/api/3/ticker/btc_usd'],
	['btce', 'btceur', 'https://btc-e.com/api/3/ticker/btc_eur'],
	['btce', 'dashbtc', 'https://btc-e.com/api/3/ticker/dash_btc'],
	['btce', 'btcrub', 'https://btc-e.com/api/3/ticker/btc_rur'],
	// ['kraken', 'dogebtc', 'https://api.kraken.com/0/public/Ticker?pair=XXDGXXBT'],
	// ['kraken', 'btceur', 'https://api.kraken.com/0/public/Ticker?pair=XXBTZEUR'],
	// ['kraken', 'ethbtc', 'https://api.kraken.com/0/public/Ticker?pair=XETHXXBT'],
	// ['kraken', 'etcbtc', 'https://api.kraken.com/0/public/Ticker?pair=XETCXXBT'],
	// ['kraken', 'etceur', 'https://api.kraken.com/0/public/Ticker?pair=XETCZEUR'],
	// ['kraken', 'etceth', 'https://api.kraken.com/0/public/Ticker?pair=XETCXETH'],
	// ['kraken', 'daoeth', 'https://api.kraken.com/0/public/Ticker?pair=XDAOXETH'],
	// ['kraken', 'ltcbtc', 'https://api.kraken.com/0/public/Ticker?pair=XLTCXXBT'],
	// ['kraken', 'xrpbtc', 'https://api.kraken.com/0/public/Ticker?pair=XXRPXXBT'],
	// ['kraken', 'daoeur', 'https://api.kraken.com/0/public/Ticker?pair=XDAOZEUR'],
	// ['kraken', 'ltceur', 'https://api.kraken.com/0/public/Ticker?pair=XLTCZEUR'],
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
	['bter', 'xmrbtc', 'http://data.bter.com/api/1/ticker/xmr_btc'],
	['bittrex', 'stratbtc', 'https://bittrex.com/api/v1.1/public/getmarketsummary?market=BTC-STRAT'],
	['bittrex', 'dgbbtc', 'https://bittrex.com/api/v1.1/public/getmarketsummary?market=BTC-DGB'],
	['bittrex', 'ltcbtc', 'https://bittrex.com/api/v1.1/public/getmarketsummary?market=BTC-LTC'],
  	['bittrex', 'ethbtc', 'https://bittrex.com/api/v1.1/public/getmarketsummary?market=BTC-ETH'],
  	['bittrex', 'etcbtc', 'https://bittrex.com/api/v1.1/public/getmarketsummary?market=BTC-ETC'],
  	['bittrex', 'egcbtc', 'https://bittrex.com/api/v1.1/public/getmarketsummary?market=BTC-EGC'],
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
  	['bittrex', 'blkbtc', 'https://bittrex.com/api/v1.1/public/getmarketsummary?market=BTC-BLK'],
  	['hitbtc', 'btcusd', 'https://api.hitbtc.com/api/1/public/BTCUSD/ticker'],
 	['hitbtc', 'btceur', 'https://api.hitbtc.com/api/1/public/BTCEUR/ticker'],
 	['hitbtc', 'ltcbtc', 'https://api.hitbtc.com/api/1/public/LTCBTC/ticker'],
 	['hitbtc', 'ltcusd', 'https://api.hitbtc.com/api/1/public/LTCUSD/ticker'],
  	['hitbtc', 'ltceur', 'https://api.hitbtc.com/api/1/public/LTCEUR/ticker'],
  	['hitbtc', 'dogebtc', 'https://api.hitbtc.com/api/1/public/DOGEBTC/ticker'],
  	['hitbtc', 'xmrbtc', 'https://api.hitbtc.com/api/1/public/XMRBTC/ticker'],
	['therock', 'btceur', 'https://www.therocktrading.com/api/ticker/BTCEUR'],
	['therock', 'btcusd', 'https://www.therocktrading.com/api/ticker/BTCUSD'],
	['therock', 'ltceur', 'https://www.therocktrading.com/api/ticker/LTCEUR'],
	// ['therock', 'ltcbtc', 'https://www.therocktrading.com/api/ticker/LTCBTC'],
	['therock', 'ethbtc', 'https://www.therocktrading.com/api/ticker/ETHBTC'],
	['yobit', 'ltcbtc', 'https://yobit.net/api/3/ticker/ltc_btc'],
	['yobit', 'etcbtc', 'https://yobit.net/api/3/ticker/etc_btc'],
	['yobit', 'ethbtc', 'https://yobit.net/api/3/ticker/eth_btc'],
	['yobit', 'dashbtc', 'https://yobit.net/api/3/ticker/dash_btc'],
	['yobit', 'lsk[', 'https://yobit.net/api/3/ticker/lsk_btc'],
	['yobit', 'edrcbtc', 'https://yobit.net/api/3/ticker/edrc_btc'],
	['yobit', 'dogebtc', 'https://yobit.net/api/3/ticker/doge_btc'],
	['yobit', 'lcbtc', 'https://yobit.net/api/3/ticker/lc_btc'],
	['yobit', 'krbtc', 'https://yobit.net/api/3/ticker/kr_btc']
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
					var value = stdData(xchg, pair, data);
				}
			})
	})
}


function stdData(xchg, pair, data){

	if(xchg === 'livecoin'){
		var objID = xchg + pair;
		myDB[objID] = {};
		myDB[objID]['xchg'] = xchg;
		myDB[objID]['pair'] = pair;
		myDB[objID]['bid'] =  data.best_bid;
		myDB[objID]['ask'] = data.best_ask;
		myDB[objID]['last'] = data.last;
		myDB[objID]['vol'] = data.volume;
	}
	if(xchg === 'hitbtc'){
		var objID = xchg + pair;
		myDB[objID] = {};
		myDB[objID]['xchg'] = xchg;
		myDB[objID]['pair'] = pair;
		myDB[objID]['bid'] =  data.bid;
		myDB[objID]['ask'] = data.ask;
		myDB[objID]['last'] = data.last;
		myDB[objID]['vol'] = data.volume;
	}
	if(xchg === 'bitfinex'){
		var objID = xchg + pair;
		myDB[objID] = {};
		myDB[objID]['xchg'] = xchg;
		myDB[objID]['pair'] = pair;
		myDB[objID]['bid'] =  data.bid;
		myDB[objID]['ask'] = data.ask;
		myDB[objID]['last'] = data.last_price;
		myDB[objID]['vol'] = data.volume;
	}
		if(xchg === 'bter'){
		var objID = xchg + pair;
		myDB[objID] = {};
		myDB[objID]['xchg'] = xchg;
		myDB[objID]['pair'] = pair;
		myDB[objID]['bid'] =  data.buy;
		myDB[objID]['ask'] = data.sell;
		myDB[objID]['last'] = data.last;
		myDB[objID]['vol'] = data.vol_btc;
	}
		if(xchg === 'bittrex'){
		var objID = xchg + pair;
		myDB[objID] = {};
		myDB[objID]['xchg'] = xchg;
		myDB[objID]['pair'] = pair;
		myDB[objID]['bid'] =  data['result.0.Bid'];
		myDB[objID]['ask'] = data['result.0.Ask'];
		myDB[objID]['last'] = data['result.0.Last'];
		myDB[objID]['vol'] = data['result.0.Volume'];
	}
		if(xchg === 'therock'){
		var objID = xchg + pair;
		myDB[objID] = {};
		myDB[objID]['xchg'] = xchg;
		myDB[objID]['pair'] = pair;
		myDB[objID]['bid'] =  data['result.0.bid'];
		myDB[objID]['ask'] = data['result.0.ask'];
		myDB[objID]['last'] = data['result.0.last'];
		myDB[objID]['vol'] = data['result.0.volume'];
	}
	if(xchg === 'yobit'){
		var objID = xchg + pair;
		myDB[objID] = {};
		myDB[objID]['xchg'] = xchg;
		myDB[objID]['pair'] = pair;
		switch (pair){
			case 'etcbtc' :
				myDB[objID]['bid'] =   data['etc_btc.buy'];
				myDB[objID]['ask'] =  data['etc_btc.sell'];
				myDB[objID]['last'] = data['etc_btc.last'];
				myDB[objID]['vol'] =  data['etc_btc.vol'];
				break;
			case 'ethbtc' :
				myDB[objID]['bid'] =   data['eth_btc.buy'];
				myDB[objID]['ask'] =  data['eth_btc.sell'];
				myDB[objID]['last'] = data['eth_btc.last'];
				myDB[objID]['vol'] =  data['eth_btc.vol'];
				break;
			case 'dashbtc' :
				myDB[objID]['bid'] =   data['dash_btc.buy'];
				myDB[objID]['ask'] =  data['dash_btc.sell'];
				myDB[objID]['last'] = data['dash_btc.last'];
				myDB[objID]['vol'] =  data['dash_btc.vol'];
				break;
			case 'lskbtc' :
				myDB[objID]['bid'] =   data['lsk_btc.buy'];
				myDB[objID]['ask'] =  data['lsk_btc.sell'];
				myDB[objID]['last'] = data['lsk_btc.last'];
				myDB[objID]['vol'] =  data['lsk_btc.vol'];
				break;
			case 'edrcbtc' :
				myDB[objID]['bid'] =   data['edrc_btc.buy'];
				myDB[objID]['ask'] =  data['edrc_btc.sell'];
				myDB[objID]['last'] = data['edrc_btc.last'];
				myDB[objID]['vol'] =  data['edrc_btc.vol'];
				break;
			case 'ltcbtc' :
				myDB[objID]['bid'] =   data['ltc_btc.buy'];
				myDB[objID]['ask'] =  data['ltc_btc.sell'];
				myDB[objID]['last'] = data['ltc_btc.last'];
				myDB[objID]['vol'] =  data['ltc_btc.vol'];
				break;
			case 'dogebtc' :
				myDB[objID]['bid'] =   data['doge_btc.buy'];
				myDB[objID]['ask'] =  data['doge_btc.sell'];
				myDB[objID]['last'] = data['doge_btc.last'];
				myDB[objID]['vol'] =  data['doge_btc.vol'];
				break;
			case 'lcbtc' :
				myDB[objID]['bid'] =   data['lc_btc.buy'];
				myDB[objID]['ask'] =  data['lc_btc.sell'];
				myDB[objID]['last'] = data['lc_btc.last'];
				myDB[objID]['vol'] =  data['lc_btc.vol'];
				break;
			case 'krbtc' :
				myDB[objID]['bid'] =   data['kr_btc.buy'];
				myDB[objID]['ask'] =  data['kr_btc.sell'];
				myDB[objID]['last'] = data['kr_btc.last'];
				myDB[objID]['vol'] =  data['kr_btc.vol'];
		}
	}
	if(xchg === 'btce'){
		var objID = xchg + pair;
		myDB[objID] = {};
		myDB[objID]['xchg'] = xchg;
		myDB[objID]['pair'] = pair;
		switch (pair){
			case 'btceur' :
				myDB[objID]['bid'] =   data['btc_eur.sell'];
				myDB[objID]['ask'] =  data['btc_eur.buy'];
				myDB[objID]['last'] = data['btc_eur.last'];
				myDB[objID]['vol'] =  data['btc_eur.vol'];
				break;
			case 'btcusd' :
				myDB[objID]['bid'] =  data['btc_usd.sell'];
				myDB[objID]['ask'] =  data['btc_usd.buy'];
				myDB[objID]['last'] = data['btc_usd.last'];
				myDB[objID]['vol'] =  data['btc_usd.vol'];
				break;
			case 'btcrub' :
				myDB[objID]['bid'] =  data['btc_rur.sell'];
				myDB[objID]['ask'] =  data['btc_rur.buy'];
				myDB[objID]['last'] = data['btc_rur.last'];
				myDB[objID]['vol'] =  data['btc_rur.vol'];
				break;
			case 'ethusd' :
				myDB[objID]['bid'] =  data['eth_usd.sell'];
				myDB[objID]['ask'] =  data['eth_usd.buy'];
				myDB[objID]['last'] = data['eth_usd.last'];
				myDB[objID]['vol'] =  data['eth_usd.vol'];
				break;
			case 'ethbtc' :
				myDB[objID]['bid'] =  data['eth_btc.sell'];
				myDB[objID]['ask'] =  data['eth_btc.buy'];
				myDB[objID]['last'] = data['eth_btc.last'];
				myDB[objID]['vol'] =  data['eth_btc.vol'];
				break;
			case 'ethltc' :
				myDB[objID]['bid'] =  data['eth_ltc.sell'];
				myDB[objID]['ask'] =  data['eth_ltc.buy'];
				myDB[objID]['last'] = data['eth_ltc.last'];
				myDB[objID]['vol'] =  data['eth_ltc.vol'];
				break;
			case 'ltcbtc' :
				myDB[objID]['bid'] =  data['ltc_btc.sell'];
				myDB[objID]['ask'] =  data['ltc_btc.buy'];
				myDB[objID]['last'] = data['ltc_btc.last'];
				myDB[objID]['vol'] =  data['ltc_btc.vol'];
				break;
			case 'ltcusd' :
				myDB[objID]['bid'] =  data['ltc_usd.sell'];
				myDB[objID]['ask'] =  data['ltc_usd.buy'];
				myDB[objID]['last'] = data['ltc_usd.last'];
				myDB[objID]['vol'] =  data['ltc_usd.vol'];
				break;
			case 'ppcusd' :
				myDB[objID]['bid'] =  data['ppc_usd.sell'];
				myDB[objID]['ask'] =  data['ppc_usd.buy'];
				myDB[objID]['last'] = data['ppc_usd.last'];
				myDB[objID]['vol'] =  data['ppc_usd.vol'];
				break;
			case 'nmcbtc' :
				myDB[objID]['bid'] =  data['nmc_btc.sell'];
				myDB[objID]['ask'] =  data['nmc_btc.buy'];
				myDB[objID]['last'] = data['nmc_btc.last'];
				myDB[objID]['vol'] =  data['nmc_btc.vol'];
				break;
			case 'dashbtc' :
				myDB[objID]['bid'] =  data['dash_btc.sell'];
				myDB[objID]['ask'] =  data['dash_btc.buy'];
				myDB[objID]['last'] = data['dash_btc.last'];
				myDB[objID]['vol'] =  data['dash_btc.vol'];
				break;
			case 'nmcusd' :
				myDB[objID]['bid'] =  data['nmc_usd.sell'];
				myDB[objID]['ask'] =  data['nmc_usd.buy'];
				myDB[objID]['last'] = data['nmc_usd.last'];
				myDB[objID]['vol'] =  data['nmc_usd.vol'];
			}
	}
	if(xchg === 'kraken'){
		var objID = xchg + pair;
		myDB[objID] = {};
		myDB[objID]['xchg'] = xchg;
		myDB[objID]['pair'] = pair;
		switch (pair){
			case 'btceur':
				myDB[objID]['bid'] =   data['result.XXBTZEUR.b.0'];
				myDB[objID]['ask'] =  data['result.XXBTZEUR.a.0'];
				myDB[objID]['last'] = data['result.XXBTZEUR.c.0'];
				myDB[objID]['vol'] =  data['result.XXBTZEUR.v.0'];
				break;
			case 'dogebtc':
				myDB[objID]['bid'] =   data['result.XXDGXXBT.b.0'];
				myDB[objID]['ask'] =  data['result.XXDGXXBT.a.0'];
				myDB[objID]['last'] = data['result.XXDGXXBT.c.0'];
				myDB[objID]['vol'] =  data['result.XXDGXXBT.v.0'];
				break;
			case 'ethbtc':
				myDB[objID]['bid'] =   data['result.XETHXXBT.b.0'];
				myDB[objID]['ask'] =  data['result.XETHXXBT.a.0'];
				myDB[objID]['last'] = data['result.XETHXXBT.c.0'];
				myDB[objID]['vol'] =  data['result.XETHXXBT.v.0'];
				break;
			case 'etcbtc':
				myDB[objID]['bid'] =   data['result.XETCXXBT.b.0'];
				myDB[objID]['ask'] =  data['result.XETCXXBT.a.0'];
				myDB[objID]['last'] = data['result.XETCXXBT.c.0'];
				myDB[objID]['vol'] =  data['result.XETCXXBT.v.0'];
				break;
			case 'etceur':
				myDB[objID]['bid'] =   data['result.XETCZEUR.b.0'];
				myDB[objID]['ask'] =  data['result.XETCZEUR.a.0'];
				myDB[objID]['last'] = data['result.XETCZEUR.c.0'];
				myDB[objID]['vol'] =  data['result.XETCZEUR.v.0'];
				break;
			case 'etceth':
				myDB[objID]['bid'] =   data['result.XETCXETH.b.0'];
				myDB[objID]['ask'] =  data['result.XETCXETH.a.0'];
				myDB[objID]['last'] = data['result.XETCXETH.c.0'];
				myDB[objID]['vol'] =  data['result.XETCXETH.v.0'];
				break;
			case 'daoeth':
				myDB[objID]['bid'] =   data['result.XDAOXETH.b.0'];
				myDB[objID]['ask'] =  data['result.XDAOXETH.a.0'];
				myDB[objID]['last'] = data['result.XDAOXETH.c.0'];
				myDB[objID]['vol'] =  data['result.XDAOXETH.v.0'];
				break;
			case 'ltcbtc':
				myDB[objID]['bid'] =   data['result.XLTCXXBT.b.0'];
				myDB[objID]['ask'] =  data['result.XLTCXXBT.a.0'];
				myDB[objID]['last'] = data['result.XLTCXXBT.c.0'];
				myDB[objID]['vol'] =  data['result.XLTCXXBT.v.0'];
				break;
			case 'xrpbtc':
				myDB[objID]['bid'] =   data['result.XXRPXXBT.b.0'];
				myDB[objID]['ask'] =  data['result.XXRPXXBT.a.0'];
				myDB[objID]['last'] = data['result.XXRPXXBT.c.0'];
				myDB[objID]['vol'] =  data['result.XXRPXXBT.v.0'];
				break;
			case 'daoeur':
				myDB[objID]['bid'] =   data['result.XDAOZEUR.b.0'];
				myDB[objID]['ask'] =  data['result.XDAOZEUR.a.0'];
				myDB[objID]['last'] = data['result.XDAOZEUR.c.0'];
				myDB[objID]['vol'] =  data['result.XDAOZEUR.v.0'];
				break;
			case 'ltceur':
				myDB[objID]['bid'] =   data['result.XLTCZEUR.b.0'];
				myDB[objID]['ask'] =  data['result.XLTCZEUR.a.0'];
				myDB[objID]['last'] = data['result.XLTCZEUR.c.0'];
				myDB[objID]['vol'] =  data['result.XLTCZEUR.v.0'];
		}
	}
}

///set minimum and potential profits to trade
var mprofit = 0.015;
var pprofit = 0.045;
var fmprofit = 0.030;
var fpprofit = 0.060;


function compare(){
	for (var objID in myDB) {
		var xchgvenda =  myDB[objID]['xchg'];
		var apair =  myDB[objID]['pair'];
		var pvenda  = myDB[objID]['ask'];
		var ultvenda = myDB[objID]['last'];
		for (var objID in myDB) {
			if( myDB[objID]['xchg'] !== xchgvenda ){
				var xchgcompra =  myDB[objID]['xchg'];
				if ( myDB[objID]['pair'] === apair ) {
					var ultcompra = myDB[objID]['last'];
					var pcompra =  myDB[objID]['bid'];
					var ilucro = (1 - (pvenda/pcompra));
					var ulucro = (1 - (ultvenda/ultcompra));
					if (apair == 'btceur' || apair == 'btcusd' || apair == 'btcrub' || apair == 'btcbrl' ) {
						if (ulucro > fpprofit){
						console.log('fiat potential : buy '+apair+' @ '+ultvenda+' @ '+xchgvenda+' sell @ '+ultcompra+' @ '+xchgcompra+' @ '+(ulucro*100)+'%. \n');
						}
						if(ilucro > fmprofit){
						console.log('FIAT INSTANT  buy '+apair+' @ '+pvenda+' @ '+xchgvenda+' sell @ '+pcompra+' @ '+xchgcompra+' @ '+(ilucro*100)+'%. \n');
						}
					}else{
						if (ulucro > pprofit){
						console.log('potential : buy '+apair+' @ '+ultvenda+' @ '+xchgvenda+' sell @ '+ultcompra+' @ '+xchgcompra+' @ '+(ulucro*100)+'%. \n');
						}
						if(ilucro > mprofit){
						console.log('INSTANT  buy '+apair+' @ '+pvenda+' @ '+xchgvenda+' sell @ '+pcompra+' @ '+xchgcompra+' @ '+(ilucro*100)+'%. \n');
						}

					}

				}

			}
			
		}

	}
}


setInterval(function runGetData(){
	getData();
}, 5000)


setInterval(function runCompare(){
	compare();
	console.log("\n\n\n\n\n\n\n\n\n");
}, 5000)

