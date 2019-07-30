import {ValidationInterface} from "./ValidationInterface";

/**
 * @class
 */
export class RegExValidation implements ValidationInterface {

    /**
     * @type RegExp
     */
    protected regEx: RegExp;

    /**
     * @param {string} regEx
     * @param {string} flag
     */
    constructor(regEx: string, flag: string =  'g') {

        this.regEx = RegExp(regEx, flag);
    }

    /**
     * @inheritDoc
     */
    isValid(data: any): boolean {

        let isValid = false;
        if ((this.regEx.exec(data)) !== null) {
            isValid = true;
        }

        return isValid;
    }
}