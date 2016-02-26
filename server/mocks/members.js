/*jshint node:true*/
var DATA = require('./../data');

var members = DATA.getMembers();

module.exports = function(app) {
  var express = require('express');
  var membersRouter = express.Router();

  function getMember(id) {
     return members[id - 1];
  }

  function getMembers() {
    return members;
  }

  membersRouter.get('/', function(req, res) {
    res.send({
      'data': getMembers(),
      'meta': {
        membercount: 50
      }
    });
  });

  membersRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  membersRouter.get('/:id', function(req, res) {
    res.send({
      'data': getMember(req.params.id)
    });
  });

  membersRouter.put('/:id', function(req, res) {
    res.send({
      'data': {
        id: req.params.id
      }
    });
  });

  membersRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  // The POST and PUT call will not contain a request body
  // because the body-parser is not included by default.
  // To use req.body, run:

  //    npm install --save-dev body-parser

  // After installing, you need to `use` the body-parser for
  // this mock uncommenting the following line:
  //
  //app.use('/api/members', require('body-parser').json());
  app.use('/api/members', membersRouter);
};
