import { EventManagerInterface } from "./EventManagerInterface";
import { ListenerInterface } from "./ListenerInterface";
/**
 * EventManagerInterface
 */
export declare class EventManager implements EventManagerInterface {
    /**
     * @type {object}
     */
    private listeners;
    /**
     * @param {string} evtName
     * @param listener
     * @return EventManager
     */
    on(evtName: string, listener: any): this;
    /**
     * @param {string} evtName
     * @param {object} params
     * @param {boolean} clearListener
     */
    emit(evtName: string, params: object, clearListener?: boolean): void;
    /**
     *
     * @param {string} evtName
     * @param {ListenerInterface} listener
     * @return {EventManager}
     */
    remove(evtName: string, listener: ListenerInterface): this;
}
