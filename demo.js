var SoclAll = require('./index.js')
	,	soclall = new SoclAll('54c1cd605f0c9ea42e08109b','vYtnzekp68tlJcxwpRuq');

var login_url = soclall.getLoginUrl('twitter');
//console.log(login_url);
  soclall.sendMessage('twitter','d62dc30c67105c40eb847fc8dc19cae9','new message from node',['2775967850'],'',function(info){
  	
  });