import {EventManagerInterface} from "./EventManagerInterface";
import {EventManager} from "./EventManager";
import {EventManagerAwareInterface} from "./EventManagerAwareInterface";

/**
 * EventManagerAware
 */
export class EventManagerAware implements EventManagerAwareInterface {

    /**
     * @type {EventManager}
     */
    protected eventManager:EventManagerInterface = new EventManager();

    /**
     * @param {EventManagerInterface} eventManager
     * @return {this}
     */
    public setEventManager(eventManager:EventManagerInterface) {
        this.eventManager = eventManager;
        return this;
    }

    /**
     * @return {EventManagerInterface}
     */
    public getEventManager() {
        return this.eventManager;
    }
}