import { EventManagerInterface } from "./EventManagerInterface";
/**
 * EventManagerAwareInterface
 */
export interface EventManagerAwareInterface {
    /**
     * @param {EventManagerInterface} eventManager
     * @return {this}
     */
    setEventManager(eventManager: EventManagerInterface): any;
    /**
     * @return {EventManagerInterface}
     */
    getEventManager(): any;
}
