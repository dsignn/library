"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EventManager_1 = require("./EventManager");
/**
 * EventManagerAware
 */
class EventManagerAware {
    constructor() {
        /**
         * @type {EventManager}
         */
        this.eventManager = new EventManager_1.EventManager();
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
exports.EventManagerAware = EventManagerAware;
