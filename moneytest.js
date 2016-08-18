var oxr = require('open-exchange-rates');
var fx = require('money');
var toeur = {}; 

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

    console.log(toeur);

    var value = 1800 * toeur.brl;

    console.log(value);
});
