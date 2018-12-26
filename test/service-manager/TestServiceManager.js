let assert  = require('chai').assert;
let expect  = require('chai').expect;
let should  = require('chai').should;

const ServiceManager = require('../../lib/service-manager/ServiceManager');
const EventManager = require('../../lib/event/EvtManager');

describe('ServiceManager', function() {

    it('Construct', function() {
        let serviceManager = new ServiceManager();

        assert.isObject(serviceManager.services, 'services is an object');
        assert.instanceOf(serviceManager.eventManager, EventManager);
    });
});