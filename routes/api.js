'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  let convertHandler = new ConvertHandler();
  app.get('/api/convert', (req, res) => {
    return res.json(convertHandler.work(req.query.input))
  })

};
