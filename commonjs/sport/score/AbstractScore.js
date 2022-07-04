"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractScore = void 0;
/**
 * @interface AbstractScore
 */
class AbstractScore {
    constructor() {
        /**
         * @var number
         */
        this.value = 1;
    }
    /**
     * @returns {Number}
     */
    getValue() {
        return this.value;
    }
}
exports.AbstractScore = AbstractScore;
