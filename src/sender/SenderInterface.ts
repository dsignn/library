/**
 *
 */
export interface SenderInterface {

    /**
     * @param {string} evt
     * @param data
     */
    send(evt: string, data: any): void;
}