import {AbstractHydrator} from "./AbstractHydrator";
import {HydratorInteface} from "./HydratorInteface";

/**
 *
 */
export class AggregatePropertyHydrator extends AbstractHydrator implements HydratorInteface {

    /**
     * @type string
     */
    protected type:string;

    /**
     * @type {object}
     */
    protected hydratorMap:object = {};

    /**
     * @param {string} type
     * @param {object} valueStrategies
     * @param {object} propertyStrategies
     */
    constructor(type: string, valueStrategies?:object, propertyStrategies?:object) {
        super();
        /**
         * @type {object}
         */
        this.type = type;

        /**
         * @type {object}
         */
        this.valueStrategies = valueStrategies ? valueStrategies : {};

        /**
         * @type {object}
         */
        this.propertyStrategies = propertyStrategies ? propertyStrategies : {};
    }

    /**
     * @param {AbstractHydrator} hydrator
     * @param {Array<string>} map
     * @return AggregatePropertyHydrator
     */
    public addHydratorMap(hydrator: AbstractHydrator, map: Array<string>) {
        let objectPrototypeName = hydrator.getTemplateObjectHydration();
        let nameConstruct = objectPrototypeName.constructor.name;
        switch (true) {
            case this.hydratorMap[nameConstruct] !== undefined:
                for (let cont = 0; map.length > cont; cont++) {
                    let found = this.hydratorMap[nameConstruct].map.findIndex(
                        (element) => {
                            return element === map[cont];
                        }
                    );

                    if (found < 0) {
                        this.hydratorMap[nameConstruct].map.push(map[cont]);
                    }
                }
                break;
            default:
                this.hydratorMap[nameConstruct] = {
                    'hydrator' : hydrator,
                    'map' : map
                };
                break
        }

        return this;
    }

    /**
     * @param {AbstractHydrator} hydrator
     * @param {string} type
     * @return {this}
     */
    public removeHydratorMap(hydrator: AbstractHydrator, type?: string) {
        let objectPrototypeName = hydrator.getTemplateObjectHydration();
        let nameConstruct = objectPrototypeName.constructor.name;

        switch (true) {
            case type === undefined:
                delete this.hydratorMap[nameConstruct];
                break;
            case this.hydratorMap[nameConstruct] === undefined:
                break;
            default:
                let found = this.hydratorMap[nameConstruct].map.findIndex(
                    (element) => {
                        return element === type;
                    }
                );

                if (found > -1) {
                    this.hydratorMap[nameConstruct].map.splice(found, 1);
                }
                break;
        }

        return this;
    }

    /**
     * @param {object} object
     * @return {HydratorInteface|null}
     */
    protected getHydratorFromObject(object: object) {
        let hydrator = null;

        for (let property in this.hydratorMap) {
            if (object.constructor.name === property) {
                hydrator = this.hydratorMap[property].hydrator;
                break;
            }
        }
        return hydrator;
    }

    /**
     * @param {string} type
     * @return {HydratorInteface|null}
     */
    protected getHydratorFromType(type: string) {
        let hydrator = null;

        for (let property in this.hydratorMap) {
            let found = this.hydratorMap[property].map.find((element) => {
                return type === element;
            });

            if (found) {
                hydrator = this.hydratorMap[property].hydrator;
                break;
            }
        }
        return hydrator;
    }

    /**
     * @param {object} data
     */
    public extract(data: {type?: string}) {

        let hydrator = this.getHydratorFromObject(data);

        if (!hydrator && data.type) {
            hydrator = this.getHydratorFromType(data.type);
        }

        if (!hydrator) {
            throw new Error("Hydrator not found");
        }

        return hydrator.extract(data);
    }

    /**
     * @param data
     * @param {object} object
     */
    public hydrate(data: {type?: string}, object?: object) {

        let hydrator = null;

        if (object) {
            hydrator = this.getHydratorFromObject(object);
        }

        if (!hydrator && !object) {
            hydrator = this.getHydratorFromObject(this.getTemplateObjectHydration());
        }

        if (!hydrator && data.type) {
            hydrator = this.getHydratorFromType(data.type, );
        }

        if (!hydrator) {
            throw new Error("Hydrator not found");
        }

        return hydrator.hydrate(data, object);
    }
}