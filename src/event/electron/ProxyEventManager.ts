import {EventManagerInterface} from "./../EventManagerInterface"
import {Event} from "./../Event"
import {ListenerInterface} from "./../ListenerInterface";

/**
 * @class
 * EventManagerInterface
 */
export class ProxyEventManager implements EventManagerInterface {

    /**
     * @type {}
     */
    private ipc: any= {};

    /**
     * @type {object}
     */
    private listeners:object = {};

    /**
     * @type {string}
     */
    private nameProxy: string = 'proxy'; 


    constructor(ipc) {
        this.ipc = ipc;
    }

    /**
     * @param nameProxy 
     * @returns this
     */
    setNameProxy(nameProxy) {
        this.nameProxy = nameProxy;
        return this;
    }

    /**
     * @param {string} evtName
     * @param listener
     * @return EventManager
     */
    on(evtName: string, listener: any) {

        this.ipc.on(evtName, listener)
    }

    /**
     * @param {string} evtName
     * @param {object} params
     * @param {boolean} c,learListener
     */
    emit(evtName: string, params: object, clearListener: boolean = false) {
                   
        let message = {
            event: evtName,
            data: {
                params
            }
        };

       this.ipc.send(evtName, message);
    }

    /**
     *
     * @param {string} evtName
     * @param {ListenerInterface} listener
     * @return {EventManager}
     */
    remove(evtName: string,  listener: ListenerInterface) {
        this.ipc.removeListener(evtName);
    }
}