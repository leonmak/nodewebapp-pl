var express = require('express');
var authRouter = express.Router();

var passport = require('passport');
var mongodb = require('mongodb').MongoClient;

var router = function(){
  authRouter.route('/signUp')
  .post(function(req,res){
    console.log(req.body);
    var url = 'mongodb://localhost:27017/libraryApp';
    mongodb.connect(url, function(err,db){
      var collection = db.collection('users');
      var user = {username: req.body.userName, password: req.body.password};
      // normally will search if username taken
      collection.insert(user, function(err, results){
        req.login(results.ops[0], function(){
          res.redirect('/auth/profile');
        });
      });
    });
  });

  authRouter.route('/signIn')
  .post(passport.authenticate('local',{
    failureRedirect: '/' // if fails go back to /
  }), function(req,res){
    res.redirect('/auth/profile');
  });

  authRouter.route('/profile')
  .all(function(req,res,next){
    if(!req.user){
      res.redirect('/');
    }
    next();
  })
  .get(function(req,res){
    res.json(req.user);
  });



  return authRouter;
};

module.exports = router;
