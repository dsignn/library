"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventManagerAggregate = void 0;
/**
 * @class
 * EventManagerInterface
 */
class EventManagerAggregate {
    constructor() {
        /**
         * @type {object}
         */
        this.managers = {};
    }
    /**
     * @param {EventManagerInterface} eventMangager
     * @retun EventManagerAggregate
     */
    addEventManager(eventMangager) {
        let key = eventMangager.constructor.name;
        this.managers[key] = eventMangager;
        return this;
    }
    /**
     * @param {EventManagerInterface} eventMangager
     * @retun EventManagerAggregate
     */
    removeEventManager(eventMangager) {
        let key = eventMangager.constructor.name;
        if (this.managers[key]) {
            delete this.managers[key];
        }
        return this;
    }
    /**
     * @param  {EventManagerInterface} eventMangager
     * @retun boolean
     */
    hasEventManager(eventMangager) {
        let key = eventMangager.constructor.name;
        return !!this.managers[key];
    }
    /**
     * @param {string} evtName
     * @param listener
     * @return EventManager
     */
    on(evtName, listener) {
        for (const property in this.managers) {
            this.managers[property].on(evtName, listener);
        }
        return this;
    }
    /**
     * @param {string} evtName
     * @param {object} params
     * @param {boolean} clearListener
     */
    emit(evtName, params, clearListener = false) {
        for (const property in this.managers) {
            this.managers[property].emit(evtName, params, clearListener);
        }
        return this;
    }
    /**
     *
     * @param {string} evtName
     * @param {ListenerInterface} listener
     * @return {EventManager}
     */
    remove(evtName, listener) {
        for (const property in this.managers) {
            this.managers[property].remove(evtName, listener);
        }
        return this;
    }
}
exports.EventManagerAggregate = EventManagerAggregate;
