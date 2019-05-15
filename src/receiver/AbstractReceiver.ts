import {ReceiverInterface} from "./index";

/**
 *
 */
export abstract class AbstractReceiver implements ReceiverInterface{

    /**
     * @param {string} evt
     * @param data
     */
    abstract on(evt: string, data: any): void;
}