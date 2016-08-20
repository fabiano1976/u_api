
// xchngfees ['name', deposit, withdraw]
xchngfees = [
	['btce', 0.01, 0.01],
	['livecoin', 0.015, 0.005],
	['therock', 0, 0],
	['spacebtc', 0.015, 0.015],
	['kra']


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

setFees();