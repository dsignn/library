/**
 * @class
 * EventManagerInterface
 */
export class ProxyEventManager {
    constructor(ipc) {
        /**
         * @type {}
         */
        this.ipc = {};
        /**
         * @type {object}
         */
        this.listeners = {};
        /**
         * @type {string}
         */
        this.nameProxy = 'proxy';
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
    on(evtName, listener) {
        this.ipc.on(evtName, listener);
    }
    /**
     * @param {string} evtName
     * @param {object} params
     * @param {boolean} c,learListener
     */
    emit(evtName, params, clearListener = false) {
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
    remove(evtName, listener) {
        this.ipc.removeListener(evtName);
    }
}
//# sourceMappingURL=ProxyEventManager.js.map