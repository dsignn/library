import  {EventManagerAware} from '../event/index'
import * as dgram from "dgram";
import * as net from "net";
import {BufferParse, ObjectParse, ParseInterface} from "../parse";
/**
 *
 */
export class Autodiscovery extends EventManagerAware {

    /**
     * @type {string}
     */
    static KEEP_ALIVE = 2000;

    /**
     * @type {number}
     */
    static BROADCASTER_PORT_RECEIVE = 4444;

    /**
     * @type {string}
     */
    static BROADCASTER_IP = '255.255.255.255';

    /**
    * @type {dgram.Socket}
    */
    private udpClient: dgram.Socket;

    /**
     * @param string
     */
    private channel: string;

    /**
     * @param number
     */
    private intevalId: number;

    /**
     * @param channel: string
     */
    constructor(channel: string, broadcasterPortReceive: number) {
        super();
        
        this.channel = channel;

        this.udpClient = this._createUdpClientBroadcaster(broadcasterPortReceive);

        let test = setInterval(
            this._sendBroadcasterMessage.bind(this),
            Autodiscovery.KEEP_ALIVE
        );
    }

    /**
     * @param broadcasterPortReceive: number
     * @return {module:dgram.Socket}
     * @private
     */
     private _createUdpClientBroadcaster(broadcasterPortReceive: number) {

        let updClient = require('dgram').createSocket("udp4");

        updClient.on('listening', this._onBroadcasterListening.bind(this));

        updClient.on('message', this._onBroadcasterMessage.bind(this));

        updClient.on('error', this._onBroadcasterError.bind(this));

        updClient.bind(broadcasterPortReceive ? Autodiscovery.BROADCASTER_PORT_RECEIVE : broadcasterPortReceive);

        return updClient;
    }

    /**
     * @private
     */
     private _onBroadcasterListening() {
        this.udpClient.setBroadcast(true);
    }

    /**
     * @param message
     * @param info
     * @private
     */
     private _onBroadcasterMessage(message, info) {
        let jsonMessage = JSON.parse(message.toString());
        console.log('BROADCASTER RECEIVER', info.address, jsonMessage);
       
    }

    /**
     * @param error
     * @private
     */
    private _onBroadcasterError(error: object) {
        // TODO capire cosa fare
        console.log('BROADCASTER ERROR', error);
    }

    /**
     * 
     */
    private _sendBroadcasterMessage() {

        
        let message = {
            autodiscovery: this.channel
        };
        console.log( JSON.stringify(message));
        this.udpClient.send(
            JSON.stringify(message),
            0, 
            JSON.stringify(message).length,
            Autodiscovery.BROADCASTER_PORT_RECEIVE, 
            Autodiscovery.BROADCASTER_IP
        );
    }
}
