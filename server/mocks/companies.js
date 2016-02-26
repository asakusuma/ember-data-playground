/*jshint node:true*/
var DATA = require('./../data');

var companies = DATA.getCompanies();

module.exports = function(app) {
  var express = require('express');
  var companiesRouter = express.Router();

  function getCompany(id) {
     return companies[id - 1];
  }

  function getCompanies() {
    return companies;
  }

  companiesRouter.get('/', function(req, res) {
    res.send({
      'data': getCompanies(),
      'meta': {
        copyright: 'LinkedIn',
        classification: 'Biznass'
      }
    });
  });

  companiesRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  companiesRouter.get('/:id', function(req, res) {
    res.send({
      'data': getCompany(req.params.id)
    });
  });

  companiesRouter.put('/:id', function(req, res) {
    res.send({
      'data': {
        id: req.params.id
      }
    });
  });

  companiesRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  // The POST and PUT call will not contain a request body
  // because the body-parser is not included by default.
  // To use req.body, run:

  //    npm install --save-dev body-parser

  // After installing, you need to `use` the body-parser for
  // this mock uncommenting the following line:
  //
  //app.use('/api/companies', require('body-parser').json());
  app.use('/api/companies', companiesRouter);
};
