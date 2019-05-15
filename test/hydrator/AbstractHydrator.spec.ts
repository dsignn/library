import 'mocha';
import { expect } from 'chai';
import {PropertyStrategyInterface} from "../../src/hydrator/strategy/proprerty/PropertyStrategyInterface";
import {ValueStrategyInteface} from "../../src/hydrator/strategy/value/ValueStrategyInteface";
import {AbstractHydrator} from "../../src/hydrator/AbstractHydrator";

/**
 *
 */
class MockHydrator extends AbstractHydrator {

    extract(data: object) {}

    hydrate(data: object, object?: object) {}
}

describe('AbstractHydrator', () => {

    it('Constructor', () => {
        const hydrator = new MockHydrator();
        expect(hydrator).to.instanceOf(AbstractHydrator);
        expect(hydrator).to.to.have.property('templateObjectHydration');
        expect(hydrator).to.to.have.property('valueStrategies');
        expect(hydrator).to.to.have.property('propertyStrategies');
        expect(hydrator).to.to.have.property('enablePropertyToHydrate');
        expect(hydrator).to.to.have.property('enablePropertyToExtract');
    });

    it('Value Strategy', () => {
        const hydrator = new MockHydrator();
        let mock = <ValueStrategyInteface>{};
        expect(hydrator.getValueStrategy('test')).to.be.a('undefined');
        expect(hydrator.hasValueStrategy('test')).to.be.false;
        expect(hydrator.addValueStrategy('test', mock)).to.instanceOf(AbstractHydrator);
        expect(hydrator.getValueStrategy('test')).to.equal(mock);
        expect(hydrator.removeValueStrategy('test')).to.instanceOf(AbstractHydrator);
        expect(hydrator.hasValueStrategy('test')).to.be.false;
    });

    it('Property Strategy', () => {
        const hydrator = new MockHydrator();
        let mock = <PropertyStrategyInterface>{};
        expect(hydrator.getPropertyStrategy('test')).to.be.a('undefined');
        expect(hydrator.hasPropertytrategy('test')).to.be.false;
        expect(hydrator.addPropertyStrategy('test', mock)).to.instanceOf(AbstractHydrator);
        expect(hydrator.getPropertyStrategy('test')).to.equal(mock);
        expect(hydrator.removePropertyStrategy('test')).to.instanceOf(AbstractHydrator);
        expect(hydrator.hasPropertytrategy('test')).to.be.false;
    });


    it('Skip end Enable Property/Value', () => {
        let hydrator;
        hydrator = new MockHydrator();

        expect(hydrator.skipPropertyToExtract('test')).to.be.false;
        expect(hydrator.skipPropertyToHydrate('test')).to.be.false;

        expect(hydrator.enableHydrateProperty('test1')).to.instanceOf(AbstractHydrator);
        expect(hydrator.enableExtractProperty('test1')).to.instanceOf(AbstractHydrator);

        expect(hydrator.skipPropertyToExtract('test')).to.be.true;
        expect(hydrator.skipPropertyToHydrate('test')).to.be.true;
        expect(hydrator.skipPropertyToExtract('test1')).to.be.false;
        expect(hydrator.skipPropertyToHydrate('test1')).to.be.false;

    });

    it('Hydrate and extract value', () => {
        let hydrator;
        hydrator = new MockHydrator();

        let mockData = {"test": "test"};
        let mockDataI = {"test": "test"};

        expect(hydrator.extractValue('test', mockData)).to.be.equal(mockData);
        expect(hydrator.hydrateValue('test', mockData)).to.be.equal(mockData);

        let mockStrategy = <ValueStrategyInteface>{};
        mockStrategy.extractValue = (name) => {
            return mockDataI;
        };
        mockStrategy.hydrateValue = (name, data) => {
            return mockDataI;
        };

        hydrator.addValueStrategy('test', mockStrategy);

        expect(hydrator.extractValue('test', mockData)).to.be.equal(mockDataI);
        expect(hydrator.hydrateValue('test', mockData)).to.be.equal(mockDataI);
    });


    it('Hydrate and extract property', () => {
        let hydrator;
        hydrator = new MockHydrator();

        let mockDataI = "test1";

        expect(hydrator.extractProperty('test')).to.be.equal('test');
        expect(hydrator.hydrateProperty('test')).to.be.equal('test');

        let mockStrategy = <PropertyStrategyInterface>{};
        mockStrategy.extractProperty = (name) => {
            return mockDataI;
        };
        mockStrategy.hydrateProperty = (name) => {
            return mockDataI;
        };

        hydrator.addPropertyStrategy('test', mockStrategy);

        expect(hydrator.extractProperty('test')).to.be.equal(mockDataI);
        expect(hydrator.hydrateProperty('test')).to.be.equal(mockDataI);
    });

});
