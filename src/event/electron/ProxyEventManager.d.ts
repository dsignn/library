import { EventManagerInterface } from "./../EventManagerInterface";
import { ListenerInterface } from "./../ListenerInterface";
/**
 * @class
 * EventManagerInterface
 */
export declare class ProxyEventManager implements EventManagerInterface {
    /**
     * @type {}
     */
    private ipc;
    /**
     * @type {object}
     */
    private listeners;
    /**
     * @type {string}
     */
    private nameProxy;
    constructor(ipc: any);
    /**
     * @param nameProxy
     * @returns this
     */
    setNameProxy(nameProxy: any): this;
    /**
     * @param {string} evtName
     * @param listener
     * @return EventManager
     */
    on(evtName: string, listener: any): void;
    /**
     * @param {string} evtName
     * @param {object} params
     * @param {boolean} c,learListener
     */
    emit(evtName: string, params: object, clearListener?: boolean): void;
    /**
     *
     * @param {string} evtName
     * @param {ListenerInterface} listener
     * @return {EventManager}
     */
    remove(evtName: string, listener: ListenerInterface): void;
}
