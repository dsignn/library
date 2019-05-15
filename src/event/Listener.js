/**
 *
 */
export class Listener {
    /**
     * @param fn
     */
    constructor(fn) {
        if (typeof fn !== 'function') {
            throw `Wrong fn param, must be a function given ${typeof fn}`;
        }
        /**
         * @type {Function}
         */
        this.fn = fn;
    }
    /**
     * @param {Event} event
     * @return {Event}
     */
    execute(event) {
        this.fn(event);
        return event;
    }
}
//# sourceMappingURL=Listener.js.map