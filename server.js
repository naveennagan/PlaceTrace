var express=require('express');

var unirest=require('unirest');

var app=express();

var Q=require('q');

var mongo=require('mongoose');

var config=require('./config/config.js').settings;

var mongoDbUrl=config.mongodburl;

var access_token='CAACEdEose0cBAN8Cpn2xjYWsRndrfkUumCjfevamZANOdstLV7hjY3dgHZCGjAJv7FLbZAjzr3WcWJYVqiNMwZBnAXCyxvcW8KBZC2KCkYxoTqZCQ6xZBbDi2QEFUemWIECAIu5NkO0yXZAZCiJZB8dbZCfHA0yGZBxSRhCKVKxZBni6fAno0ZCout9qjPZCfBHs3mxmLYD7mWIJ07NdZBxrrCQ99ZBoyg01GyOPZCaTAZD';

var mongoose=mongo.connect(mongoDbUrl, function (error) {
    if (error) {
       console.log(error);
    }
});

var Schema=mongoose.Schema;
var PlacesListSchema=new Schema({
	username: String,
	places: Number
});

var PlacesListModel = mongoose.model('PlaceList', PlacesListSchema);

app.set('port', process.env.PORT || 3070);

app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendfile('public/index.html');
});

app.get('/test', function(req, res){
  res.sendfile('public/test.html');
});

app.get('/crawlFriendsData',function(req,res){   
   var url='https://graph.facebook.com/v1.0/me/friends';
   unirest.get(url)
  .query('access_token='+access_token)
  .end(function (response) {
    var jsonResponse=JSON.parse(response.body).data;	
    var friendsResult=[];
	populateAllFriendsData(jsonResponse,friendsResult).then(function(){
	  //console.log(friendsResult);
	  var respData={"count":jsonResponse.length,"result":friendsResult};
	  res.send(respData);
	});
  });
   
});



app.listen(app.get('port'), function(){

	console.log( 'Express started on http://localhost:' +

	app.get('port') + '; press Ctrl-C to terminate.' );

});

//All utility functions which are later to be written in separate files

function populateAllFriendsData(friends,friendsResult) {
    
    var the_promises = [];
    friends.forEach(function(friend) {
        var deferred = Q.defer();
		var url="https://graph.facebook.com/v1.0/"+friend.id+"/locations";
		unirest.get(url)
	   .query('access_token='+access_token)
	   .end(function(response){
	      var jsonResponse=JSON.parse(response.body);
		  var locsVisited=jsonResponse.data.length;
		  friendsResult.push({"name":friend.name,'locations':locsVisited});
		  deferred.resolve();
	   });		
       the_promises.push(deferred.promise);
    });
    return Q.all(the_promises);
}








