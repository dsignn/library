let assert  = require('chai').assert;
let expect  = require('chai').expect;
let should  = require('chai').should;

const EvtManager = require('../../lib/event/EvtManager.js');

describe('EvtManager', function() {

    it('Construct', function() {
        let evtManager = new EvtManager();

        assert.isObject(evtManager.queues, 'Options is an object');
    });
});