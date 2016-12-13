Memory cache Node-RED nodes
===

[![GitHub release](https://img.shields.io/github/release/CANDY-LINE/node-red-contrib-cache.svg)](https://github.com/CANDY-LINE/node-red-contrib-cache/releases/latest)
[![master Build Status](https://travis-ci.org/CANDY-LINE/node-red-contrib-cache.svg?branch=master)](https://travis-ci.org/CANDY-LINE/node-red-contrib-cache/)
[![License MIT](https://img.shields.io/github/license/CANDY-LINE/node-red-contrib-cache.svg)](http://opensource.org/licenses/MIT)

Memcached-like memory cache Node-RED nodes. You can set/get values and provide them TTL if necessary.

There are 3 nodes in this project.

1. `Cache` configuration node ... Memory cache instance. Each configuration node is isolated from other `Cache` nodes. Default TTL is 0 (never expired). Default check period is 0 (never checked).
1. `Cache in` node ... Used for retrieving a stored value
1. `Cache out` node ... Used for storing a key-value pair. You can set TTL (in seconds) as well as key-value pair by providing TTL property.

The cache behavior is fully depending on [node-cache](https://www.npmjs.com/package/node-cache) library. But the project doesn't support full features of the library for making the nodes simpler.

### Installation

```
cd ~/.node-red
npm install node-red-contrib-cache
```

### Example flow

You can try the following flow for testing the node behaviors after installing this project.

```
[
    {
        "id": "f3cb898c.c292b8",
        "type": "inject",
        "z": "e9528acf.2c82d",
        "name": "",
        "topic": "timestamp",
        "payload": "",
        "payloadType": "date",
        "repeat": "",
        "crontab": "",
        "once": false,
        "x": 280,
        "y": 180,
        "wires": [
            [
                "a0110a47.53535"
            ]
        ]
    },
    {
        "id": "a0110a47.53535",
        "type": "Cache in",
        "z": "e9528acf.2c82d",
        "name": "",
        "cache": "b27f65d.3e20898",
        "keyType": "msg",
        "keyProperty": "topic",
        "valueType": "msg",
        "valueProperty": "payload",
        "useString": false,
        "x": 460,
        "y": 180,
        "wires": [
            [
                "64cb797d.35d3"
            ]
        ]
    },
    {
        "id": "64cb797d.35d3",
        "type": "debug",
        "z": "e9528acf.2c82d",
        "name": "",
        "active": true,
        "console": "false",
        "complete": "false",
        "x": 680,
        "y": 180,
        "wires": []
    },
    {
        "id": "6879b817.90256",
        "type": "inject",
        "z": "e9528acf.2c82d",
        "name": "",
        "topic": "timestamp",
        "payload": "",
        "payloadType": "date",
        "repeat": "",
        "crontab": "",
        "once": false,
        "x": 280,
        "y": 300,
        "wires": [
            [
                "c861ebf4.e5bf7"
            ]
        ]
    },
    {
        "id": "c861ebf4.e5bf7",
        "type": "Cache out",
        "z": "e9528acf.2c82d",
        "name": "",
        "cache": "b27f65d.3e20898",
        "keyType": "msg",
        "keyProperty": "topic",
        "valueType": "msg",
        "valueProperty": "payload",
        "ttlType": "msg",
        "ttlProperty": "",
        "useString": false,
        "x": 460,
        "y": 300,
        "wires": []
    },
    {
        "id": "e9315f78.94def",
        "type": "inject",
        "z": "e9528acf.2c82d",
        "name": "",
        "topic": "timestamp2",
        "payload": "",
        "payloadType": "date",
        "repeat": "",
        "crontab": "",
        "once": false,
        "x": 280,
        "y": 380,
        "wires": [
            [
                "c861ebf4.e5bf7"
            ]
        ]
    },
    {
        "id": "b27f65d.3e20898",
        "type": "Cache",
        "z": "",
        "name": "abcd",
        "defaultTtl": "10",
        "checkPeriod": "30"
    }
]
```

# Revision History
* 1.0.2
    - Remove redundant dependency
* 1.0.1
    - Fix an issue where the wrong TTL value can be used on storing a value when there’s no valid TTL property in the msg object
* 1.0.0
    - Initial release
