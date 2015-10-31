# SocialAll

SocialAll API library for Node.js

Note: [SocialAll](https://www.socialall.io) is an unified API for 15+ popular social networks that supports social login, posting (supported video & photo), messaging and friends inviting.

## Installation

```
$ npm install socialall
```
Go to [SocialAll](https://www.socialall.io) and register an application for free.

## Usage

~~~ javascript
var SocialAll = require('socialall')
  , sa = new SocialAll(app_id, secret_key);

console.log(sa.getLoginUrl('facebook', 'http://yourdomain.com/callback'));
~~~

## API

~~~ javascript
sa.getLoginUrl(network, callback_url)
~~~

  * `network` -- `string` -- see [networks](#networks)
  * `callback_url` -- `string`
  * returns `string` login url

~~~ javascript
sa.getUser(token, callback)
~~~

  * `token` -- `string`
  * `callback` -- `function(err, user)`

~~~ javascript
sa.getFriends(token, callback)
~~~

  * `token` -- `string` -- token given by SocialAll
  * `callback` -- `function(err, friends)`

~~~ javascript
sa.postStream(token, message, callback)
~~~

  * `token` -- `string`
  * `message` -- `string`
  * `callback` -- `function(err)`

~~~ javascript
sa.sendMessage(token, message, friends, title, callback)
~~~

  * `token` -- `string`
  * `message` -- `string`
  * `friends` -- `array` -- list of friend's IDs
  * `title` -- `string`
  * `callback` -- `function(err)`

## Networks

* disqus
* facebook
* foursquare
* github
* google
* lastfm
* linkedin
* live
* mailru
* plurk
* reddit
* tumblr
* twitter
* vkontakte
* wordpress

## Bugs and Issues

If you encounter any bugs or issues, feel free to open an issue at [github](https://github.com/sandklock/soclall-api-npm/issues).

## Credits

[SandKlock](http://www.sandklock.com)
