var fiat = " eur usd brl cny ars cad gbp jpy rub ";
var fiax = " eux usx brx cnx arsx cax gbx jpx rux ";
var fiaz =  fiat.concat(fiax);


var pair = "btceur";
var paix = "btceax";

var sstr = paix.slice(0, 3);

if(fiaz.indexOf(sstr) > -1){
	console.log(sstr +' present');
}else{
	console.log(sstr +' not present');
}

