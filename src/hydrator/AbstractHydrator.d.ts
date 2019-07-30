/**
 *
 */
import { HydratorInteface } from "./HydratorInteface";
import { PropertyStrategyInterface } from "./strategy/proprerty/PropertyStrategyInterface";
import { ValueStrategyInteface } from "./strategy/value/ValueStrategyInteface";
export declare abstract class AbstractHydrator implements HydratorInteface {
    /**
     * @type {null}
     */
    protected templateObjectHydration: any;
    /**
     * @type {object}
     */
    protected valueStrategies: object;
    /**
     * @type {object}
     */
    protected propertyStrategies: object;
    /**
     * @type {object}
     */
    protected enablePropertyToHydrate: object;
    /**
     * @type {object}
     */
    protected enablePropertyToExtract: object;
    /**
     * @param {object} data
     * @param {object} object
     */
    abstract hydrate(data: object, object?: object): any;
    /**
     * @param {object} data
     */
    abstract extract(data: object): any;
    /**
     * @param {string} name
     * @param {PropertyStrategyInterface} strategy
     * @return {AbstractHydrator}
     */
    addPropertyStrategy(name: string, strategy: PropertyStrategyInterface): this;
    /**
     * @param {string} name
     * @return {PropertyStrategyInterface|undefined}
     */
    getPropertyStrategy(name: string): any;
    /**
     * @param {string} name
     * @return {AbstractHydrator}
     */
    removePropertyStrategy(name: string): this;
    /**
     * @param {string} name
     * @return {boolean}
     */
    hasPropertytrategy(name: string): boolean;
    /**
     * @param {string} name
     * @param {ValueStrategyInteface} strategy
     * @return {this}
     */
    addValueStrategy(name: string, strategy: ValueStrategyInteface): this;
    /**
     * @param {string} name
     * @return {this}
     */
    removeValueStrategy(name: string): this;
    /**
     * @param {string} name
     * @return {boolean}
     */
    hasValueStrategy(name: string): boolean;
    /**
     * @param {string} name
     * @return {ValueStrategyInteface|undefined}
     */
    getValueStrategy(name: string): any;
    /**
     * @return {object}
     */
    getTemplateObjectHydration(): {};
    /**
     * @return {object}
     */
    setTemplateObjectHydration(templateObjectHydration: any): this;
    /**
     * @param {string} name
     * @return {boolean}
     */
    protected skipPropertyToHydrate(name: string): boolean;
    /**
     * @param {string} name
     * @return {boolean}
     */
    protected skipPropertyToExtract(name: string): boolean;
    /**
     * @param name
     * @return {any}
     */
    protected hydrateProperty(name: string): string;
    /**
     * @param {string} name
     * @param data
     * @return {string}
     */
    protected hydrateValue(name: string, data: any): any;
    /**
     * @param name
     * @return {string}
     */
    protected extractProperty(name: string): string;
    /**
     * @param {string} name
     * @param data
     * @return {any}
     */
    protected extractValue(name: string, data: any): any;
    /**
     * @param {string} name
     * @return {this}
     */
    enableExtractProperty(name: string): this;
    /**
     * @param {string} name
     * @return {this}
     */
    enableHydrateProperty(name: string): this;
}
