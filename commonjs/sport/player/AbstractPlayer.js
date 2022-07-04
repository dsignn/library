"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractPlayer = void 0;
/**
 * @interface AbstractPlayer
 */
class AbstractPlayer {
    constructor() {
        /**
         * @var {string}
         */
        this.firstName = null;
        /**
         * @var {string}
         */
        this.lastName = null;
        /**
         * @var {Date}
         */
        this.date = null;
        /**
         * @var {string}
         */
        this.role = null;
    }
    /**
     * @inheritdoc
     */
    getFirstName() {
        return this.firstName;
    }
    /**
     * @inheritdoc
     */
    getLastName() {
        return this.lastName;
    }
    /**
     * @inheritdoc
     */
    getBirthday() {
        return this.date;
    }
    /**
     * @inheritdoc
     */
    getRole() {
        return this.role;
    }
}
exports.AbstractPlayer = AbstractPlayer;
