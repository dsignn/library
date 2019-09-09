import {EventManagerInterface} from "./EventManagerInterface";

/**
 * @interface
 * EventManagerAwareInterface
 */
export interface EventManagerAwareInterface {

    /**
     * @param {EventManagerInterface} eventManager
     * @return {this}
     */
    setEventManager(eventManager:EventManagerInterface);

    /**
     * @return {EventManagerInterface}
     */
    getEventManager();
}