import { ListenerInterface } from "./ListenerInterface";
import { Event } from "./Event";
/**
 *
 */
export declare class Listener implements ListenerInterface {
    /**
     * @type Function
     */
    private fn;
    /**
     * @param fn
     */
    constructor(fn: any);
    /**
     * @param {Event} event
     * @return {Event}
     */
    execute(event: Event): Event;
}
