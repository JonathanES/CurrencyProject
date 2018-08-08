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

function graphWeek(today, base, exchange) {
    /**
    * last 7 days
    */
    return new Promise((resolve, reject) => {
        let count = 0;
        const result = [];
        for (let i = 0; i < 7; i++) {
            let dateFrom = moment().subtract(i, 'd').format('YYYY-MM-DD');
            const url = "https://exchangeratesapi.io/api/" + dateFrom + "?base=" + base;
            axios.get(url).then(currency => {
                const rates = currency.data.rates;
                for (let elt in rates)
                    if (elt === exchange) {
                        dateFrom = moment().subtract(i, 'd').format('DD/MM');
                        result.push({ date: dateFrom, base: base, exchange: exchange, rate: rates[exchange] });
                        count++;
                        if (count === 7) {
                            result.sort((a, b) => {
                                return new Date(a.date) - new Date(b.date);
                            });
                            resolve(result);
                        }
                    }
            }).catch(err => {
                console.log(err);
            });
        }
    });
}

function graphMonth(today, base, exchange) {
    /**
        * last 30 days
        */
    return new Promise((resolve, reject) => {
        let count = 0;
        const result = [];
        for (let i = 0; i < 30; i++) {
            let dateFrom = moment().subtract(i, 'd').format('YYYY-MM-DD');
            const url = "https://exchangeratesapi.io/api/" + dateFrom + "?base=" + base;
            axios.get(url).then(currency => {
                const rates = currency.data.rates;
                for (let elt in rates)
                    if (elt === exchange) {
                        dateFrom = moment().subtract(i, 'd').format('DD/MM');
                        result.push({ date: dateFrom, base: base, exchange: exchange, rate: rates[exchange] });
                        count++;
                        if (count === 30) {
                            result.sort((a, b) => {
                                return new Date(a.date) - new Date(b.date);
                            });
                            resolve(result);
                        }
                    }
            }).catch(err => {
                console.log(err);
            });
        }
    });
}

function graphYear(today, base, exchange) {
    /**
         * last 12 months
         */
    return new Promise((resolve, reject) => {
        let count = 0;
        const result = [];
        for (let i = 0; i < 12; i++) {
            let dateFrom = moment().subtract(i, 'months').format('YYYY-MM-DD');
            const url = "https://exchangeratesapi.io/api/" + dateFrom + "?base=" + base;
            axios.get(url).then(currency => {
                const rates = currency.data.rates;
                dateFrom = moment().subtract(i, 'months').format('MM');
                for (let elt in rates)
                    if (elt === exchange) {
                        result.push({ date: dateFrom, base: base, exchange: exchange, rate: rates[exchange] });
                        count++;
                        if (count === 12) {
                            result.sort((a, b) => {
                                return new Date(a.date) - new Date(b.date);
                            });
                            resolve(result);
                        }
                    }
            }).catch(err => {
                console.log(err);
            });
        }
    });
}

function graphYears(today, base, exchange) {
    /**
         * last 10 years
         */
    return new Promise((resolve, reject) => {
        let count = 0;
        const result = [];
        for (let i = 0; i < 10; i++) {
            let dateFrom = moment().subtract(i, 'year').format('YYYY-MM-DD');
            const url = "https://exchangeratesapi.io/api/" + dateFrom + "?base=" + base;
            axios.get(url).then(currency => {
                const rates = currency.data.rates;
                dateFrom = moment().subtract(i, 'year').format('YYYY');
                for (let elt in rates)
                    if (elt === exchange) {
                        result.push({ date: dateFrom, base: base, exchange: exchange, rate: rates[exchange] });
                        count++;
                        if (count === 10) {
                            result.sort((a, b) => {
                                return new Date(a.date) - new Date(b.date);
                            });
                            resolve(result);
                        }
                    }
            }).catch(err => {
                console.log(err);
            });
        }
    });
}

function getGraph(req, res, next) {
    const base = req.query.base;
    const exchange = req.query.exchange;
    const today = moment(new Date()).format('YYYY-MM-DD');
    const week = graphWeek(today, base, exchange);
    const month = graphMonth(today, base, exchange);
    const year = graphYear(today, base, exchange);
    const years = graphYears(today, base, exchange);
    Promise.all([week, month, year, years]).then(values => {
        console.log(values);
        res.status(200).json({
            week: values[0],
            month: values[1],
            year: values[2],
            years: values[3]
        });
    });
}

//setInterval(intervalFunc, 1500);