import {EventManagerInterface} from "./EventManagerInterface";

/**
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