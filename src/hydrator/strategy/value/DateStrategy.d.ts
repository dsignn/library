import { ValueStrategyInteface } from "./ValueStrategyInteface";
/**
 *
 */
export declare class DateStrategy implements ValueStrategyInteface {
    protected extractFn: any;
    /**
     * @param {} function
     */
    constructor(fn: any);
    /**
     * @param {string} property
     * @param data
     * @return {any}
     */
    hydrateValue(property: string, data: any): Date;
    /**
     *
     * @param data
     * @returns {{}|*}
     */
    extractValue(data: any): any;
    defaultExtract(date: Date): string;
}
