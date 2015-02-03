var http = require('http')
	, _ = require('underscore')
	, md5 = require('MD5')
	, querystring = require('querystring')
	, php = require('phpjs');

module.exports = function(app_id, app_secret){
	
	this.app_id = app_id;
	this.app_secret = app_secret;
	
	this.getLoginUrl = function(network, callback_url){
		return 'https://api.soclall.com/login/'+network+'/?'+querystring.stringify({app_id: app_id,callback: callback_url});
	}
	
	this.getUser = function(token,callback){
		var params = {
			token: token,
			method: 'getuser'
		};
		
		doRequest(params, callback);		
	}
	
	this.getFriends = function(token,callback){
		var params = {
			token: token,
			method: 'getfriends'
		};
	
		doRequest(params, callback);
	}
	
	this.postStream = function(token,message,callback){
		var params = {
			token: token,
			method: 'poststream',
			message:message
		};
		
		doRequest(params, callback);	
	}
	
	this.sendMessage = function(token,message,friends,title,callback){
	
		if(!_.isArray(friends) || friends.length == 0)
			return callback && callback('Missing friends params');
	
		var params = {
			token: token,
			method: 'sendmessage',
			message: message,
			friend_id: friends.join(',')
		};

		if(_.isFunction(title))
			callback = title;
		else if(_.isString(title))
			params.title = title;
		
		doRequest(params, callback);
	}
	
	function doRequest(params,callback){

		// TODO: build signature here!!!
		// var sig = signRequest(params, this.app_secret);
		// params.sig = sig;
		
		var queryParams = params ? querystring.stringify(params) : '';

		var headers = {
			'Content-Type': 'application/x-www-form-urlencoded',
		};
		var options = {
			host: 'api.soclall.com',
			path: '/service',
			method: 'POST',
			headers: headers
		};
		var saRequest = http.request(options, function (response){
			var responseString = '';
			var error = null;
			
			response.on('data', function(data) {
				responseString += data;
			});
			
			response.on('error', function(err) {
				error = err;
			});
			
			response.on('end', function() {
				var resJson = {error: 'Invalid response'};

				// try to parse response to json
				try{ resJson = JSON.parse(responseString.trim());	}	catch(e){}

				callback && callback(error, resJson);
			});
		});
		saRequest.write(queryParams);			
		saRequest.end();
	}
	
	function signRequest(data){
		data = php.ksort(data);
		
		var str_data = '';
		for(var key in data)
			str_data += key+'='+data[key];
	
		return md5(this.app_secret+str_data);
	}
}