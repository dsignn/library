import { EventManagerAware } from '../event/index';
/**
 *
 */
export declare class Autodiscovery extends EventManagerAware {
    /**
     * @type {string}
     */
    static KEEP_ALIVE: number;
    /**
     * @type {number}
     */
    static BROADCASTER_PORT_RECEIVE: number;
    /**
     * @type {string}
     */
    static BROADCASTER_IP: string;
    /**
    * @type {dgram.Socket}
    */
    private udpClient;
    /**
     * @param string
     */
    private channel;
    /**
     * @param number
     */
    private intevalId;
    /**
     * @param channel: string
     */
    constructor(channel: string, broadcasterPortReceive: number);
    /**
     * @param broadcasterPortReceive: number
     * @return {module:dgram.Socket}
     * @private
     */
    private _createUdpClientBroadcaster;
    private _onBroadcasterConnect;
    /**
     * @private
     */
    private _onBroadcasterListening;
    /**
     * @param message
     * @param info
     * @private
     */
    private _onBroadcasterMessage;
    /**
     * @param error
     * @private
     */
    private _onBroadcasterError;
    /**
     *
     */
    private _sendBroadcasterMessage;
}
