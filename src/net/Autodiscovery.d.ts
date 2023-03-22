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
     * Events
     */
    static ERROR_MESSAGE: string;
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
     * inteval to star the sending message
     */
    private intervalIdSendMessage;
    /**
     * @param channel: string
     */
    constructor(channel: string, broadcasterPortReceive: number);
    /**
     * Start timer to send message to comunicate that a node has on the network
     */
    startBroadcastMessage(): void;
    /**
     * Stop timer to send message
     */
    stopBroadcastMessage(): void;
    /**
     * @returns Array
     */
    getNodes(): any[];
    /**
     * Disconnect node to autodiscovery process
     */
    disconnect(): void;
    /**
     * @returns {boolean}
     */
    isClose(): boolean;
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
     * @param error
     * @private
     */
    private _onBroadcasterError;
    /**
     * @param message
     * @param info
     * @private
     */
    private _onBroadcasterReceiveMessage;
    /**
     * @private
     */
    private _sendBroadcasterSendMessage;
    /**
     * @private
     */
    private _checkNodeAlive;
}
