'use strict';

import NodeCache from 'node-cache';

export default function(RED) {
  class CacheNode {
    constructor(n) {
      RED.nodes.createNode(this, n);
      this.name = n.name;
      this.cache = new NodeCache({
        stdTTL : n.defaultTtl || 0,
        checkperiod : n.checkPeriod || 0
      });
      this.cache.nodeList = [];
      function addNode(node) {
        this.nodeList.push(node);
      }
      this.cache.addNode = addNode.bind(this.cache);
      function onChanged() {
        this.nodeList.forEach((n) => {
          n.emit('updated');
        });
      }
      this.cache.onChanged = onChanged.bind(this.cache);
      ['set', 'del', 'expired', 'flush'].forEach((e) => {
        this.cache.on(e, this.cache.onChanged);
      });
      this.on('close', () => {
        this.cache.close();
        delete this.cache;
      });
    }
  }
  RED.nodes.registerType('Cache', CacheNode);

  class CacheInNode {
    constructor(n) {
      RED.nodes.createNode(this, n);
      this.keyProperty = n.keyProperty || 'topic';
      this.valueProperty = n.valueProperty || 'payload';
      this.useString = n.useString;
      this.cacheNodeId = n.cache;
      this.cacheNode = RED.nodes.getNode(this.cacheNodeId);
      if (this.cacheNode) {
        this.cacheNode.cache.addNode(this);
        this.on('updated', () => { this.status({fill:'green',shape:'dot',text:RED._('cache.status.keys', {n:this.cacheNode.cache.getStats().keys})}); });
      }
      this.name = n.name;
      this.on('input', (msg) => {
        if (this.cacheNode) {
          if (msg.dump) {
            this.cacheNode.cache.keys((err, keys) => {
              if (!err) {
                this.cacheNode.cache.mget(keys, (err, value) => {
                  RED.util.setMessageProperty(msg, this.valueProperty, value);
                  this.send(msg);
                });
              }
            });
          } else {
            let key = RED.util.getMessageProperty(msg, this.keyProperty);
            if (key) {
              this.cacheNode.cache.get(key, (err, value) => {
                if (!err) {
                  RED.util.setMessageProperty(msg, this.valueProperty, ((value === '' || value === undefined) ? null : value));
                  this.send(msg);
                }
              });
            }
          }
        }
      });
      process.nextTick(() => {
        this.emit('updated');
      });
    }
  }
  RED.nodes.registerType('Cache in', CacheInNode);

  class CacheOutNode {
    constructor(n) {
      RED.nodes.createNode(this, n);
      this.keyProperty = n.keyProperty || 'topic';
      this.valueProperty = n.valueProperty || 'payload';
      this.ttlProperty = n.ttlProperty || '';
      this.useString = n.useString;
      this.cacheNodeId = n.cache;
      this.cacheNode = RED.nodes.getNode(this.cacheNodeId);
      if (this.cacheNode) {
        this.cacheNode.cache.addNode(this);
        this.on('updated', () => { this.status({fill:'green',shape:'dot',text:RED._('cache.status.keys', {n:this.cacheNode.cache.getStats().keys})}); });
      }
      this.name = n.name;
      this.on('input', (msg) => {
        if (this.cacheNode) {
          let key = RED.util.getMessageProperty(msg, this.keyProperty);
          if (key) {
            let value = RED.util.getMessageProperty(msg, this.valueProperty);
            if (this.ttlProperty) {
              let ttl = RED.util.getMessageProperty(msg, this.ttlProperty) || 0;
              this.cacheNode.cache.set(key, value, ttl);
            } else {
              this.cacheNode.cache.set(key, value);
            }
          }
        }
      });
      process.nextTick(() => {
        this.emit('updated');
      });
    }
  }
  RED.nodes.registerType('Cache out', CacheOutNode);
}
