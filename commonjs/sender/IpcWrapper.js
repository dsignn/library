"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IpcWrapper = void 0;
/**
 *
 */
class IpcWrapper {
    constructor() {
        /**
         *
         */
        this.ipc = require('electron').ipcRenderer;
    }
    /**
     * @inheritDoc
     */
    send(evt, data) {
        if (typeof data !== 'object') {
            throw new Error('Invalid data type for Ipc wrapper');
        }
        this.ipc.send(evt, JSON.stringify(data));
    }
}
exports.IpcWrapper = IpcWrapper;
