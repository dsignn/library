import {Event} from "./Event";

/**
 * @interface
 * ListenerInterface
 */
export interface ListenerInterface {

    /**
     * @param {Event} event
     */
    execute(event: Event);
}