import { AbstractHydrator } from "./AbstractHydrator";
import { HydratorInterface } from "./HydratorInterface";
/**
 *
 */
export declare class PropertyHydrator extends AbstractHydrator implements HydratorInterface {
    /**
     * @param {object} templateObjectHydration
     * @param {object} valueStrategies
     * @param {object} propertyStrategies
     */
    constructor(templateObjectHydration?: object, valueStrategies?: object, propertyStrategies?: object);
    /**
     * @param {object} data
     */
    extract(data: object): {};
    /**
     * @param {object} data
     * @param {object} object
     */
    hydrate(data: object, object?: object): object;
}
