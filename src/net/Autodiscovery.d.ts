import { EventManagerAware } from '../event/index';
/**
 *
 */
export declare class Autodiscovery extends EventManagerAware {
    /**
     * Events
     */
    static ERROR_MESSAGE_FORMAT: string;
    /**
     * Messages
     */
    static TYPE_MESSAGE_AUTODISCOVERY: string;
    /**
     * Messages
     */
    static ADD_NODE_EVT: string;
    /**
     * Messages
     */
    static REMOVE_NODE_EVT: string;
    /**
     * @type {number}
     */
    static KEEP_ALIVE: number;
    /**
     * @type {number}
     */
    static TIME_TO_CONTROLL_NODE: number;
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
    * @type {boolean}
    */
    private isUdpClietClose;
    /**
     * @param string
     */
    private channel;
    /**
   * @param string
     */
    private identity;
    /**
     * @param Object
     */
    private nodes;
    /**
     * @param channel: string
     */
    constructor(channel: string, broadcasterPortReceive: number);
    /**
     * @returns Array
     */
    getNodes(): any[];
    disconnect(): void;
    /**
     * @param broadcasterPortReceive: number
     * @return {module:dgram.Socket}
     */
    private connect;
    private _onBroadcasterClose;
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
     * @private
     */
    private _sendBroadcasterMessage;
    /**
     * @private
     */
    private _checkNodeAlive;
}
