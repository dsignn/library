import { Event } from "./Event";
/**
 * @class
 * EventManagerInterface
 */
export class EventManager {
    constructor() {
        /**
         * @type {object}
         */
        this.listeners = {};
    }
    /**
     * @param {string} evtName
     * @param listener
     * @return EventManager
     */
    on(evtName, listener) {
        if (!this.listeners[evtName]) {
            this.listeners[evtName] = [];
        }
        this.listeners[evtName].push(listener);
        return this;
    }
    /**
     * @param {string} evtName
     * @param {object} params
     * @param {boolean} clearListener
     */
    emit(evtName, params, clearListener = false) {
        if (this.listeners[evtName] !== undefined) {
            let event = new Event(evtName, params);
            for (let cont = 0; this.listeners[evtName].length > cont; cont++) {
                console.log(typeof this.listeners[evtName][cont] === 'object' && typeof this.listeners[evtName][cont]['execute'] == 'function');
                switch (true) {
                    case typeof this.listeners[evtName][cont] === 'object' && typeof this.listeners[evtName][cont]['execute'] == 'function':
                        this.listeners[evtName][cont].execute(event);
                        break;
                    default:
                        this.listeners[evtName][cont](event);
                }
                if (event.getStopPropagation() === true) {
                    break;
                }
            }
            if (clearListener) {
                delete this.listeners[evtName];
            }
        }
    }
    /**
     *
     * @param {string} evtName
     * @param {ListenerInterface} listener
     * @return {EventManager}
     */
    remove(evtName, listener) {
        if (this.listeners[evtName] !== undefined) {
            for (let cont = 0; this.listeners[evtName].length > cont; cont++) {
                if (listener === this.listeners[evtName][cont]) {
                    this.listeners[evtName].splice(cont, 1);
                    break;
                }
            }
        }
        return this;
    }
}
//# sourceMappingURL=EventManager.js.map