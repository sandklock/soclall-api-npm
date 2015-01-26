var SoclAll = require('./soclall.js');
var soclall = new SoclAll('2','fdg43967fdhk');
var http = require('http');

http.createServer(function (req, res) {

  res.writeHead(200, {'Content-Type': 'text/plain'});
  
  //var login_url = soclall.getLoginUrl('twitter');
  
	//soclall.sendMessage('twitter','d62dc30c67105c40eb847fc8dc19cae9','new message from node',['2775967850'],'',function(info){
		
		var output = '------ Testing SA lib -------';
  
		output += JSON.stringify(info);
		
		res.end(output);
  });
  

  
  
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');