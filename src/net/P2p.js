import { EventManagerAware } from '../event/index';
import { BufferParse, ObjectParse } from "../parse";
/**
 *
 */
export class P2p extends EventManagerAware {
    /**
     * @param udpOptions
     * @param clientOption
     * @param identifier
     */
    constructor(udpOptions, clientOption, identifier) {
        super();
        /**
         *
         */
        this.udpOptions = {};
        /**
         *
         */
        this.clientOption = {};
        /**
         * @type {Array}
         */
        this.clients = {};
        /**
         * @type {null}
         */
        this.senderParser = new ObjectParse();
        /**
         * @type {null}
         */
        this.receiverParser = new BufferParse();
        /**
         * @type {string}
         */
        this.identifier = identifier;
        /**
         * @type {Object}
         */
        this.udpOptions = udpOptions;
        this.udpClient = this._createUdpClientBroadcaster();
        /**
         * @type {Object}
         */
        this.clientOption = clientOption;
    }
    /**
     * @return {module:dgram.Socket}
     * @private
     */
    _createUdpClientBroadcaster() {
        let updClient = require('dgram').createSocket("udp4");
        updClient.on('listening', this._onBroadcasterListening.bind(this));
        updClient.on('message', this._onBroadcasterMessage.bind(this));
        updClient.on('error', this._onBroadcasterError.bind(this));
        updClient.bind(this.udpOptions.portListening);
        return updClient;
    }
    /**
     * @private
     */
    _onBroadcasterListening() {
        console.log('BROADCASTER LISTENING');
        this.udpClient.setBroadcast(true);
    }
    /**
     * @param message
     * @param info
     * @private
     */
    _onBroadcasterMessage(message, info) {
        let jsonMessage = JSON.parse(message.toString());
        console.log(info.address, jsonMessage);
        /**
         * me
         */
        if (jsonMessage.id === this.identifier) {
            if (!this.clientServer) {
                this.clientServer = this._createServer(info.address);
            }
            return;
        }
        if (!this.hasIpClient(info.address) && this.clientServer) {
            this.clients[info.address] = {};
            this.addClient(info.address, jsonMessage.port);
        }
    }
    /**
     * @param error
     * @private
     */
    _onBroadcasterError(error) {
        console.log('BROADCASTER ERROR', error);
    }
    /**
     * @param {string} ip
     * @return {any}
     * @private
     */
    _createServer(ip) {
        console.log('CREATE SERVER', this.clientOption.port, ip, this.clientOption.type);
        let server;
        switch (this.clientOption.type) {
            case P2p.ADAPTER_TCP:
                let net = require('net');
                server = net.createServer((socket) => {
                    socket.write('Echo server' + this.identifier);
                    socket.pipe(socket);
                    socket.on('data', this._onServerMessage.bind(this));
                });
                server.listen(this.clientOption.port, ip);
                break;
            default:
                throw 'Type adapter not found';
                break;
        }
        return server;
    }
    /**
     * @param ip
     * @param port
     */
    addClient(ip, port) {
        switch (this.clientOption.type) {
            case P2p.ADAPTER_TCP:
                console.log('CLIENT CREAZIONE', ip);
                try {
                    let net = require('net');
                    let client = new net.Socket();
                    client.connect(port, ip, () => {
                        console.log('CLIENT CONNESSO');
                        this.clients[ip] = client;
                    });
                    client.on('data', this._onClientMessage.bind(this));
                    client.on('close', () => {
                        console.warn('CLOSE CLIENT');
                        this._clearEndConnection();
                    });
                    client.on('error', (err) => {
                        console.warn('ERROR CLIENT', err);
                        this._clearEndConnection();
                    });
                    client.on('end', (err) => {
                        console.warn('END CLIENT', err);
                        this._clearEndConnection();
                    });
                }
                catch (e) {
                    console.error(e);
                }
                break;
            default:
                throw 'Type adapter not found';
                break;
        }
    }
    /**
     * @param message
     * @private
     */
    _onServerMessage(message) {
        let parsedMessage = this.receiverParser.parse(message);
        console.log('SERVER MESSAGE', parsedMessage);
        this.getEventManager().emit(P2p.SERVER_MESSAGE, parsedMessage);
    }
    /**
     * @param message
     * @private
     */
    _onClientMessage(message) {
        console.log('CLIENT MESSAGE', message.toString());
    }
    /**
     * @private
     */
    _clearEndConnection() {
        for (let property in this.clients) {
            if (this.clients[property] && !this.clients[property].connecting) {
                this.clients[property].destroy();
                delete this.clients[property];
            }
        }
    }
    /**
     * @return {{debugString: *, ip: String}}
     */
    generateMessage() {
        return {
            'id': this.identifier,
            'port': this.clientOption.port
        };
    }
    /**
     * @private
     */
    _loopAlive() {
        setTimeout(() => {
            let stringMessage = JSON.stringify(this.generateMessage());
            // console.log("SEND MESSAGE", stringMessage);
            this.udpClient.send(stringMessage, 0, stringMessage.length, this.udpOptions.portSender, P2p.BROADCASTER_IP);
            this._loopAlive();
        }, this.udpOptions.transmissionTimeout);
    }
    /**
     * @param {string} ip
     * @return {boolean}
     */
    hasIpClient(ip) {
        return !!this.clients[ip];
    }
    /**
     * @param {object} message
     */
    send(message) {
        let parsedMessage = this.senderParser.parse(message);
        for (let property in this.clients) {
            this.clients[property].write(parsedMessage);
        }
    }
    /**
     *
     */
    runKeepAlive() {
        this._loopAlive();
    }
}
/**
 * @type {string}
 */
P2p.SERVER_MESSAGE = 'message';
/**
 * @type {string}
 */
P2p.ADAPTER_TCP = 'tcp';
/**
 * @type {string}
 */
P2p.BROADCASTER_IP = '255.255.255.255';
//# sourceMappingURL=P2p.js.map