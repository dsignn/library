let assert  = require('chai').assert;
let expect  = require('chai').expect;
let should  = require('chai').should;

const ModuleConfig = require('../../lib/core/ModuleConfig');
const ServiceManager = require('../../lib/service-manager/ServiceManager');

describe('ModuleConfig', function() {

    it('Construct', function() {
        let serviceManager = new ServiceManager();
        let moduleConfig = new ModuleConfig(serviceManager);

        assert.equal(moduleConfig.getServiveManager(), serviceManager);
    });
});