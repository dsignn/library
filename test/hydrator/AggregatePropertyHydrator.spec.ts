import 'mocha';
import { expect, assert } from 'chai';
import {PropertyHydrator, AggregatePropertyHydrator, AbstractHydrator} from "../../src/hydrator/index";

describe('AggregatePropertyHydrator', () => {

    class MockHydrator extends AbstractHydrator {
        extract(data: object) {
            return data
        }

        hydrate(data: object, object?: object) {
            return object ? object : data;
        }

    }

    class MockTemplate1 {}

    class MockTemplate2 {}

    it('Constructor', () => {
        const hydrator = new AggregatePropertyHydrator('test');
        expect(hydrator).to.instanceOf(AbstractHydrator);
        expect(hydrator).to.instanceOf(AggregatePropertyHydrator);
        expect(hydrator).to.have.property('type');
        expect(hydrator).to.have.property('valueStrategies');
        expect(hydrator).to.have.property('propertyStrategies');
    });

    it('AddHydratorMap', () => {
        let hydrator;
        hydrator = new AggregatePropertyHydrator('test');

        let mockHydrator = new MockHydrator();
        let mockObject = new MockTemplate1();
        mockHydrator.setTemplateObjectHydration(mockObject);

        expect(hydrator.addHydratorMap(mockHydrator, ['test'])).to.instanceOf(AggregatePropertyHydrator) ;
        expect(hydrator.addHydratorMap(mockHydrator, ['test2'])).to.instanceOf(AggregatePropertyHydrator) ;

        expect(hydrator.hydratorMap).to.have.property(mockObject.constructor.name);
        expect(hydrator.hydratorMap[mockObject.constructor.name].hydrator).to.equal(mockHydrator);
        expect(hydrator.hydratorMap[mockObject.constructor.name].map).to.eql(['test', 'test2']);
    });

    it('RemoveHydratorMap', () => {
        let hydrator;
        hydrator = new AggregatePropertyHydrator('test');

        let mockHydrator = new MockHydrator();
        let mockObject = new MockTemplate1();
        mockHydrator.setTemplateObjectHydration(mockObject);

        expect(hydrator.removeHydratorMap(mockHydrator)).to.instanceOf(AggregatePropertyHydrator);
        expect(hydrator.removeHydratorMap(mockHydrator, ['test'])).to.instanceOf(AggregatePropertyHydrator);

        hydrator.addHydratorMap(mockHydrator, ['test']);
        hydrator.addHydratorMap(mockHydrator, ['test2']);

        expect(hydrator.removeHydratorMap(mockHydrator, 'test')).to.instanceOf(AggregatePropertyHydrator);
        expect(hydrator.hydratorMap[mockObject.constructor.name].hydrator).to.equal(mockHydrator);
        expect(hydrator.hydratorMap[mockObject.constructor.name].map).to.eql(['test2']);
        expect(hydrator.removeHydratorMap(mockHydrator, 'test2')).to.instanceOf(AggregatePropertyHydrator);
        expect(hydrator.hydratorMap[mockObject.constructor.name].map).to.eql([]);
        expect(hydrator.hydratorMap).to.have.property(mockObject.constructor.name);
        expect(hydrator.removeHydratorMap(mockHydrator)).to.instanceOf(AggregatePropertyHydrator);
        expect(hydrator.hydratorMap).to.not.have.property(mockObject.constructor.name);
    });

    it('getHydratorFromType', () => {
        let hydrator;
        hydrator = new AggregatePropertyHydrator('type');

        expect(hydrator.getHydratorFromType('test')).to.eql(null);

        let mockHydrator = new MockHydrator();
        let mockObject = new MockTemplate1();
        mockHydrator.setTemplateObjectHydration(mockObject);

        hydrator.addHydratorMap(mockHydrator, ['test']);

        expect(hydrator.getHydratorFromType('test')).to.equal(mockHydrator);
    });

    it('getHydratorFromObject', () => {
        let hydrator;
        hydrator = new AggregatePropertyHydrator('type');

        expect(hydrator.getHydratorFromObject('test')).to.eql(null);

        let mockHydrator = new MockHydrator();
        let mockObject = new MockTemplate1();
        mockHydrator.setTemplateObjectHydration(mockObject);

        hydrator.addHydratorMap(mockHydrator, ['test']);

        expect(hydrator.getHydratorFromObject(mockObject)).to.equal(mockHydrator);
    });


    it('Extract', () => {
        let hydrator;
        hydrator = new AggregatePropertyHydrator('type');

        const mockData = {'test':'test'};

        let mockHydrator = new MockHydrator();
        let mockObject = new MockTemplate1();
        mockHydrator.setTemplateObjectHydration(mockObject);

        let mockObjectToHydrate = new MockTemplate1();


        let thwowTest = () => {
            hydrator.extract(mockData)
        };
        expect(thwowTest).to.throw(Error);

        hydrator.addHydratorMap(mockHydrator, ['test']);
        expect(hydrator.extract(mockObject)).to.equals(mockObject);
        let dataType = {type:"test"};
        expect(hydrator.extract(dataType)).to.equals(dataType);

    });

    it('Hydrate', () => {
        let hydrator;
        hydrator = new AggregatePropertyHydrator('type');

        const mockData = {'test':'test'};

        let mockHydrator = new MockHydrator();
        let mockObject = new MockTemplate1();
        mockHydrator.setTemplateObjectHydration(mockObject);

        let mockObjectToHydrate = new MockTemplate1();


        let thwowTest = () => {
            hydrator.hydrate(mockData)
        };
        expect(thwowTest).to.throw(Error);

        hydrator.addHydratorMap(mockHydrator, ['test']);
        let dataType = {type:"test"};
        expect(hydrator.hydrate(dataType)).to.equals(dataType);

        let dataNotType = {test:"test"};
        expect(hydrator.hydrate(dataNotType, mockObject)).to.equals(mockObject);

        let mockObject2 = new MockTemplate1();
        expect(hydrator.hydrate(dataNotType, mockObject2)).to.equals(mockObject2);

        let mockObject3 = new MockTemplate1();
        hydrator.setTemplateObjectHydration(mockObject3);

        expect(hydrator.hydrate(dataNotType)).to.equals(dataNotType);
    });

});
