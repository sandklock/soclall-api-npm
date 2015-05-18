# SoclAll

SoclAll API library for Node.js

## Installation

```
npm install soclall
```
Go to [SoclAll](http://www.soclall.com) and register an application for free.

## Usage

~~~ javascript
var SoclAll = require('soclall')
  , s = new SoclAll(app_id, secret_key);

console.log(s.getLoginUrl('facebook', 'http://yourdomain.com/callback'));
~~~

## API

~~~ javascript
getLoginUrl(network, callback_url)
~~~

  * `network` -- `string` -- see [networks](#networks)
  * `callback_url` -- `string`
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
* vkontakte
* disqus
* wordpress
* foursquare
* github

## Bugs and Issues

If you encounter any bugs or issues, feel free to open an issue at [github](https://github.com/sandklock/soclall-api-npm/issues).

## Credits

[SandKlock](http://www.sandklock.com)