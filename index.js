var http = require('http')
	, _ = require('underscore')
	, md5 = require('MD5')
	, querystring = require('querystring')
	, php = require('phpjs');

module.exports = function(app_id, app_secret){
	
	this.getLoginUrl = function(network, callback_url,scope){
		return 'https://api.soclall.com/login/'+network+'/?'+querystring.stringify({app_id: app_id,callback: callback_url,scope:scope});
	}
	
	this.getUser = function(token,callback){
		var params = {
			token: token,
		};
		
		doRequest('/user',params, callback);		
	}
	
	this.getFriends = function(token,callback){
		var params = {
			token: token,
		};
	
		doRequest('/friends',params, callback);
	}
	
	this.postStream = function(token,message,callback){
		var params = {
			token: token,
			message:message
		};
		
		doRequest('/publish',params, callback);	
	}
	
	this.sendMessage = function(token,message,friends,title,callback){
	
		if(!_.isArray(friends) || friends.length == 0)
			return callback && callback('Missing friends params');
	
		var params = {
			token: token,
			message: message,
			friend_id: friends.join(',')
		};

		if(_.isFunction(title))
			callback = title;
		else if(_.isString(title))
			params.title = title;
		
		doRequest('/message',params, callback);
	}
	
	function doRequest(path,params,callback){

		// TODO: build signature here!!!
		// var sig = signRequest(params, this.app_secret);
		// params.sig = sig;
		
		var sig = signRequest(path,params);
		params.sig = sig;		
		
		var queryParams = params ? querystring.stringify(params) : '';

		var headers = {
			'Content-Type': 'application/x-www-form-urlencoded',
		};
		var options = {
			host: 'api.soclall.com',
			path: path,
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
	
	function signRequest(path,data){
	
		var method;
		
		if(path == '/user')
			method = 'getuser';
		if(path == '/friends')
			method = 'getfriends';
		if(path == '/publish')
			method = 'poststream';
		if(path == '/message')
			method = 'sendmessage';
	
		data.method = method;
	
		data = php.ksort(data);
		
		var str_data = '';
		for(var key in data)
			str_data += key+'='+data[key];
	
		return md5(app_secret+str_data);
	}
}