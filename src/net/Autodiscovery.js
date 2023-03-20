import { EventManagerAware } from '../event/index';
/**
 *
 */
export class Autodiscovery extends EventManagerAware {
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
        updClient.on('listening', this._onBroadcasterListening.bind(this));
        updClient.on('message', this._onBroadcasterMessage.bind(this));
        updClient.on('error', this._onBroadcasterError.bind(this));
        updClient.bind(broadcasterPortReceive ? Autodiscovery.BROADCASTER_PORT_RECEIVE : broadcasterPortReceive);
        return updClient;
    }
    /**
     * @private
     */
    _onBroadcasterListening() {
        this.udpClient.setBroadcast(true);
    }
    /**
     * @param message
     * @param info
     * @private
     */
    _onBroadcasterMessage(message, info) {
        let jsonMessage = JSON.parse(message.toString());
        console.log('BROADCASTER RECEIVER', info.address, jsonMessage);
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
        console.log(JSON.stringify(message));
        this.udpClient.send(JSON.stringify(message), 0, JSON.stringify(message).length, Autodiscovery.BROADCASTER_PORT_RECEIVE, Autodiscovery.BROADCASTER_IP);
    }
}
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
//# sourceMappingURL=Autodiscovery.js.map