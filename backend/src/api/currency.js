const axios = require('axios');


module.exports = {
    getAllCurrency: getAllCurrency
};

function getAllCurrency(req, res, next) {
    const url = "https://exchangeratesapi.io/api/latest";
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

    });
}

function getDayRate(req, res, next) {
    const url = "https://exchangeratesapi.io/api/2010-01-12";
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

function getRateByCurrency(req, res, next) {
    const url = "https://exchangeratesapi.io/api/latest?base=USD";
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
    const url = "https://exchangeratesapi.io/api/latest?symbols=USD,GBP";
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

//setInterval(intervalFunc, 1500);