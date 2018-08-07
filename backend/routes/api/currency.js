const currency = require('../../src/api/currency');

module.exports = function (app) {
    app.get('/currency/:base', currency.getAllCurrency);
    app.post('/exchange', currency.getExchangeRate);
};

