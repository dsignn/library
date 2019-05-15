import {EventManagerInterface} from "./EventManagerInterface"
import {Event} from "./Event"
import {ListenerInterface} from "./ListenerInterface";
import {Listener} from "./Listener";

/**
 * EventManagerInterface
 */
export class EventManager implements EventManagerInterface {

    /**
     * @type {object}
     */
    private listeners:object= {};

    /**
     * @param {string} evtName
     * @param listener
     * @return EventManager
     */
    on(evtName: string, listener: any) {

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
    emit(evtName: string, params: object, clearListener: boolean = false) {

        if (this.listeners[evtName] !== undefined) {
            let event = new Event(evtName, params);
            for (let cont = 0; this.listeners[evtName].length > cont; cont++) {

                switch (true) {
                    case this.listeners[evtName][cont] instanceof  Listener === true:
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
    remove(evtName: string,  listener: ListenerInterface) {
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