var http = require('http');
var xml2js = require('xml2js');
var parser = xml2js.Parser({explicitArray: false});

var goodReadsService = function(){
  var getGRBookById = function(id, cb){

    var options = {
      host: 'www.goodreads.com',
      path: '/book/show/656?format=xml&key=rPAAwbHP6hamN3R4k5nMQ'
    };

    var callback = function(response){
      var str = '';
      response.on('data', function(chunk){
        str += chunk;
      });
      response.on('end', function(){
        parser.parseString(str, function(err, result){
          cb(null, result.GoodreadsResponse.book);
          console.log(result);
        });
      });
    };

    http.request(options,callback).end();
  };
  return {getGRBookById: getGRBookById};
};

module.exports = goodReadsService;
