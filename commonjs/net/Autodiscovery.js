"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Autodiscovery = void 0;
const index_1 = require("../event/index");
/**
 *
 */
class Autodiscovery extends index_1.EventManagerAware {
    /**
     * @param channel: string
     */
    constructor(channel, broadcasterPortReceive) {
        super();
        this.channel = channel;
        this.udpClient = this._createUdpClientBroadcaster(broadcasterPortReceive);
        let test = setInterval(this._sendBroadcasterMessage.bind(this), Autodiscovery.KEEP_ALIVE);
    }
    /**
     * @param broadcasterPortReceive: number
     * @return {module:dgram.Socket}
     * @private
     */
    _createUdpClientBroadcaster(broadcasterPortReceive) {
        let updClient = require('dgram').createSocket("udp4");
        updClient.on('connect', this._onBroadcasterConnect.bind(this));
        updClient.on('listening', this._onBroadcasterListening.bind(this));
        updClient.on('message', this._onBroadcasterMessage.bind(this));
        updClient.on('error', this._onBroadcasterError.bind(this));
        updClient.bind(broadcasterPortReceive ? broadcasterPortReceive : Autodiscovery.BROADCASTER_PORT_RECEIVE);
        return updClient;
    }
    _onBroadcasterConnect(data) {
        console.log('CONNECTION AUTODISCOVERY', data);
    }
    /**
     * @private
     */
    _onBroadcasterListening() {
        console.log('LISTENING AUTODISCOVERY');
        this.udpClient.setBroadcast(true);
    }
    /**
     * @param message
     * @param info
     * @private
     */
    _onBroadcasterMessage(message, info) {
        let jsonMessage = JSON.parse(message.toString());
        console.log('RECEIVER AUTODISCOVERY', info.address, jsonMessage);
    }
    /**
     * @param error
     * @private
     */
    _onBroadcasterError(error) {
        // TODO capire cosa fare
        console.log('BROADCASTER ERROR', error);
    }
    /**
     *
     */
    _sendBroadcasterMessage() {
        let message = {
            autodiscovery: this.channel
        };
        console.log('MESSAGE AUTODISCOVERY', JSON.stringify(message));
        this.udpClient.send(JSON.stringify(message), 0, JSON.stringify(message).length, Autodiscovery.BROADCASTER_PORT_RECEIVE, Autodiscovery.BROADCASTER_IP);
    }
}
exports.Autodiscovery = Autodiscovery;
/**
 * @type {string}
 */
Autodiscovery.KEEP_ALIVE = 2000;
/**
 * @type {number}
 */
Autodiscovery.BROADCASTER_PORT_RECEIVE = 4444;
/**
 * @type {string}
 */
Autodiscovery.BROADCASTER_IP = '255.255.255.255';
