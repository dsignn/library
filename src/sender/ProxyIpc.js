/**
 *
 */
export class ProxyIpc {
    /**
     *
     */
    constructor(nameProxy) {
        /**
         *
         */
        this.ipc = require('electron').ipcRenderer;
        /**
         *
         */
        this.nameProxy = nameProxy;
    }
    /**
     * @inheritDoc
     */
    send(evt, data) {
        this.ipc.send(this.nameProxy, this.generateMessage(evt, data));
    }
    /**
     * @param {string} evt
     * @param message
     * @return {object}
     */
    generateMessage(evt, message) {
        let compositeMess = {};
        compositeMess['event'] = evt;
        compositeMess['data'] = message;
        return compositeMess;
    }
}
//# sourceMappingURL=ProxyIpc.js.map