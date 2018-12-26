let assert  = require('chai').assert;
let expect  = require('chai').expect;
let should  = require('chai').should;

const Application = require('../../lib/core/Application');
const EventManager = require('../../lib/event/EvtManager');

describe('Application', function() {

    it('Construct', function() {
        let application = new Application();

        assert.equal(application.context, 'player');
        assert.instanceOf(application.eventManager, EventManager);
        assert.isArray(application.modules, 'modules is an array');
        assert.isObject(application.config, 'Config is an object');
        assert.isObject(application.serviceToLoad, 'ServiceToLoad is an object');
    });
});