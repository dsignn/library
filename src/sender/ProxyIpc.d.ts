import { SenderInterface } from "./index";
/**
 *
 */
export declare class ProxyIpc implements SenderInterface {
    /**
     * @type string
     */
    nameProxy: string;
    /**
     *
     */
    ipc: any;
    /**
     *
     */
    constructor(nameProxy: any);
    /**
     * @inheritDoc
     */
    send(evt: string, data: any): void;
    /**
     * @param {string} evt
     * @param message
     * @return {object}
     */
    protected generateMessage(evt: string, message: any): object;
}
