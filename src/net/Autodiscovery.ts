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
     * Events
     */
    static ERROR_MESSAGE = 'error-message';

    /**
     * Messages
     */
    static TYPE_MESSAGE_AUTODISCOVERY = 'autodiscovery';

    /**
     * Messages
     */
    static ADD_NODE_EVT = 'add_node';

    /**
     * Messages
     */
    static REMOVE_NODE_EVT = 'remove_node';

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
    private udpClient: any;

    /**
    * @type {boolean}
    */
    private isUdpClietClose: boolean = true;

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
    private nodes: Object = {};

    /**
     * inteval to star the sending message
     */
    private intervalIdSendMessage: any;

    /**
     * @param channel: string
     */
    constructor(channel: string, broadcasterPortReceive: number) {
        super();
        
        this.channel = channel;

        this.identity = (Math.random() + 1).toString(36).substring(2);

        this.connect(broadcasterPortReceive);

        setInterval(
            this._checkNodeAlive.bind(this),
            Autodiscovery.TIME_TO_CONTROLL_NODE
        );
    }

    /**
     * Start timer to send message to comunicate that a node has on the network
     */
    startBroadcastMessage() {
        this.intervalIdSendMessage = setInterval(
            this._sendBroadcasterSendMessage.bind(this),
            Autodiscovery.KEEP_ALIVE
        );
    }

    /**
     * Stop timer to send message
     */
    stopBroadcastMessage() {
        clearInterval(this.intervalIdSendMessage);
    }

    /**
     * @returns Array
     */
    getNodes() {
        return Object.values(this.nodes);
    }

    /**
     * Disconnect node to autodiscovery process
     */
    disconnect() {
 
        this.udpClient.close();
        this.stopBroadcastMessage();
    }

    /**
     * @returns {boolean}
     */
    isClose(){
        return this.isUdpClietClose;
    }

    /**
     * @param broadcasterPortReceive: number
     * @return {module:dgram.Socket}
     */
     private connect(broadcasterPortReceive: number) {

        this.udpClient  = require('dgram').createSocket("udp4");

        this.udpClient.on('close', this._onBroadcasterClose.bind(this));

        this.udpClient.on('listening', this._onBroadcasterListening.bind(this));

        this.udpClient.on('message', this._onBroadcasterReceiveMessage.bind(this));

        this.udpClient.on('error', this._onBroadcasterError.bind(this));

        this.udpClient.bind(broadcasterPortReceive ? broadcasterPortReceive :  Autodiscovery.BROADCASTER_PORT_RECEIVE);

        this.startBroadcastMessage();
        console.log('CONNECT AUTODISCOVERY');
    }

    private _onBroadcasterClose(data) {
        this.isUdpClietClose = true;
        console.log('CLOSE AUTODISCOVERY', this.isUdpClietClose);
    }

    /**
     * @private
     */
     private _onBroadcasterListening() {
        console.log('LISTENING AUTODISCOVERY');
        this.isUdpClietClose = false;
        this.udpClient.setBroadcast(true);
    }

    /**
     * @param error
     * @private
     */
     private _onBroadcasterError(error: object) {
        // TODO capire cosa fare
        console.log('BROADCASTER ERROR', error);
        this.disconnect();
        this.getEventManager().emit(
            Autodiscovery.ERROR_MESSAGE,
            error
        );
    }

    /**
     * @param message
     * @param info
     * @private
     */
     private _onBroadcasterReceiveMessage(message, info) {

        if(this.isUdpClietClose) {
            return;
        }

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
        if(jsonMessage.typeMessagge !== Autodiscovery.TYPE_MESSAGE_AUTODISCOVERY ||
          (!jsonMessage['id'] || this.identity === jsonMessage['id']) ||
          (jsonMessage['ch'] && jsonMessage['ch'] !== this.channel) ) {
            return;
        }

        info['timeout'] =  Date.now();
        info['id'] = jsonMessage['id'];

        if(!this.nodes[jsonMessage['id']]) {
            console.log('ADD EVT');
            this.getEventManager().emit(
                Autodiscovery.ADD_NODE_EVT,
                info
            );
        }

        this.nodes[jsonMessage['id']] = info;

        console.log(
            'RECEIVE MESSAGE AUTODISCOVERY',
            Object.values(this.nodes).length,
            info['id'] 
        );
    }

    /**
     * @private
     */
    private _sendBroadcasterSendMessage() {

        if(this.isUdpClietClose) {
            return;
        }

        let message = {
            typeMessagge: Autodiscovery.TYPE_MESSAGE_AUTODISCOVERY,
        };
        
        message['id'] = this.identity;     
        message['ch'] = this.channel;     

        this.udpClient.send(
            JSON.stringify(message),
            0, 
            JSON.stringify(message).length,
            Autodiscovery.BROADCASTER_PORT_RECEIVE, 
            Autodiscovery.BROADCASTER_IP
        );

        console.log('SEND MESSAGE AUTODISCOVERY', 
            Autodiscovery.BROADCASTER_IP, 
            Autodiscovery.BROADCASTER_PORT_RECEIVE, 
            JSON.stringify(message)
        );
    }

    /**
     * @private
     */
    private _checkNodeAlive() {

        let time = Date.now();

        for (const property in this.nodes) {
   
            let inteval = time - this.nodes[property]['timeout'];
            if (inteval > Autodiscovery.KEEP_ALIVE) {

                this.getEventManager().emit(
                    Autodiscovery.REMOVE_NODE_EVT,
                    this.nodes[property]
                );
                console.log('REMOVE EVT');
                delete this.nodes[property];
            }
        }
    }
}
