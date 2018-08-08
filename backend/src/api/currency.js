const axios = require('axios');
const moment = require('moment');

module.exports = {
    getAllCurrency: getAllCurrency,
    getExchangeRate: getExchangeRate,
    getGraph: getGraph
};
function getAllCurrency(req, res, next) {
    let base = req.params.base;
    if (base === null)
        base = "EUR";
    const url = "https://exchangeratesapi.io/api/latest?base=" + base;
    axios.get(url).then(currency => {
        const rates = currency.data.rates;
        const base = currency.data.base;
        const date = currency.data.date;
        res.status(200)
            .json({
                base: base,
                date: date,
                rates: rates
            });
    }).catch(err => {
        res.status(404)
            .json({
                base: "",
                date: "",
                rates: {}
            });
    });
}

function getDayRate(req, res, next) {
    const base = req.param.base;
    const url = "https://exchangeratesapi.io/api/2010-01-12?base=" + base;
    axios.get(url).then(currency => {
        res.status(200)
            .json({
                base: currency.data.base,
                date: currency.data.date,
                currency: currency.data.rates
            });
    }).catch(err => {

    });
}

function getExchangeRate(req, res, next) {
    const base = req.body.base;
    const newBase = req.body.newbase;
    const amount = req.body.amount;
    const url = "https://exchangeratesapi.io/api/latest?base=" + base;
    axios.get(url).then(currency => {
        const rates = currency.data.rates;
        let result = amount;
        for (let elt in rates)
            if (elt === newBase)
                result = rates[newBase] * amount;
        res.status(200)
            .json({
                base: currency.data.base,
                newbase: newBase,
                date: currency.data.date,
                amount: amount,
                result: result
            });
    }).catch(err => {
    });
}

function getGraph(req, res, next) {
    const base = req.query.base;
    const newBase = req.query.newbase;
    const url = "https://exchangeratesapi.io/api/" + 2010-01-12 + "?base=" + base;
    axios.get(url).then(currency => {
        const rates = currency.data.rates;
        let result = 0;
        for (let elt in rates)
            if (elt === newBase)
                result = rates[newBase];
        res.status(200)
            .json({
                base: currency.data.base,
                date: currency.data.date,
                currency: currency.data.rates
            });
    }).catch(err => {

    });
    /**
     * last 7 days
     */
    const dateTo = moment().format('YYYY-DD-MM');
    for (let i = 1; i < 8; i++){
        const dateFrom = moment().subtract(i, 'd').format('YYYY-DD-MM');
    }

    /**
     * last 30 days
     */
    for (let i = 1; i < 31; i++){
        const dateFrom = moment().subtract(i, 'd').format('YYYY-DD-MM');
    }
    /**
     * last 12 months
     */
    for (let i = 1; i < 12; i++){
        const dateFrom = moment().subtract(i, 'months').format('YYYY-DD-MM');
    } 
    /**
     * last 10 years
     */ 
    for (let i = 1; i < 11; i++){
        const dateFrom = moment().subtract(i, 'year').format('YYYY-DD-MM');
    } 
    res.status(200);
}

//setInterval(intervalFunc, 1500);