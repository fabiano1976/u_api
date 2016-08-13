
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
  ['livecoin', 'btcrub', 'https://api.livecoin.net/exchange/ticker/?currencyPair=BTC/RUR']

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
          var value = JSON.stringify(stdData(xchg, pair, data));
          var myhash = xchg + pair;;
          //write to redis
          client.set(myhash, value);
          client.get(myhash, function (err, reply) {
            if (err) {
              throw err;
            }
          console.log(reply);

          var tdata = JSON.parse(reply);
          console.log(tdata.bid);

          });
        }
      })
  })




setTimeout( function stdData(xchg, pair, data){
	var start = new Date();
  if(xchg === 'livecoin'){
    var stdObj = {};
    stdObj.xchg = xchg;
    stdObj.pair = pair;
    stdObj.bid = data.best_bid;
    stdObj.ask = data.best_ask;
    stdObj.last = data.last;
    stdObj.vol = data.volume;
  }

return stdObj;


// execution time simulated with setTimeout function
    var end = new Date() - start;
    console.info("Execution time: %dms", end);

}, 1000);

