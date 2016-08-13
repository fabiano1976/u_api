var request = require('request');
var flatten = require('flat');
var currency = require('y-currency');

var api = {};
var xchgs = ["LIVECOIN", "COINMATE", "BTCE"];
var paths = ["TICKER", "BOOK"];
var pairs = ["BTCEUR", "BTCUSD", "BTCBRL", "BTCRUB", "BTCCNY"];
var currencies = ["USDEUR", "BRLEUR", "RUBEUR", "CNYEUR"];
var urls = {};

//def vars on urls

xchgs.forEach(function(xchg){
	urls[xchg] = {};
	paths.forEach(function(path){
		urls[xchg][path] = {};
		pairs.forEach(function(pair){
			urls[xchg][path][pair] = {};
		})
	})
})

//def vars on api 

xchgs.forEach(function(xchg){
	api[xchg] = {};
	paths.forEach(function(path){
		api[xchg][path] = {};
		pairs.forEach(function(pair){
			api[xchg][path][pair] = {
				'vol' : '',
				'last' : '',
				'buy' : '',
				'sell' : '',
				'orders' : {} 
			};
		})
	})
})

//SET PUBLIC APIS URLS

// //LIVECOIN 
urls["LIVECOIN"]["TICKER"]["BTCEUR"] = 'https://api.livecoin.net/exchange/ticker/?currencyPair=BTC/EUR';
urls["LIVECOIN"]["TICKER"]["BTCUSD"] = 'https://api.livecoin.net/exchange/ticker/?currencyPair=BTC/USD';
urls["LIVECOIN"]["TICKER"]["BTCRUB"] = 'https://api.livecoin.net/exchange/ticker/?currencyPair=BTC/RUR';

//BTCE
urls["BTCE"]["TICKER"]["BTCUSD"] = 'https://btc-e.com/api/3/ticker/btc_usd';
urls["BTCE"]["TICKER"]["BTCEUR"] = 'https://btc-e.com/api/3/ticker/btc_eur';
urls["BTCE"]["TICKER"]["BTCRUB"] = 'https://btc-e.com/api/3/ticker/btc_rur';

function getData(){
	xchgs.forEach(function(xchg){
		paths.forEach(function(path){
			pairs.forEach(function(pair){
				request(urls[xchg][path][pair], function (error, response, body) {
					if (!error && response.statusCode == 200) {
					var data = JSON.parse(body);
					var flatdata = flatten(data);
						if (path === "TICKER") {
  							if (xchg === "LIVECOIN") {
  								if (pair === "BTCEUR") {
  								api[xchg][path][pair]['vol'] = data.volume;
  								api[xchg][path][pair]['last'] = data.last;
  								api[xchg][path][pair]['buy'] = data.best_bid;
  								api[xchg][path][pair]['sell'] = data.best_ask;
  								}if (pair === "BTCUSD") {
  								api[xchg][path][pair]['vol'] = data.volume;
  								api[xchg][path][pair]['last'] = data.last;
  								api[xchg][path][pair]['buy'] = data.best_bid;
  								api[xchg][path][pair]['sell'] = data.best_ask;
  								}if (pair === "BTCRUB") {
  								api[xchg][path][pair]['vol'] = data.volume;
  								api[xchg][path][pair]['last'] = data.last;
  								api[xchg][path][pair]['buy'] = data.best_bid;
  								api[xchg][path][pair]['sell'] = data.best_ask;
  								}
  							}
  							if (xchg === "BTCE") {
  								if (pair === "BTCEUR") {
  								api[xchg][path][pair]['vol'] = flatdata['btc_eur.vol'];
  								api[xchg][path][pair]['last'] = flatdata['btc_eur.last'];
  								api[xchg][path][pair]['buy'] = flatdata['btc_eur.buy'];
  								api[xchg][path][pair]['sell'] = flatdata['btc_eur.sell'];
  								}if (pair === "BTCUSD") {
  								api[xchg][path][pair]['vol'] = flatdata['btc_usd.vol'];
  								api[xchg][path][pair]['last'] = flatdata['btc_usd.last'];
  								api[xchg][path][pair]['buy'] = flatdata['btc_usd.buy'];
  								api[xchg][path][pair]['sell'] = flatdata['btc_usd.sell'];
  								}if (pair === "BTCRUB") {
  								api[xchg][path][pair]['vol'] = flatdata['btc_rur.vol'];
  								api[xchg][path][pair]['last'] = flatdata['btc_rur.last'];
  								api[xchg][path][pair]['buy'] = flatdata['btc_rur.buy'];
  								api[xchg][path][pair]['sell'] = flatdata['btc_rur.sell'];
  								}
  							}
  						}
  								//console.log(api["COINMATE"]["TICKER"]["BTCEUR"]);
  								//console.log(typeof api[xchg][path][pair].sell);
  								//console.log(api[xchg][path][pair].sell);
  								//console.log(api);
			  		}
			  	})

			})

		})
	})
}

getData();




