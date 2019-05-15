import {SenderInterface} from "./index";

/**
 *
 */
export abstract class AbstractSender implements SenderInterface {

    /**
     * @param {string} evt
     * @param data
     */
    abstract send(evt: string, data: any): void;

}
