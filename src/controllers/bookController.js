var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectId;

var bookController = function(bookService, nav){
  // revealing module pattern - return functions in object
  var getBooks = function(req,res){

    var url = 'mongodb://localhost:27017/libraryApp';
    mongodb.connect(url, function(err,db){

      var collection = db.collection('books');
      collection.find({}).toArray(function(err, results){
        res.render('bookListView', {
          title : 'ALL BOOKS',
          nav : nav,
          books : results
        });
      });
    });
  };

  var getBooksById = function(req,res){
    var id = objectId(req.params.id);

    var url = 'mongodb://localhost:27017/libraryApp';
    mongodb.connect(url, function(err,db){
      var collection = db.collection('books');
      collection.findOne({_id:id},
        function(err,results){
          if (results.bookId) {

            bookService.getGRBookById(results.bookId,
              function(err,book){
                results.book = book;
                res.render('bookView',{
                  title: 'Book',
                  nav : nav,
                  book: results
                });
              });
            } else {
              res.render('bookView',{
                title: 'Book',
                nav : nav,
                book: results
              });
            }
          });
        });
      };

      var redirMiddleware = function(req,res,next){
        // if(!req.user){
        //   res.redirect('/');
        // }
        next();
      };

      return {
        getBooks: getBooks,
        getBooksById: getBooksById,
        redirMiddleware: redirMiddleware
      };

    };

    module.exports= bookController;
