var app = require('express')();
var http = require('http').Server(app);
var twitter=require('twitter');
var io=require('socket.io').listen(http);

app.get('/', function(req, res){
  res.sendFile(__dirname +'/index.html');
});
var port = process.env.PORT || 8080;
http.listen(port, function(){
  console.log('listening on *:3000');
});




var twit = new twitter({
		consumer_key: 'Q3tUStMkMKpsTmKkEaMbl7rvU',
		consumer_secret:'hCZUC0buyyQbcpw0BGOdZr2UwZVZP43N6KwQguNjQcvUQ07glx',
		access_token_key:'166204023-vWOcIupyzMAM7CBulIDLZSt1WyM06ZJ7UJEQpw5Q',
		access_token_secret:'uGTTuFLWlwcCTMtIyjTZxIZTcpGuLi5ayVPQEYQDW8l5A',




});	


twit.stream('statuses/filter',{track:'programador',language:'es'},function(stream) {
	
	stream.on('data',function (data) {
		
		io.emit('tweet',{
			user: data.user.screen_name,
			text: data.text,
			img:data.user.profile_image_url
			
		});
	});
	
});