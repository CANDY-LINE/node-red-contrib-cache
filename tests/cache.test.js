'use strict';

import 'source-map-support/register';
import * as sinon from 'sinon';
import { assert } from 'chai';
import RED from 'node-red';
import cacheNode from '../lib/cache';

let server = sinon.spy();
let settings = sinon.spy();
RED.init(server, settings);

describe('cache module', () => {
  let sandbox;
  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });
  afterEach(() => {
    sandbox.restore();
  });

  it('should be successfully initialized', () => {
    let registerType = sandbox.stub(RED.nodes, 'registerType');
    cacheNode(RED);
    assert.isTrue(registerType.calledThrice);
  });

  describe('CacheNode', () => {
    let CacheNode;
    beforeEach(() => {
      RED.nodes.createNode = t => {
        t.status = () => {};
        t.on = () => {};
        t.send = () => {};
      };
      RED.nodes.registerType = (n, t) => {
        if (n === 'Cache') {
          CacheNode = t;
        }
      };
    });
    afterEach(() => {
      sandbox.restore();
    });
    describe('#constructor()', () => {
      it('should be able to create a new CacheNode', () => {
        cacheNode(RED);
        assert.isDefined(CacheNode);
        let node = new CacheNode({
          name: 'my-name',
          defaultTtl: 123,
          checkPeriod: 456
        });
        assert.equal('my-name', node.name);
        assert.isDefined(node.cache);
        assert.equal(0, node.cache.nodeList);
        node.cache.addNode({});
        assert.equal(1, node.cache.nodeList.length);
      });
    });
  });
});
