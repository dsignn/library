let assert  = require('chai').assert;
let expect  = require('chai').expect;
let should  = require('chai').should;

const PropertyHydrator = require('../../lib/hydrator/PropertyHydrator');

describe('PropertyHydrator', function() {

    it('Construct', function() {
        let propertyHydrator = new PropertyHydrator();

        assert.isObject(propertyHydrator.enableExtractorProperty, 'enableExtractorProperty is an object');
        assert.isObject(propertyHydrator.enableHydratorProperty, 'enableHydratorProperty is an object');
    });
});