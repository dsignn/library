import { ValueStrategyInteface } from "./ValueStrategyInteface";
/**
 *
 */
export declare class HybridStrategy implements ValueStrategyInteface {
    /**
     * @return {string}
     */
    static STRING_TYPE: string;
    /**
     * @return {string}
     */
    static BOOLEAN_TYPE: string;
    /**
     * @return {string}
     */
    static NUMBER_TYPE: string;
    /**
     * @return {string}
     */
    static UNDEFINED_TYPE: string;
    /**
     * @return {string}
     */
    static OBJECT_TYPE: string;
    /**
     * @return {string}
     */
    static FUNCTION_TYPE: string;
    /**
     * @type string
     */
    protected hydrateType: string;
    /**
     * @type string
     */
    protected extractType: string;
    /**
     * @param {string} hydrateType
     * @param {string} extractType
     */
    constructor(hydrateType: string, extractType: string);
    /**
     * @param {string} property
     * @param data
     * @return {any}
     */
    hydrateValue(property: string, data: any): any;
    /**
     *
     * @param data
     * @returns {*}
     */
    extractValue(data: any): any;
    /**
     * @param typeConvert
     * @param data
     * @return {*}
     */
    convertTo(typeConvert: string, data: any): any;
}
