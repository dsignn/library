import {SenderInterface} from "./index";
/**
 *
 */
export class ProxyIpc implements SenderInterface {

    /**
     * @type string
     */
    nameProxy: string;

    /**
     *
     */
    ipc: any = require('electron').ipcRenderer;

     /**
      *
      */
     constructor(nameProxy) {
         /**
          *
          */
         this.nameProxy = nameProxy;
    }

    /**
     * @inheritDoc
     */
    public send(evt: string, data: any): void {
        this.ipc.send(this.nameProxy, this.generateMessage(evt, data));
    }

    /**
     * @param {string} evt
     * @param message
     * @return {object}
     */
    protected generateMessage(evt: string, message: any): object {
        let compositeMess = {};
        compositeMess['event'] = evt;
        compositeMess['data'] = message;

        return compositeMess;
    }
}