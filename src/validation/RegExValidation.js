/**
 * @class
 */
export class RegExValidation {
    /**
     * @param {string} regEx
     * @param {string} flag
     */
    constructor(regEx, flag = 'g') {
        this.regEx = RegExp(regEx, flag);
    }
    /**
     * @inheritDoc
     */
    isValid(data) {
        let isValid = false;
        if ((this.regEx.exec(data)) !== null) {
            isValid = true;
        }
        return isValid;
    }
}
//# sourceMappingURL=RegExValidation.js.map