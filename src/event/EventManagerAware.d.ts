import { EventManagerInterface } from "./EventManagerInterface";
import { EventManagerAwareInterface } from "./EventManagerAwareInterface";
/**
 * EventManagerAware
 */
export declare class EventManagerAware implements EventManagerAwareInterface {
    /**
     * @type {EventManager}
     */
    protected eventManager: EventManagerInterface;
    /**
     * @param {EventManagerInterface} eventManager
     * @return {this}
     */
    setEventManager(eventManager: EventManagerInterface): this;
    /**
     * @return {EventManagerInterface}
     */
    getEventManager(): EventManagerInterface;
}
