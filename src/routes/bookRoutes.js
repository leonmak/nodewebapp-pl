var express = require('express');
var bookRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectId;

var router = function(nav){
  var bookService = require('../services/goodReadsService.js')();
  var bookController = require('../controllers/bookController.js')(bookService,nav);
  bookRouter.use(bookController.redirMiddleware);

  bookRouter.route('/')
  .get(bookController.getBooks);

  bookRouter.route('/:id')
  .get(bookController.getBooksById);
    return bookRouter;
  };

  module.exports = router;
