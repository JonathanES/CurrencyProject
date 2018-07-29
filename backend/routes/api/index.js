const api =require('express').Router();

const currency = require('./currency')(api);

module.exports = api;