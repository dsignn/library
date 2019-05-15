
/**
 *
 */
export interface ReceiverInterface {

    /**
     * @param {string} evt
     * @param data
     */
    on(evt: string, data: any): void;
}