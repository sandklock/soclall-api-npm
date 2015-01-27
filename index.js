var http = require('http');

module.exports = function SoclAll(app_id, app_secret){
	
	this.app_id = app_id;
	this.app_secret = app_secret;
	
	this.getLoginUrl = function(network){
		return 'http://api.soclall.com/login/'+network+'?app_id='+this.app_id;
	}
	
	this.getInfo = function(network,token,callback){
	
		//var url = this.service_url+'/'+network+'/getinfo?sk_token='+token;
		var url = '/service/'+network+'/getinfo?sk_token='+token;
		
		makeRequest(url,'',false,function(response){
			callback(response);
		});		
	}
	
	this.getFriends = function(network,token,callback){
		var url = '/service/'+network+'/getfriend?sk_token='+token;
	
		makeRequest(url,'',false,function(response){
			callback(response);
		});
	}
	
	this.postStream = function(network,token,message,callback){
	
		var params = {
			message:message
		};
		
		if(network == 'plurk')
			params.qualifier = 'shares';
		if(network == 'tumblr')
			params.type = 'text';
		if(network == 'linkedin')
			params.type = 'comment';

		//data = this.getDataToSign(network,'poststream',params);
		//sig = this.signRequest(data,this._app_secret);
	
		//url = this._service_url.'/'.this._network.'/poststream?sk_token='.this._sk_token.'&sig='.sig;
		var url = '/service/'+network+'/poststream?sk_token='+token;
		
		makeRequest(url,params,true,function(response){
			callback(response);
		});	
	
	}
	
	this.sendMessage = function(network,token,message,friends,title,callback){
	
		if(friends.constructor !== Array)
			return;
	
		var params = {
			friend_id: friends.join(','),
			message: message,
		};
	
		if(network == 'linkedin' || network == 'tumblr'){
			if(!title)
				return;
			params.title = title;
		}
		
		//data = this.getDataToSign(network,'sendmessage',params);
		//sig = this.signRequest(data,this._app_secret);
		
		//url = this._service_url.'/'.this._network.'/sendmessage?sk_token='.this._sk_token.'&sig='.sig;
		//url = this.service_url+'/'+network+'/sendmessage?sk_token='+token;
		var url = '/service'+'/'+network+'/sendmessage?sk_token='+token;
		
		makeRequest(url,params,true,function(response){
			callback(response);
		});
	}
	
	function getDataToSign(network,method,params){
		var data = {
			network: network,
			sk_token: token,
			method: method,
		};
		
		if(params){
			var result = {};
			for(var key in data) result[key]=data[key];
			for(var key in params) result[key]=params[key];
		}
		
		return result;
	}
	
	function makeRequest(url,params,post,callback){
		
		if(post){
		
			if(!params)
				return;
		
			queryParams = buildQueryParams(params);
		
			var headers = {
				'Content-Type': 'application/x-www-form-urlencoded',
			};
			var options = {
				host: 'api.soclall.com',
				path: url,
				method: 'POST',
				headers: headers,
			};
			
			var saRequest = http.request(options, function (response){
				var responseString = '';
				
				response.on('data', function(data) {
					responseString += data;
				});
				
				response.on('error', function(e) {
					return callback && callback(e.message);
				});
				
				response.on('end', function() {
					return callback && callback(JSON.parse(responseString));
				});
				
			});
			saRequest.write(queryParams);			
			saRequest.end();
		
			/*_request.post({url:url, form:params}, function(err,httpResponse,body){
				
				if(err) return callback && callback(err);
				
				if (!err && httpResponse.statusCode == 200)
					return callback && callback(err,JSON.parse(body));
					
			});*/
		}
		else{
		
			var headers = {
				'Content-Type': 'application/x-www-form-urlencoded',
			};
			var options = {
				host: 'api.soclall.com',
				path: url,
				method: 'GET',
				headers: headers
			};

			var saRequest = http.request(options, function (response){
				var responseString = '';
				
				response.on('data', function(data) {
					responseString += data;
				});
				
				response.on('error', function(e) {
					return callback && callback(e.message);
				});
				
				response.on('end', function() {
					return callback && callback(JSON.parse(responseString));
				});
			});
			saRequest.end();
		}
	}
	
	function signRequest(data){
	
		data = ksort(data);
		
		str_data = '';
		
		for(var key in data)
			str_data += key+'='+data[key];
	
		return md5(this.app_secret+str_data);
	}
	
	var md5=(function(){function e(e,t){var o=e[0],u=e[1],a=e[2],f=e[3];o=n(o,u,a,f,t[0],7,-680876936);f=n(f,o,u,a,t[1],
12,-389564586);a=n(a,f,o,u,t[2],17,606105819);u=n(u,a,f,o,t[3],22,-1044525330);o=n(o,u,a,f,t[4],7,-176418897);f=n(f,o,u,a,t[5],
12,1200080426);a=n(a,f,o,u,t[6],17,-1473231341);u=n(u,a,f,o,t[7],22,-45705983);o=n(o,u,a,f,t[8],7,1770035416);f=n(f,o,u,a,t[9],
12,-1958414417);a=n(a,f,o,u,t[10],17,-42063);u=n(u,a,f,o,t[11],22,-1990404162);o=n(o,u,a,f,t[12],7,1804603682);f=n(f,o,u,a,t[13],
12,-40341101);a=n(a,f,o,u,t[14],17,-1502002290);u=n(u,a,f,o,t[15],22,1236535329);o=r(o,u,a,f,t[1],5,-165796510);f=r(f,o,u,a,t[6],
9,-1069501632);a=r(a,f,o,u,t[11],14,643717713);u=r(u,a,f,o,t[0],20,-373897302);o=r(o,u,a,f,t[5],5,-701558691);f=r(f,o,u,a,t[10],
9,38016083);a=r(a,f,o,u,t[15],14,-660478335);u=r(u,a,f,o,t[4],20,-405537848);o=r(o,u,a,f,t[9],5,568446438);f=r(f,o,u,a,t[14],
9,-1019803690);a=r(a,f,o,u,t[3],14,-187363961);u=r(u,a,f,o,t[8],20,1163531501);o=r(o,u,a,f,t[13],5,-1444681467);f=r(f,o,u,a,t[2],
9,-51403784);a=r(a,f,o,u,t[7],14,1735328473);u=r(u,a,f,o,t[12],20,-1926607734);o=i(o,u,a,f,t[5],4,-378558);f=i(f,o,u,a,t[8],
11,-2022574463);a=i(a,f,o,u,t[11],16,1839030562);u=i(u,a,f,o,t[14],23,-35309556);o=i(o,u,a,f,t[1],4,-1530992060);f=i(f,o,u,a,t[4],
11,1272893353);a=i(a,f,o,u,t[7],16,-155497632);u=i(u,a,f,o,t[10],23,-1094730640);o=i(o,u,a,f,t[13],4,681279174);f=i(f,o,u,a,t[0],
11,-358537222);a=i(a,f,o,u,t[3],16,-722521979);u=i(u,a,f,o,t[6],23,76029189);o=i(o,u,a,f,t[9],4,-640364487);f=i(f,o,u,a,t[12],
11,-421815835);a=i(a,f,o,u,t[15],16,530742520);u=i(u,a,f,o,t[2],23,-995338651);o=s(o,u,a,f,t[0],6,-198630844);f=s(f,o,u,a,t[7],
10,1126891415);a=s(a,f,o,u,t[14],15,-1416354905);u=s(u,a,f,o,t[5],21,-57434055);o=s(o,u,a,f,t[12],6,1700485571);f=s(f,o,u,a,t[3],
10,-1894986606);a=s(a,f,o,u,t[10],15,-1051523);u=s(u,a,f,o,t[1],21,-2054922799);o=s(o,u,a,f,t[8],6,1873313359);f=s(f,o,u,a,t[15],
10,-30611744);a=s(a,f,o,u,t[6],15,-1560198380);u=s(u,a,f,o,t[13],21,1309151649);o=s(o,u,a,f,t[4],6,-145523070);f=s(f,o,u,a,t[11],
10,-1120210379);a=s(a,f,o,u,t[2],15,718787259);u=s(u,a,f,o,t[9],21,-343485551);e[0]=m(o,e[0]);e[1]=m(u,e[1]);e[2]=m(a,e[2]);e[3]=m(f,e[3])}
function t(e,t,n,r,i,s){t=m(m(t,e),m(r,s));return m(t<<i|t>>>32-i,n)}function n(e,n,r,i,s,o,u){return t(n&r|~n&i,e,n,s,o,u)}
function r(e,n,r,i,s,o,u){return t(n&i|r&~i,e,n,s,o,u)}function i(e,n,r,i,s,o,u){return t(n^r^i,e,n,s,o,u)}
function s(e,n,r,i,s,o,u){return t(r^(n|~i),e,n,s,o,u)}function o(t){var n=t.length,r=[1732584193,-271733879,-1732584194,271733878],i;
for(i=64;i<=t.length;i+=64){e(r,u(t.substring(i-64,i)))}t=t.substring(i-64);var s=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
for(i=0;i<t.length;i++)s[i>>2]|=t.charCodeAt(i)<<(i%4<<3);s[i>>2]|=128<<(i%4<<3);if(i>55){e(r,s);for(i=0;i<16;i++)s[i]=0}s[14]=n*8;e(r,s);return r}
function u(e){var t=[],n;for(n=0;n<64;n+=4){t[n>>2]=e.charCodeAt(n)+(e.charCodeAt(n+1)<<8)+(e.charCodeAt(n+2)<<16)+(e.charCodeAt(n+3)<<24)}return t}
function c(e){var t="",n=0;for(;n<4;n++)t+=a[e>>n*8+4&15]+a[e>>n*8&15];return t}
function h(e){for(var t=0;t<e.length;t++)e[t]=c(e[t]);return e.join("")}
function d(e){return h(o(unescape(encodeURIComponent(e))))}
function m(e,t){return e+t&4294967295}var a="0123456789abcdef".split("");return d})();
	
	function ksort(inputArr, sort_flags) {
		 //  discuss at: http://phpjs.org/functions/ksort/
		  // original by: GeekFG (http://geekfg.blogspot.com)
		  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
		  // improved by: Brett Zamir (http://brett-zamir.me)

		var tmp_arr = {},
		keys = [],
		sorter, i, k, that = this,
		strictForIn = false,
		populateArr = {};

		switch (sort_flags) {
			case 'SORT_STRING':
			// compare items as strings
			sorter = function(a, b) {
				return that.strnatcmp(a, b);
			};
			break;
			case 'SORT_LOCALE_STRING':
			// compare items as strings, original by the current locale (set with  i18n_loc_set_default() as of PHP6)
			var loc = this.i18n_loc_get_default();
			sorter = this.php_js.i18nLocales[loc].sorting;
			break;
			case 'SORT_NUMERIC':
			// compare items numerically
			sorter = function(a, b) {
			return ((a + 0) - (b + 0));
			};
			break;
			// case 'SORT_REGULAR': // compare items normally (don't change types)
			default:
			sorter = function(a, b) {
				var aFloat = parseFloat(a),
				  bFloat = parseFloat(b),
				  aNumeric = aFloat + '' === a,
				  bNumeric = bFloat + '' === b;
				if (aNumeric && bNumeric) {
				  return aFloat > bFloat ? 1 : aFloat < bFloat ? -1 : 0;
				} else if (aNumeric && !bNumeric) {
				  return 1;
				} else if (!aNumeric && bNumeric) {
				  return -1;
				}
				return a > b ? 1 : a < b ? -1 : 0;
			};
			break;
		}

		// Make a list of key names
		for (k in inputArr) {
			if (inputArr.hasOwnProperty(k)) {
				keys.push(k);
			}
		}
		keys.sort(sorter);

		// BEGIN REDUNDANT
		this.php_js = this.php_js || {};
		this.php_js.ini = this.php_js.ini || {};
		// END REDUNDANT
		strictForIn = this.php_js.ini['phpjs.strictForIn'] && this.php_js.ini['phpjs.strictForIn'].local_value && this.php_js
		.ini['phpjs.strictForIn'].local_value !== 'off';
		populateArr = strictForIn ? inputArr : populateArr;

		// Rebuild array with sorted key names
		for (i = 0; i < keys.length; i++) {
			k = keys[i];
			tmp_arr[k] = inputArr[k];
			if (strictForIn) {
				delete inputArr[k];
			}
		}
		for (i in tmp_arr) {
			if (tmp_arr.hasOwnProperty(i)) {
				populateArr[i] = tmp_arr[i];
			}
		}

		return strictForIn || populateArr;
	}

	// Copyright Joyent, Inc. and other Node contributors.
	
	function stringifyPrimitive(v){
	  switch (typeof v) {
		case 'string':
		  return v;

		case 'boolean':
		  return v ? 'true' : 'false';

		case 'number':
		  return isFinite(v) ? v : '';

		default:
		  return '';
	  }
	};

	function buildQueryParams(obj, sep, eq, name) {
	  sep = sep || '&';
	  eq = eq || '=';
	  if (obj === null) {
		obj = undefined;
	  }

	  if (typeof obj === 'object') {
		return Object.keys(obj).map(function(k) {
		  var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
		  if (Array.isArray(obj[k])) {
			return obj[k].map(function(v) {
			  return ks + encodeURIComponent(stringifyPrimitive(v));
			}).join(sep);
		  } else {
			return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
		  }
		}).join(sep);

	  }

	  if (!name) return '';
	  return encodeURIComponent(stringifyPrimitive(name)) + eq +
			 encodeURIComponent(stringifyPrimitive(obj));
	}
	
}

