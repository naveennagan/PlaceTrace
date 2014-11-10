var express=require('express');

var unirest=require('unirest');

var app=express();

app.set('port', process.env.PORT || 3070);

app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendfile('public/index.html');
});

app.get('/crawlFriendsData',function(req,res){
   var access_token='CAACEdEose0cBAHwjJ1NfiLZBZBVwF9YCMREoPZCXHUk3ZCLGJfmjLLZAqRn1gIKawTL80xWVk9QGkPeMGDpDGNxp7OFASQ8jkCx35bQ4XwpZCxnNZCiEvGY38yNi8t7lbH8pemqsE52VoPZB5RQPIA1nVKr6iN9EXvr8Gxw0C6QZCGDvyZCJAaHJAtj83URZA7HKmcdU6DI8hpGuLWXhCXyqVZAnubt2Uy2L81oZD';
   var url='https://graph.facebook.com/v1.0/me/friends';
   unirest.get(url)
  .query('access_token='+access_token)
  .end(function (response) {
    var jsonResponse=JSON.parse(response.body);
    var respData={"count":jsonResponse.data.length};
	res.send(respData);
  });
   
});

app.listen(app.get('port'), function(){

	console.log( 'Express started on http://localhost:' +

	app.get('port') + '; press Ctrl-C to terminate.' );

});
