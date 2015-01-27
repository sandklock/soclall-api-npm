# SoclAll

[![build status](https://secure.travis-ci.org/pvorb/node-md5.png)](https://github.com/sandklock/soclall-api-npm)

SoclAll API library for Node.js

## Installation

```
npm install soclall-api
```


## API

~~~ javascript
getLoginUrl(network)
~~~

  * `network` -- `string` -- see [networks](#networks)
  * returns `string` login url
  
~~~ javascript
getUser(token, callback)
~~~

  * `token` -- `string`
  * `callback` -- `function(err, user)`

~~~ javascript
getFriends(token, callback)
~~~

  * `token` -- `string` -- token given by SoclAll
  * `callback` -- `function(err, friends)`

~~~ javascript
postStream(token, message, callback)
~~~

  * `token` -- `string`
  * `message` -- `string`
  * `callback` -- `function(err)`
  
~~~ javascript
sendMessage(token, message, friends, title, callback)
~~~

  * `token` -- `string`
  * `message` -- `string`
  * `friends` -- `array` -- list of friend's IDs
  * `title` -- `string`
  * `callback` -- `function(err)`

## Usage

~~~ javascript
var soclall = require('soclall-api')(app_id, secret_key);

console.log(soclall.getLoginUrl('facebook'));
~~~

## Networks

* facebook
* twitter
* google
* linkedin
* live
* plurk
* tumblr
* mailru
* reddit
* lastfm

## Bugs and Issues

If you encounter any bugs or issues, feel free to open an issue at [github](https://github.com/sandklock/soclall-api-npm/issues).


## Credits

[SandKlock](http://www.sandklock.com)