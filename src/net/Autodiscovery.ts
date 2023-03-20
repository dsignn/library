import  {EventManagerAware} from '../event/index'
import * as dgram from "dgram";
import * as net from "net";
import {BufferParse, ObjectParse, ParseInterface} from "../parse";
/**
 *
 */
export class Autodiscovery extends EventManagerAware {

    /**
     * Events
     */
    static ERROR_MESSAGE_FORMAT = 'error-message-format';

    /**
     * Messages
     */
    static TYPE_MESSAGE_AUTODISCOVERY = 'autodiscovery';

    /**
     * @type {number}
     */
    static KEEP_ALIVE = 8000;

    /**
     * @type {number}
     */
    static TIME_TO_CONTROLL_NODE = 3000;

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
   * @param string
     */
    private identity: string;

    /**
     * @param Object
     */
    private nodes: Object =  {};

    /**
     * @param channel: string
     */
    constructor(channel: string, broadcasterPortReceive: number) {
        super();
        
        this.channel = channel;

        this.identity = (Math.random() + 1).toString(36).substring(10);

        this.udpClient = this._createUdpClientBroadcaster(broadcasterPortReceive);

        setInterval(
            this._sendBroadcasterMessage.bind(this),
            Autodiscovery.KEEP_ALIVE
        );

        setInterval(
            this._checkNodeAlive.bind(this),
            Autodiscovery.TIME_TO_CONTROLL_NODE
        );
    }

    /**
     * @param broadcasterPortReceive: number
     * @return {module:dgram.Socket}
     * @private
     */
     private _createUdpClientBroadcaster(broadcasterPortReceive: number) {

        let updClient = require('dgram').createSocket("udp4");

        updClient.on('connect', this._onBroadcasterConnect.bind(this));

        updClient.on('listening', this._onBroadcasterListening.bind(this));

        updClient.on('message', this._onBroadcasterMessage.bind(this));

        updClient.on('error', this._onBroadcasterError.bind(this));

        updClient.bind(broadcasterPortReceive ? broadcasterPortReceive :  Autodiscovery.BROADCASTER_PORT_RECEIVE);

        return updClient;
    }


    private _onBroadcasterConnect(data) {
        console.log('CONNECTION AUTODISCOVERY', data);
    }

    /**
     * @private
     */
     private _onBroadcasterListening() {
        console.log('LISTENING AUTODISCOVERY');
        this.udpClient.setBroadcast(true);
    }

    /**
     * @param message
     * @param info
     * @private
     */
     private _onBroadcasterMessage(message, info) {

        let jsonMessage;

        /**
         * Check the format of the message
         */
        try {
            jsonMessage = JSON.parse(message.toString());
        } catch(exception) {
            this.getEventManager().emit(
                Autodiscovery.ERROR_MESSAGE_FORMAT,
                exception
            );
            return;
        }

        /**
         * Discard message send from this node
         */
        if(jsonMessage.typeMessagge === Autodiscovery.TYPE_MESSAGE_AUTODISCOVERY &&
           jsonMessage[this.identity] &&
           jsonMessage[this.identity]  === this.channel  ) {

            return;
        }

        console.log('INFO', info);
        info['timeout'] =  Date.now();
        this.nodes[this.identity] = info;
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
     * @private
     */
    private _sendBroadcasterMessage() {

        let message = {
            typeMessagge: Autodiscovery.TYPE_MESSAGE_AUTODISCOVERY,
        };
        
        message[this.identity] = this.channel;     

        this.udpClient.send(
            JSON.stringify(message),
            0, 
            JSON.stringify(message).length,
            Autodiscovery.BROADCASTER_PORT_RECEIVE, 
            Autodiscovery.BROADCASTER_IP
        );

        console.log('MESSAGE AUTODISCOVERY', JSON.stringify(message));
    }

    /**
     * @private
     */
    private _checkNodeAlive() {

        let time = Date.now();

        for (const property in this.nodes) {
            console.log('CHECK ALIVE', JSON.stringify(this.nodes[property]), time, time - this.nodes[property]['timeout']);
            let inteval = time - this.nodes[property]['timeout'];
            if (inteval > Autodiscovery.KEEP_ALIVE) {
                delete this.nodes[property];
            }
        }
    }
}
