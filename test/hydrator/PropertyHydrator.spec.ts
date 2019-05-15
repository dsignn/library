import 'mocha';
import { expect } from 'chai';
import {PropertyHydrator} from "../../src/hydrator/PropertyHydrator";
import {PropertyStrategyInterface} from "../../src/hydrator/strategy/proprerty/PropertyStrategyInterface";
import {ValueStrategyInteface} from "../../src/hydrator/strategy/value/ValueStrategyInteface";

describe('PropertyHydrator', () => {

    it('Constructor', () => {
        const hydrator = new PropertyHydrator();
        expect(hydrator).to.instanceOf(PropertyHydrator);
        expect(hydrator).to.have.property('templateObjectHydration');
        expect(hydrator).to.have.property('valueStrategies');
        expect(hydrator).to.have.property('propertyStrategies');
        expect(hydrator).to.have.property('enablePropertyToHydrate');
        expect(hydrator).to.have.property('enablePropertyToExtract');
    });

    it('Extract', () => {
        const hydrator = new PropertyHydrator();
        const mockData = {'test':'test'};

        expect(hydrator.extract(mockData)).to.be.a('object');
        expect(hydrator.extract(mockData)).to.have.property('test');
        expect(hydrator.extract(mockData)).to.not.equal(mockData);

        hydrator.enableExtractProperty('test1');
        expect(hydrator.extract(mockData)).to.be.a('object');
        expect(hydrator.extract(mockData)).to.not.have.property('test');
    });

    it('Hydrate', () => {
        const hydrator = new PropertyHydrator();
        const mockData = {'test':'test'};

        expect(hydrator.hydrate(mockData)).to.be.a('object');
        expect(hydrator.hydrate(mockData)).to.have.property('test');
        expect(hydrator.hydrate(mockData)).to.not.equal(mockData);

        class Mock {
            test:string;
            constructor()  {
                this.test = 'testObject';
            }
        }

        const mockObject = new Mock();

        expect(hydrator.hydrate(mockData, mockObject)).to.instanceOf(Mock);
        expect(hydrator.hydrate(mockData, mockObject)).to.equal(mockObject);
        expect(hydrator.hydrate(mockData)).to.have.property('test');
        expect(hydrator.hydrate(mockData)).to.include({'test':'test'});


        hydrator.enableHydrateProperty('test1');
        expect(hydrator.hydrate(mockData)).to.be.a('object');
        expect(hydrator.hydrate(mockData)).to.not.have.property('test');
    });
});
