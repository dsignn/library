let assert  = require('chai').assert;
let expect  = require('chai').expect;
let should  = require('chai').should;

const AbstractHydrator = require('../../lib/hydrator/AbstractHydrator');

describe('AbstractHydrator', function() {

    it('Construct', function() {
        let abstractHydrator = new AbstractHydrator();

        assert.isObject(abstractHydrator.strategies, 'enableExtractorProperty is an object');
        assert.isObject(abstractHydrator.nameStrategies, 'enableHydratorProperty is an object');
        assert.isNull(abstractHydrator.referenceObject, 'referenceObject is null');
    });
});