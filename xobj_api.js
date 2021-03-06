var request = require('request');
var flatten = require('flat');
var fiat = " eur usd brl cny ars cad gbp jpy rub ";
var oxr = require('open-exchange-rates');
var fx = require('money');
var toeur = {}; 
var myDB = {};

function getRates() {
	//set OXR API
	oxr.set({ app_id: 'dcd70ee49fad49bfb7f26d1bce5f0bf0' })

	oxr.latest(function() {
    // Apply exchange rates and base rate to `fx` library object:
    fx.rates = oxr.rates;
    fx.base = oxr.base;

    toeur['usd']  = fx(1).from("USD").to("EUR");
    toeur['brl']  = fx(1).from("BRL").to("EUR");
    toeur['cny']  = fx(1).from("CNY").to("EUR");
    toeur['ars']  = fx(1).from("ARS").to("EUR");
    toeur['cad']  = fx(1).from("CAD").to("EUR");
    toeur['gbp']  = fx(1).from("GBP").to("EUR");
    toeur['jpy']  = fx(1).from("JPY").to("EUR");
    toeur['rub']  = fx(1).from("RUB").to("EUR");

    // console.log(toeur);
});

}

// xchngfees ['name', deposit, withdraw]
xchngfees = [
	['btce', 0.01, 0.01],
	['livecoin', 0.015, 0.005],
	['therock', 0, 0],
	['spacebtc', 0.015, 0.015],
	['kraken', 0, 0],
	['exmo', 0.02, 0.01],
	['coinmate', 0.005, 0.015],
	['foxbit', 0, 0.0139],
	['b2u', 0.0189, 0.189],
	['negcoins', 0, 0.005],
	['mbitcoin', 0.0199, 0.0199]


];

fees = {};

function setFees(){
	xchngfees.forEach(function(params){
		var xchg = params[0];
		fees[xchg] = {};
		fees[xchg]['in'] = params[1];
		fees[xchg]['out'] = params[2];
	})

}

//use
//console.log(fees[xchg].in);


//list of xchgs urls: an Array of exchange name, pair and endpoint url>
var urls = [ 
	['livecoin', 'btceur', 'https://api.livecoin.net/exchange/ticker/?currencyPair=BTC/EUR'],
	['livecoin', 'btcusd', 'https://api.livecoin.net/exchange/ticker/?currencyPair=BTC/USD'],
	['livecoin', 'ltcusd', 'https://api.livecoin.net/exchange/ticker/?currencyPair=LTC/USD'],
	['livecoin', 'etheur', 'https://api.livecoin.net/exchange/ticker/?currencyPair=ETH/EUR'],
	['livecoin', 'ethusd', 'https://api.livecoin.net/exchange/ticker/?currencyPair=ETH/USD'],
	['livecoin', 'dashusd', 'https://api.livecoin.net/exchange/ticker/?currencyPair=DASH/USD'],
	// ['kraken', 'btceur', 'https://api.kraken.com/0/public/Ticker?pair=XXBTZEUR'],
	// ['kraken', 'etceur', 'https://api.kraken.com/0/public/Ticker?pair=XETCZEUR'],
	// ['kraken', 'etheur', 'https://api.kraken.com/0/public/Ticker?pair=XETHZEUR'],
	// ['kraken', 'ltceur', 'https://api.kraken.com/0/public/Ticker?pair=XLTCZEUR'],
	['spacebtc', 'btceur', 'https://tapi.spacebtc.com/ticker/BTC_EUR'],
  	['spacebtc', 'ltceur', 'https://tapi.spacebtc.com/ticker/LTC_EUR'],
 	['spacebtc', 'etheur', 'https://tapi.spacebtc.com/ticker/ETH_EUR'],
	['btce', 'ethusd', 'https://btc-e.com/api/3/ticker/eth_usd'],
	['btce', 'ltcusd', 'https://btc-e.com/api/3/ticker/ltc_usd'],
	['btce', 'btcusd', 'https://btc-e.com/api/3/ticker/btc_usd'],
	['btce', 'btceur', 'https://btc-e.com/api/3/ticker/btc_eur'],
	['exmo', 'btceur', 'https://api.exmo.com/v1/ticker'],
  	['exmo', 'btcusd', 'https://api.exmo.com/v1/ticker'],
  	['exmo', 'dashusd', 'https://api.exmo.com/v1/ticker'],
  	['exmo', 'ethusd', 'https://api.exmo.com/v1/ticker'],
	['therock', 'btceur', 'https://www.therocktrading.com/api/ticker/BTCEUR'],
	['therock', 'btcusd', 'https://www.therocktrading.com/api/ticker/BTCUSD'],
	['therock', 'ltceur', 'https://www.therocktrading.com/api/ticker/LTCEUR'],
	['therock', 'etheur', 'https://www.therocktrading.com/api/ticker/ETHEUR'],
	['coinmate', 'btceur', 'https://coinmate.io/api/ticker?currencyPair=BTC_EUR']
	// ['foxbit', 'btcbrl', 'https://api.blinktrade.com/api/v1/BRL/ticker'],
	// ['b2u', 'btcbrl', 'https://www.bitcointoyou.com/api/ticker.aspx'],
	// ['negcoins', 'btcbrl', 'http://www.negociecoins.com.br/api/v3/btcbrl/ticker'],
	// ['mbitcoin', 'btcbrl', 'https://www.mercadobitcoin.net/api/ticker/']
];



