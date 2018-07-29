const currency = require('../../src/api/currency');

module.exports = function (app) {
    app.get('/currency', currency.getAllCurrency);
};

