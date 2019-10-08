import { AbstractHydrator } from "./AbstractHydrator";
import { HydratorInterface } from "./HydratorInterface";
/**
 *
 */
export declare class AggregatePropertyHydrator extends AbstractHydrator implements HydratorInterface {
    /**
     * @type string
     */
    protected type: string;
    /**
     * @type {object}
     */
    protected hydratorMap: object;
    /**
     * @param {string} type
     * @param {object} valueStrategies
     * @param {object} propertyStrategies
     */
    constructor(type: string, valueStrategies?: object, propertyStrategies?: object);
    /**
     * @param {AbstractHydrator} hydrator
     * @param {Array<string>} map
     * @return AggregatePropertyHydrator
     */
    addHydratorMap(hydrator: AbstractHydrator, map: Array<string>): this;
    /**
     * @param {AbstractHydrator} hydrator
     * @param {string} type
     * @return {this}
     */
    removeHydratorMap(hydrator: AbstractHydrator, type?: string): this;
    /**
     * @param {object} object
     * @return {HydratorInterface|null}
     */
    protected getHydratorFromObject(object: object): any;
    /**
     * @param {string} type
     * @return {HydratorInterface|null}
     */
    protected getHydratorFromType(type: string): any;
    /**
     * @param {object} data
     */
    extract(data: {
        type?: string;
    }): any;
    /**
     * @param data
     * @param {object} object
     */
    hydrate(data: {
        type?: string;
    }, object?: object): any;
}
