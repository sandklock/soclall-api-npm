var http = require('http');

module.exports = function SoclAll(app_id, app_secret){
	
	this.app_id = app_id;
	this.app_secret = app_secret;
	
	this.getLoginUrl = function(network){
		return 'http://api.soclall.com/login/'+network+'?app_id='+this.app_id;
	}
	
	this.getInfo = function(network,token,callback){
		var params = {
			network: network,
			sk_token: token,
			method: 'getinfo'
		};
		
		makeRequest(params,function(response){
			callback && callback(null, response);
		});		
	}
	
	this.getFriends = function(network,token,callback){
		var params = {
			network: network,
			sk_token: token,
			method: 'getfriend'
		};
	
		makeRequest(params,function(response){
			callback && callback(null, response);
		});
	}
	
	this.postStream = function(network,token,message,callback){
		var params = {
			network: network,
			method: 'poststream',
			sk_token: token,
			message:message
		};
		
		if(network == 'plurk')
			params.qualifier = 'shares';
		if(network == 'tumblr')
			params.type = 'text';
		if(network == 'linkedin')
			params.type = 'comment';
		
		makeRequest(params,function(response){
			callback && callback(null, response);
		});	
	
	}
	
	this.sendMessage = function(network,token,message,friends,title,callback){
	
		if(friends.constructor !== Array)
			callback && callback('Missing params');
	
		var params = {
			network: network,
			method: 'sendmessage',
			sk_token: token,
			friend_id: friends.join(','),
			message: message
		};

		if(title) params.title = title;
		
		makeRequest(params,function(response){
			callback && callback(null, response);
		});
	}
	
	function makeRequest(params,callback){

		// TODO: build signature here!!!
		// sig = this.signRequest(params,this.app_secret);
		// params.sig = sig;
		
		var queryParams = params ? buildQueryParams(params) : '';
	
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
			var isErr = false;
			
			response.on('data', function(data) {
				responseString += data;
			});
			
			response.on('error', function(err) {
				isErr = true;
				callback && callback(err);
			});
			
			response.on('end', function() {
				console.log(responseString)
				if(!isErr)
					callback && callback(null, JSON.parse(responseString));
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
	
	function signRequest(data){
	
		data = ksort(data);
		
		var str_data = '';
		
		for(var key in data)
			str_data += key+'='+data[key];
	
		return md5(this.app_secret+str_data);
	}
	
	// Opensrc libs
var md5=function(){function n(f,e){var d=f[0],a=f[1],b=f[2],c=f[3],d=k(d,a,b,c,e[0],7,-680876936),c=k(c,d,a,b,e[1],12,-389564586),b=k(b,c,d,a,e[2],17,606105819),a=k(a,b,c,d,e[3],22,-1044525330),d=k(d,a,b,c,e[4],7,-176418897),c=k(c,d,a,b,e[5],12,1200080426),b=k(b,c,d,a,e[6],17,-1473231341),a=k(a,b,c,d,e[7],22,-45705983),d=k(d,a,b,c,e[8],7,1770035416),c=k(c,d,a,b,e[9],12,-1958414417),b=k(b,c,d,a,e[10],17,-42063),a=k(a,b,c,d,e[11],22,-1990404162),d=k(d,a,b,c,e[12],7,1804603682),c=k(c,d,a,b,e[13],12,-40341101),b=k(b,c,d,a,e[14],17,-1502002290),a=k(a,b,c,d,e[15],22,1236535329),d=l(d,a,b,c,e[1],5,-165796510),c=l(c,d,a,b,e[6],9,-1069501632),b=l(b,c,d,a,e[11],14,643717713),a=l(a,b,c,d,e[0],20,-373897302),d=l(d,a,b,c,e[5],5,-701558691),c=l(c,d,a,b,e[10],9,38016083),b=l(b,c,d,a,e[15],14,-660478335),a=l(a,b,c,d,e[4],20,-405537848),d=l(d,a,b,c,e[9],5,568446438),c=l(c,d,a,b,e[14],9,-1019803690),b=l(b,c,d,a,e[3],14,-187363961),a=l(a,b,c,d,e[8],20,1163531501),d=l(d,a,b,c,e[13],5,-1444681467),c=l(c,d,a,b,e[2],9,-51403784),b=l(b,c,d,a,e[7],14,1735328473),a=l(a,b,c,d,e[12],20,-1926607734),d=h(a^b^c,d,a,e[5],4,-378558),c=h(d^a^b,c,d,e[8],11,-2022574463),b=h(c^d^a,b,c,e[11],16,1839030562),a=h(b^c^d,a,b,e[14],23,-35309556),d=h(a^b^c,d,a,e[1],4,-1530992060),c=h(d^a^b,c,d,e[4],11,1272893353),b=h(c^d^a,b,c,e[7],16,-155497632),a=h(b^c^d,a,b,e[10],23,-1094730640),d=h(a^b^c,d,a,e[13],4,681279174),c=h(d^a^b,c,d,e[0],11,-358537222),b=h(c^d^a,b,c,e[3],16,-722521979),a=h(b^c^d,a,b,e[6],23,76029189),d=h(a^b^c,d,a,e[9],4,-640364487),c=h(d^a^b,c,d,e[12],11,-421815835),b=h(c^d^a,b,c,e[15],16,530742520),a=h(b^c^d,a,b,e[2],23,-995338651),d=m(d,a,b,c,e[0],6,-198630844),c=m(c,d,a,b,e[7],10,1126891415),b=m(b,c,d,a,e[14],15,-1416354905),a=m(a,b,c,d,e[5],21,-57434055),d=m(d,a,b,c,e[12],6,1700485571),c=m(c,d,a,b,e[3],10,-1894986606),b=m(b,c,d,a,e[10],15,-1051523),a=m(a,b,c,d,e[1],21,-2054922799),d=m(d,a,b,c,e[8],6,1873313359),c=m(c,d,a,b,e[15],10,-30611744),b=m(b,c,d,a,e[6],15,-1560198380),a=m(a,b,c,d,e[13],21,1309151649),d=m(d,a,b,c,e[4],6,-145523070),c=m(c,d,a,b,e[11],10,-1120210379),b=m(b,c,d,a,e[2],15,718787259),a=m(a,b,c,d,e[9],21,-343485551);f[0]=d+f[0]&4294967295;f[1]=a+f[1]&4294967295;f[2]=b+f[2]&4294967295;f[3]=c+f[3]&4294967295}function h(f,e,d,a,b,c){e=(e+f&4294967295)+(a+c&4294967295)&4294967295;return(e<<b|e>>>32-b)+d&4294967295}function k(f,e,d,a,b,c,g){return h(e&d|~e&a,f,e,b,c,g)}function l(f,e,d,a,b,c,g){return h(e&a|d&~a,f,e,b,c,g)}function m(f,e,d,a,b,c,g){return h(d^(e|~a),f,e,b,c,g)}var p="0123456789abcdef".split("");return function(f){var e=unescape(encodeURIComponent(f)),d=e.length;f=[1732584193,-271733879,-1732584194,271733878];var a;for(a=64;a<=e.length;a+=64){for(var b=e.substring(a-64,a),c=[],g=void 0,g=0;64>g;g+=4)c[g>>2]=b.charCodeAt(g)+(b.charCodeAt(g+1)<<8)+(b.charCodeAt(g+2)<<16)+(b.charCodeAt(g+3)<<24);n(f,c)}e=e.substring(a-64);b=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];for(a=0;a<e.length;a++)b[a>>2]|=e.charCodeAt(a)<<(a%4<<3);b[a>>2]|=128<<(a%4<<3);if(55<a)for(n(f,b),a=0;16>a;a++)b[a]=0;b[14]=8*d;n(f,b);for(e=0;e<f.length;e++){d=f;a=e;b=f[e];c="";for(g=0;4>g;g++)c+=p[b>>8*g+4&15]+p[b>>8*g&15];d[a]=c}return f.join("")}}(),
		ksort = function(c,k){var d={},e=[],a,b,l=this,h=!1,g={};switch(k){case "SORT_STRING":a=function(a,f){return l.strnatcmp(a,f)};break;case "SORT_LOCALE_STRING":a=this.i18n_loc_get_default();a=this.php_js.i18nLocales[a].sorting;break;case "SORT_NUMERIC":a=function(a,f){return a+0-(f+0)};break;default:a=function(a,f){var b=parseFloat(a),c=parseFloat(f),d=b+""===a,e=c+""===f;return d&&e?b>c?1:b<c?-1:0:d&&!e?1:!d&&e?-1:a>f?1:a<f?-1:0}}for(b in c)c.hasOwnProperty(b)&&e.push(b);e.sort(a);this.php_js=this.php_js||{};this.php_js.ini=this.php_js.ini||{};g=(h=this.php_js.ini["phpjs.strictForIn"]&&this.php_js.ini["phpjs.strictForIn"].local_value&&"off"!==this.php_js.ini["phpjs.strictForIn"].local_value)?c:g;for(a=0;a<e.length;a++)b=e[a],d[b]=c[b],h&&delete c[b];for(a in d)d.hasOwnProperty(a)&&(g[a]=d[a]);return h||g},
		stringifyPrimitive=function(a){switch(typeof a){case "string":return a;case "boolean":return a?"true":"false";case "number":return isFinite(a)?a:"";default:return""}},
		buildQueryParams=function(a,c,d,b){c=c||"&";d=d||"=";null===a&&(a=void 0);return"object"===typeof a?Object.keys(a).map(function(e){var b=encodeURIComponent(stringifyPrimitive(e))+d;return Array.isArray(a[e])?a[e].map(function(a){return b+encodeURIComponent(stringifyPrimitive(a))}).join(c):b+encodeURIComponent(stringifyPrimitive(a[e]))}).join(c):b?encodeURIComponent(stringifyPrimitive(b))+d+encodeURIComponent(stringifyPrimitive(a)):""};
}