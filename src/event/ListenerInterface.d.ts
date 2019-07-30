import { Event } from "./Event";
export interface ListenerInterface {
    /**
     * @param {Event} event
     */
    execute(event: Event): any;
}
