import { SenderInterface } from "./index";
/**
 *
 */
export declare class IpcWrapper implements SenderInterface {
    /**
     *
     */
    ipc: any;
    /**
     * @inheritDoc
     */
    send(evt: string, data: object): void;
}
