Memory cache Node-RED nodes
===

[![GitHub release](https://img.shields.io/github/release/CANDY-LINE/node-red-contrib-cache.svg)](https://github.com/CANDY-LINE/node-red-contrib-cache/releases/latest)
[![master Build Status](https://travis-ci.org/CANDY-LINE/node-red-contrib-cache.svg?branch=master)](https://travis-ci.org/CANDY-LINE/node-red-contrib-cache/)
[![License MIT](https://img.shields.io/github/license/CANDY-LINE/node-red-contrib-cache.svg)](http://opensource.org/licenses/MIT)

Memcached-like memory cache Node-RED nodes. You can set/get values and provide them TTL if necessary.

There are 3 nodes in this project.

1. `Cache` configuration node ... Memory cache instance. Each configuration node is isolated from other `Cache` nodes. Default TTL is undefined (never expired). Default check period is undefined (never checked).
1. `Cache in` node ... Used for retrieving a stored value
1. `Cache out` node ... Used for storing a key-value pair. You can set TTL (in seconds) as well as key-value pair by providing TTL property.

The cache behavior is fully depending on [node-cache](https://www.npmjs.com/package/node-cache) library. But the project doesn't support full features of the library for making the nodes simpler.

### Installation

```
cd ~/.node-red
npm install --production node-red-contrib-cache
```

### Example flow

You can import an example from the menu (`Import > Examples > cache > Cache Example`) on the editor.

# Revision History
* 2.0.2-2.0.3
    - Fix JSON format error
* 2.0.1
    - Revise Default TTL description on the node help content and README as the node immediately clears its cache content when Default TTL is 0
* 2.0.0
    - Add a new feature to route a message object to another port on a cache miss, disabled by default (#3)
    - Introduce a new property 'dump' to dump all entries in the cache (#4)
* 1.1.0
    - Fix #2
    - Move the example flow to Import menu
* 1.0.4
    - Fix labels
* 1.0.3
    - Emit `null` when the retrieved value is `null`, `undefined` or `''(empty string)`
* 1.0.2
    - Remove redundant dependency
* 1.0.1
    - Fix an issue where the wrong TTL value can be used on storing a value when there’s no valid TTL property in the msg object
* 1.0.0
    - Initial release
