var request = require('request');
var flatten = require('flat');


//Redis connection
var redis = require('redis');
var client = redis.createClient('//redis-18112.c8.us-east-1-3.ec2.cloud.redislabs.com:18112', {no_ready_check: true});
client.auth('1234', function (err) {
    if (err){
      throw err;
    };
});

client.on('connect', function() {
    console.log('Connected to Redis');
});

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
  ['btce', 'btcusd', 'https://btc-e.com/api/3/ticker/btc_usd'],
  ['btce', 'btceur', 'https://btc-e.com/api/3/ticker/btc_eur'],
  ['btce', 'btcrub', 'https://btc-e.com/api/3/ticker/btc_rur']

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
    var myhash = xchg + pair;
    client.hset(myhash, "bid", data.best_bid);
    client.hset(myhash, "ask", data.best_ask);
    client.hset(myhash, "last", data.last);
    client.hset(myhash, "vol", data.volume);
  }

  if(xchg === 'btce'){
    var myhash = xchg + pair;
    switch (pair){
      case 'btceur' :
        client.hset(myhash, "bid", data['btc_eur.sell']);
        client.hset(myhash, "ask", data['btc_eur.buy']);
        client.hset(myhash, "last", data['btc_eur.last']);
        client.hset(myhash, "vol", data['btc_eur.vol']);
        break;
      case 'btcusd' :
        client.hset(myhash, "bid", data['btc_usd.sell']);
        client.hset(myhash, "ask", data['btc_usd.buy']);
        client.hset(myhash, "last", data['btc_usd.last']);
        client.hset(myhash, "vol", data['btc_usd.vol']);
        break;
      case 'btcrub' :
        client.hset(myhash, "bid", data['btc_rur.sell']);
        client.hset(myhash, "ask", data['btc_rur.buy']);
        client.hset(myhash, "last", data['btc_rur.last']);
        client.hset(myhash, "vol", data['btc_rur.vol']);
        break;
      case 'ethusd' :
        client.hset(myhash, "bid", data['eth_usd.sell']);
        client.hset(myhash, "ask", data['eth_usd.buy']);
        client.hset(myhash, "last", data['eth_usd.last']);
        client.hset(myhash, "vol", data['eth_usd.vol']);
        break;
      case 'ethbtc' :
        client.hset(myhash, "bid", data['eth_btc.sell']);
        client.hset(myhash, "ask", data['eth_btc.buy']);
        client.hset(myhash, "last", data['eth_btc.last']);
        client.hset(myhash, "vol", data['eth_btc.vol']);
        break;
      case 'ethltc' :
        client.hset(myhash, "bid", data['eth_ltc.sell']);
        client.hset(myhash, "ask", data['eth_ltc.buy']);
        client.hset(myhash, "last", data['eth_ltc.last']);
        client.hset(myhash, "vol", data['eth_ltc.vol']);
        break;
      case 'ltcbtc' :
        client.hset(myhash, "bid", data['ltc_btc.sell']);
        client.hset(myhash, "ask", data['ltc_btc.buy']);
        client.hset(myhash, "last", data['ltc_btc.last']);
        client.hset(myhash, "vol", data['ltc_btc.vol']);
        break;
      case 'ltcusd' :
        client.hset(myhash, "bid", data['ltc_usd.sell']);
        client.hset(myhash, "ask", data['ltc_usd.buy']);
        client.hset(myhash, "last", data['ltc_usd.last']);
        client.hset(myhash, "vol", data['ltc_usd.vol']);
        break;
      case 'ppcusd' :
        client.hset(myhash, "bid", data['ppc_usd.sell']);
        client.hset(myhash, "ask", data['ppc_usd.buy']);
        client.hset(myhash, "last", data['ppc_usd.last']);
        client.hset(myhash, "vol", data['ppc_usd.vol']);
        break;
      case 'nmcusd' :
        client.hset(myhash, "bid", data['nmc_usd.sell']);
        client.hset(myhash, "ask", data['nmc_usd.buy']);
        client.hset(myhash, "last", data['nmc_usd.last']);
        client.hset(myhash, "vol", data['nmc_usd.vol']);

    }
  }

          client.hgetall(myhash, function (err, reply) {
            if (err) {
              throw err;
            }
          console.log(reply);
          })



}

setInterval(function run(){
  getData();
}, 1000)




