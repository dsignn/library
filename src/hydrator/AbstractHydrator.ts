/**
 *
 */
import {HydratorInteface} from "./HydratorInteface";
import {PropertyStrategyInterface} from "./strategy/proprerty/PropertyStrategyInterface";
import {ValueStrategyInteface} from "./strategy/value/ValueStrategyInteface";

export abstract class AbstractHydrator implements HydratorInteface {

    /**
     * @type {null}
     */
    protected templateObjectHydration:any = null;

    /**
     * @type {object}
     */
    protected valueStrategies:object = {};

    /**
     * @type {object}
     */
    protected propertyStrategies:object = {};

    /**
     * @type {object}
     */
    protected enablePropertyToHydrate:object = {};

    /**
     * @type {object}
     */
    protected enablePropertyToExtract:object = {};

    /**
     * @param {object} data
     * @param {object} object
     */
    abstract hydrate(data:object, object?:object);

    /**
     * @param {object} data
     */
    abstract extract(data:object);

    /**
     * @param {string} name
     * @param {PropertyStrategyInterface} strategy
     * @return {AbstractHydrator}
     */
    public addPropertyStrategy(name:string, strategy:PropertyStrategyInterface) {
        this.propertyStrategies[name] = strategy;
        return this;
    }

    /**
     * @param {string} name
     * @return {PropertyStrategyInterface|undefined}
     */
    public getPropertyStrategy(name:string) {
        return this.propertyStrategies[name];
    }

    /**
     * @param {string} name
     * @return {AbstractHydrator}
     */
    public removePropertyStrategy(name:string) {
        delete this.propertyStrategies[name];
        return this;
    }

    /**
     * @param {string} name
     * @return {boolean}
     */
    public hasPropertytrategy(name:string) {
        return !!this.propertyStrategies[name];
    }

    /**
     * @param {string} name
     * @param {ValueStrategyInteface} strategy
     * @return {this}
     */
    public addValueStrategy(name:string, strategy:ValueStrategyInteface) {
        this.valueStrategies[name] = strategy;
        return this;
    }

    /**
     * @param {string} name
     * @return {this}
     */
    public removeValueStrategy(name:string) {
        delete this.valueStrategies[name];
        return this;
    }

    /**
     * @param {string} name
     * @return {boolean}
     */
    public hasValueStrategy(name:string) {
        return !!this.valueStrategies[name];
    }

    /**
     * @param {string} name
     * @return {ValueStrategyInteface|undefined}
     */
    public getValueStrategy(name:string) {
        return this.valueStrategies[name];
    }

    /**
     * @return {object}
     */
    public getTemplateObjectHydration() {
        let obj = {};
        if (this.templateObjectHydration !== null) {
            obj = new this.templateObjectHydration.constructor();
        }
        return obj;
    }

    /**
     * @return {object}
     */
    public setTemplateObjectHydration(templateObjectHydration: any) {
        this.templateObjectHydration = templateObjectHydration;
        return this;
    }

    /**
     * @param {string} name
     * @return {boolean}
     */
    protected skipPropertyToHydrate(name:string) {
        return Object.keys(this.enablePropertyToHydrate).length !== 0 && !this.enablePropertyToHydrate[name];
    }

    /**
     * @param {string} name
     * @return {boolean}
     */
    protected skipPropertyToExtract(name:string) {
        return Object.keys(this.enablePropertyToExtract).length !== 0 && !this.enablePropertyToExtract[name];
    }

    /**
     * @param name
     * @return {any}
     */
    protected hydrateProperty(name:string) {
        let hydrateProperty = name;
        if (this.hasPropertytrategy(name)) {
            hydrateProperty = this.getPropertyStrategy(name).hydrateProperty(name)
        }
        return hydrateProperty;
    }

    /**
     * @param {string} name
     * @param data
     * @return {string}
     */
    protected hydrateValue(name:string, data: any) {
        let hydrateProperty = data;
        if (this.hasValueStrategy(name)) {
            hydrateProperty = this.getValueStrategy(name).hydrateValue(name, data);
        }
        return hydrateProperty;
    }

    /**
     * @param name
     * @return {string}
     */
    protected extractProperty(name:string) {
        let extractProperty = name;
        if (this.hasPropertytrategy(name)) {
            extractProperty = this.getPropertyStrategy(name).extractProperty(name)
        }
        return extractProperty;
    }

    /**
     * @param {string} name
     * @param data
     * @return {any}
     */
    protected extractValue(name:string, data: any) {
        let extractValue = data;
        if (this.hasValueStrategy(name)) {
            extractValue = this.getValueStrategy(name).extractValue(data);
        }
        return extractValue;
    }

    /**
     * @param {string} name
     * @return {this}
     */
    public enableExtractProperty(name:string) {
        this.enablePropertyToExtract[name] = true;
        return this;
    }

    /**
     * @param {string} name
     * @return {this}
     */
    public enableHydrateProperty(name:string) {
        this.enablePropertyToHydrate[name] = true;
        return this;
    }
}
