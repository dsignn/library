import {ListenerInterface} from "./ListenerInterface";
import {Event} from "./Event";

/**
 *
 */
export class Listener implements ListenerInterface {

    /**
     * @type Function
     */
    private fn:any;

    /**
     * @param fn
     */
    constructor(fn:any) {
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
    public execute(event:Event) {
        this.fn(event);
        return event;
    }
}