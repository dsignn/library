/**
 * Event
 */
export class Event {
    /**
     * @param {string} name
     * @param {object} data
     */
    constructor(name, data) {
        /**
         * @type {object}
         */
        this.data = {};
        /**
         * @type {boolean}
         */
        this.stopPropagation = false;
        this.name = name;
        this.data = data;
    }
    /**
     * @param {boolean} stopPropagation
     */
    setStopPropagation(stopPropagation) {
        this.stopPropagation = stopPropagation;
        return this;
    }
    /**
     * @return {boolean}
     */
    getStopPropagation() {
        return this.stopPropagation;
    }
}
//# sourceMappingURL=Event.js.map