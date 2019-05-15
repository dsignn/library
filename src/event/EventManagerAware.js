import { EventManager } from "./EventManager";
/**
 * EventManagerAware
 */
export class EventManagerAware {
    constructor() {
        /**
         * @type {EventManager}
         */
        this.eventManager = new EventManager();
    }
    /**
     * @param {EventManagerInterface} eventManager
     * @return {this}
     */
    setEventManager(eventManager) {
        this.eventManager = eventManager;
        return this;
    }
    /**
     * @return {EventManagerInterface}
     */
    getEventManager() {
        return this.eventManager;
    }
}
//# sourceMappingURL=EventManagerAware.js.map