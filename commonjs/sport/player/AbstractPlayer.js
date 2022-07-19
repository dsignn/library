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
        /**
         * @var {string}
         */
        this.shirtNumber = null;
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
    setFirstName(firstName) {
        this.firstName = firstName;
        return this;
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
    setLastName(lastName) {
        this.lastName = lastName;
        return this;
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
    setBirthday(date) {
        this.date = date;
        return this;
    }
    /**
     * @inheritdoc
     */
    getRole() {
        return this.role;
    }
    /**
     * @inheritdoc
     */
    setRole(role) {
        this.role = role;
        return this;
    }
    /**
     * @inheritdoc
     */
    getShirtNumber() {
        return this.shirtNumber;
    }
    /**
     * @inheritdoc
     */
    setShirtNumber(shirtNumber) {
        this.shirtNumber = shirtNumber;
        return this;
    }
}
exports.AbstractPlayer = AbstractPlayer;
