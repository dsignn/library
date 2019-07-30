import { ValidationInterface } from "./ValidationInterface";
/**
 * @class
 */
export declare class RegExValidation implements ValidationInterface {
    /**
     * @type RegExp
     */
    protected regEx: RegExp;
    /**
     * @param {string} regEx
     * @param {string} flag
     */
    constructor(regEx: string, flag?: string);
    /**
     * @inheritDoc
     */
    isValid(data: any): boolean;
}
