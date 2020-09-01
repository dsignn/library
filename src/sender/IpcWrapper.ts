import {SenderInterface} from "./index";
/**
 *
 */
export class IpcWrapper implements SenderInterface {

    /**
     *
     */
    ipc: any = require('electron').ipcRenderer;

    /**
     * @inheritDoc
     */
    public send(evt: string, data: object): void {
        if ( typeof data !== 'object' ) {
            throw new Error('Invalid data type for Ipc wrapper');
        }

        this.ipc.send(
            evt,
            JSON.stringify(data)
        );
    }
}