import { EventManagerAware } from '../event/index';
/**
 *
 */
export declare class P2p extends EventManagerAware {
    /**
     * @type {string}
     */
    static SERVER_MESSAGE: string;
    /**
     * @type {string}
     */
    static ADAPTER_TCP: string;
    /**
     * @type {string}
     */
    static BROADCASTER_IP: string;
    /**
     * @param string
     */
    private identifier;
    /**
     *
     */
    private udpOptions;
    /**
     * @type {dgram.Socket}
     */
    private udpClient;
    /**
     * @type {net.Server}
     */
    private clientServer;
    /**
     *
     */
    private clientOption;
    /**
     * @type {Array}
     */
    private clients;
    /**
     * @type {null}
     */
    private senderParser;
    /**
     * @type {null}
     */
    private receiverParser;
    /**
     * @param udpOptions
     * @param clientOption
     * @param identifier
     */
    constructor(udpOptions: any, clientOption: any, identifier: string);
    /**
     * @return {module:dgram.Socket}
     * @private
     */
    private _createUdpClientBroadcaster;
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
     * @param {string} ip
     * @return {any}
     * @private
     */
    private _createServer;
    /**
     * @param ip
     * @param port
     */
    addClient(ip: any, port: any): void;
    /**
     * @param message
     * @private
     */
    private _onServerMessage;
    /**
     * @param message
     * @private
     */
    private _onClientMessage;
    /**
     * @private
     */
    private _clearEndConnection;
    /**
     * @return {{debugString: *, ip: String}}
     */
    generateMessage(): {
        id: string;
        port: any;
    };
    /**
     * @private
     */
    _loopAlive(): void;
    /**
     * @param {string} ip
     * @return {boolean}
     */
    hasIpClient(ip: any): boolean;
    /**
     * @param {object} message
     */
    send(message: object): void;
    /**
     *
     */
    runKeepAlive(): void;
}