function getDatax(){
	urls.forEach(function(params){
		var xchg = params[0];
		var pair = params[1];
		var url = params[2];
			request( url, function (error, response, body){
				if (!error && response.statusCode == 200) {
					var toflat = JSON.parse(body);
					var data = flatten(toflat);
					var value = stdDatax(xchg, pair, data);
				}
			})
	})
}


function stdDatax(xchg, pair, data){

	if(xchg === 'livecoin'){
		var objID = xchg + pair;
		var curr = pair.slice(3, 6);
		myDB[objID] = {};
		myDB[objID]['xchg'] = xchg;
		myDB[objID]['pair'] = pair;
		switch(curr){
			case 'eur':
			myDB[objID]['bid'] =  data.best_bid;
			myDB[objID]['ask'] = data.best_ask;
			myDB[objID]['last'] = data.last;
			myDB[objID]['vol'] = data.volume;
			break;
			case 'usd':
			myDB[objID]['bid'] =  data.best_bid * toeur.usd;
			myDB[objID]['ask'] = data.best_ask * toeur.usd;
			myDB[objID]['last'] = data.last * toeur.usd;
			myDB[objID]['vol'] = data.volume * toeur.usd;
		}
	}
	if(xchg === 'therock'){
		var objID = xchg + pair;
		var curr = pair.slice(3, 6);
		myDB[objID] = {};
		myDB[objID]['xchg'] = xchg;
		myDB[objID]['pair'] = pair;
		switch(curr){
			case 'eur':
			myDB[objID]['bid'] =  data['result.0.bid'];
			myDB[objID]['ask'] = data['result.0.ask'];
			myDB[objID]['last'] = data['result.0.last'];
			myDB[objID]['vol'] = data['result.0.volume'];
			break;
			case 'usd':
			myDB[objID]['bid'] =  data['result.0.bid'] * toeur.usd;
			myDB[objID]['ask'] = data['result.0.ask'] * toeur.usd;
			myDB[objID]['last'] = data['result.0.last'] * toeur.usd;
			myDB[objID]['vol'] = data['result.0.volume'] * toeur.usd;
		}

	}
	if(xchg === 'spacebtc'){
		var objID = xchg + pair;
		var curr = pair.slice(3, 6);
		myDB[objID] = {};
		myDB[objID]['xchg'] = xchg;
		myDB[objID]['pair'] = pair;
		myDB[objID]['bid'] =  data['result.bid'];
		myDB[objID]['ask'] = data['result.ask'];
		myDB[objID]['last'] = data['result.last'];
		myDB[objID]['vol'] = data['result.daily_volume'];
	}
	if(xchg === 'coinmate'){
		var objID = xchg + pair;
		myDB[objID] = {};
		myDB[objID]['xchg'] = xchg;
		myDB[objID]['pair'] = pair;
		myDB[objID]['bid'] =  data['data.bid'];
		myDB[objID]['ask'] = data['data.ask'];
		myDB[objID]['last'] = data['data.last'];
		myDB[objID]['vol'] = data['data.amount'];
	}
	if(xchg === 'negcoins'){
		var objID = xchg + pair;
		myDB[objID] = {};
		myDB[objID]['xchg'] = xchg;
		myDB[objID]['pair'] = pair;
		myDB[objID]['bid'] =  data.buy  * toeur.brl;
		myDB[objID]['ask'] = data.sell * toeur.brl;
		myDB[objID]['last'] = data.last * toeur.brl;
		myDB[objID]['vol'] = data.vol * toeur.brl;
	}
	if(xchg === 'foxbit'){
		var objID = xchg + pair;
		myDB[objID] = {};
		myDB[objID]['xchg'] = xchg;
		myDB[objID]['pair'] = pair;
		myDB[objID]['bid'] =   data.buy * toeur.brl;
		myDB[objID]['ask'] =  data.sell * toeur.brl;
		myDB[objID]['last'] = data.last * toeur.brl;
		myDB[objID]['vol'] =  data.vol * toeur.brl;
	}
	if(xchg === 'b2u'){
		var objID = xchg + pair;
		myDB[objID] = {};
		myDB[objID]['xchg'] = xchg;
		myDB[objID]['pair'] = pair;
		myDB[objID]['bid'] =  data['ticker.buy'] * toeur.brl;
		myDB[objID]['ask'] = data['ticker.sell'] * toeur.brl;
		myDB[objID]['last'] = data['ticker.last'] * toeur.brl;
		myDB[objID]['vol'] = data['ticker.vol'] * toeur.brl;
	}
	if(xchg === 'mbitcoin'){
		var objID = xchg + pair;
		myDB[objID] = {};
		myDB[objID]['xchg'] = xchg;
		myDB[objID]['pair'] = pair;
		myDB[objID]['bid'] =  data['ticker.buy'] * toeur.brl;
		myDB[objID]['ask'] = data['ticker.sell'] * toeur.brl;
		myDB[objID]['last'] = data['ticker.last'] * toeur.brl;
		myDB[objID]['vol'] = data['ticker.vol'] * toeur.brl;
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
				myDB[objID]['bid'] =  data['btc_usd.sell'] * toeur.usd;
				myDB[objID]['ask'] =  data['btc_usd.buy'] * toeur.usd;
				myDB[objID]['last'] = data['btc_usd.last'] * toeur.usd;
				myDB[objID]['vol'] =  data['btc_usd.vol'] * toeur.usd;
				break;
			case 'ethusd' :
				myDB[objID]['bid'] =  data['eth_usd.sell'] * toeur.usd;
				myDB[objID]['ask'] =  data['eth_usd.buy'] * toeur.usd;
				myDB[objID]['last'] = data['eth_usd.last'] * toeur.usd;
				myDB[objID]['vol'] =  data['eth_usd.vol'] * toeur.usd;
				break;
			case 'ltcusd' :
				myDB[objID]['bid'] =  data['ltc_usd.sell'] * toeur.usd;
				myDB[objID]['ask'] =  data['ltc_usd.buy'] * toeur.usd;
				myDB[objID]['last'] = data['ltc_usd.last'] * toeur.usd;
				myDB[objID]['vol'] =  data['ltc_usd.vol'] * toeur.usd;
			}
	}
	if(xchg === 'exmo'){
		var objID = xchg + pair;
		myDB[objID] = {};
		myDB[objID]['xchg'] = xchg;
		myDB[objID]['pair'] = pair;
		switch (pair){
			case 'btceur' :
				myDB[objID]['bid'] =   data['BTC_EUR.buy_price'];
				myDB[objID]['ask'] =  data['BTC_EUR.sell_price'];
				myDB[objID]['last'] = data['BTC_EUR.last_trade'];
				myDB[objID]['vol'] =  data['BTC_EUR.vol'];
				break;
			case 'btcusd' :
				myDB[objID]['bid'] =  data['BTC_USD.buy_price'] * toeur.usd;
				myDB[objID]['ask'] =  data['BTC_USD.sell_price'] * toeur.usd;
				myDB[objID]['last'] = data['BTC_USD.last_trade'] * toeur.usd;
				myDB[objID]['vol'] =  data['BTC_USD.vol'] * toeur.usd;
				break;
			case 'ethusd' :
				myDB[objID]['bid'] =  data['ETH_USD.buy_price'] * toeur.usd;
				myDB[objID]['ask'] =  data['ETH_USD.sell_price'] * toeur.usd;
				myDB[objID]['last'] = data['ETH_USD.last_trade'] * toeur.usd;
				myDB[objID]['vol'] =  data['ETH_USD.vol'] * toeur.usd;
				break;
			case 'dashusd' :
				myDB[objID]['bid'] =  data['DASH_USD.buy_price'] * toeur.usd;
				myDB[objID]['ask'] =  data['DASH_USD.sell_price'] * toeur.usd;
				myDB[objID]['last'] = data['DASH_USD.last_trade'] * toeur.usd;
				myDB[objID]['vol'] =  data['DASH_USD.vol'] * toeur.usd;
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
			case 'etheur':
				myDB[objID]['bid'] =   data['result.XETHZEUR.b.0'];
				myDB[objID]['ask'] =  data['result.XETHZEUR.a.0'];
				myDB[objID]['last'] = data['result.XETHZEUR.c.0'];
				myDB[objID]['vol'] =  data['result.XETHZEUR.v.0'];
				break;
			case 'etceur':
				myDB[objID]['bid'] =   data['result.XETCZEUR.b.0'];
				myDB[objID]['ask'] =  data['result.XETCZEUR.a.0'];
				myDB[objID]['last'] = data['result.XETCZEUR.c.0'];
				myDB[objID]['vol'] =  data['result.XETCZEUR.v.0'];
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
var xmprofit = 0.01;
var xprofit = 0.01;


function comparex(){
	for (var objID in myDB) {
		var xchgvenda =  myDB[objID]['xchg'];
		var apair =  myDB[objID]['pair'];
		var acoin = apair.slice(0, 3);
		var ivenda  = myDB[objID]['bid'];
		var botvenda = myDB[objID]['ask'] * 0.9995;
		for (var objID in myDB) {
			if( myDB[objID]['xchg'] !== xchgvenda ){
				var xchgcompra =  myDB[objID]['xchg'];
				var bpair = myDB[objID]['pair'];
				var bcoin = bpair.slice(0, 3);
				var xpair = bpair.slice(3, 6);
				var pcompra =  myDB[objID]['ask'];
				if ( acoin === bcoin ) {
					var ilucro = (((ivenda * ( 1 - fees[xchgvenda].out))/(pcompra * (1 + fees[xchgcompra].in))) -1);
					var blucro = (((botvenda * ( 1 - fees[xchgvenda].out))/(pcompra * (1 + fees[xchgcompra].in))) -1);
					if (blucro > xprofit){
					console.log('Xbot : buy '+bpair+' @ '+pcompra+' @ '+xchgcompra+' sell '+apair+' @ '+botvenda+' @ '+xchgvenda+' @ '+(blucro*100)+'%. \n');
					}
					if(ilucro > xmprofit){
					console.log('XINSTANT  buy '+bpair+' @ '+pcompra+' @ '+xchgcompra+' sell '+apair+' @ '+ivenda+' @ '+xchgvenda+' @ '+(ilucro*100)+'%. \n');
					}
				}

			}

		}
		
	}

}


setImmediate(function start(){
	getRates();
	getDatax();
	setFees();
})


setInterval(function runGetData(){
	getDatax();
}, 5000)


setInterval(function runCompare(){
	comparex();
	console.log("\n\n\n\n\n\n\n\n\n");
}, 5000)


setInterval(function runGetRates(){
	getRates();
}, 3600000)

