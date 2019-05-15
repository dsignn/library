import {AbstractHydrator} from "./AbstractHydrator";
import {HydratorInteface} from "./HydratorInteface";

/**
 *
 */
export class PropertyHydrator extends AbstractHydrator implements HydratorInteface {

    /**
     * @param {object} templateObjectHydration
     * @param {object} valueStrategies
     * @param {object} propertyStrategies
     */
    constructor(templateObjectHydration?:object, valueStrategies?:object, propertyStrategies?:object) {
        super();
        /**
         * @type {object}
         */
        this.templateObjectHydration = templateObjectHydration ? templateObjectHydration : null;

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
     * @param {object} data
     */
    public extract(data: object) {

        let object = {};
        for (let property in data) {

            if (this.skipPropertyToExtract(property)) {
                continue;
            }

            object[this.extractProperty(property)] = this.extractValue(property, data[property]);
        }
        return object;
    }

    /**
     * @param {object} data
     * @param {object} object
     */
    public hydrate(data: object, object?: object) {

        object  = object ? object : this.getTemplateObjectHydration();

        for (let property in data) {

            if (this.skipPropertyToHydrate(property)) {
                continue;
            }

            object[this.hydrateProperty(property)] = this.hydrateValue(property, data[property]);
        }
        return object;
    }
}