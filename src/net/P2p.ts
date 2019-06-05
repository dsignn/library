import  {EventManagerAware} from '../event/index'
import * as dgram from "dgram";
import * as net from "net";
import {BufferParse, ObjectParse, ParseInterface} from "../parse";
/**
 *
 */
export class P2p extends EventManagerAware {


    /**
     * @type {string}
     */
    static SERVER_MESSAGE = 'message';

    /**
     * @type {string}
     */
    static ADAPTER_TCP = 'tcp';

    /**
     * @type {string}
     */
    static BROADCASTER_IP = '255.255.255.255';

    /**
     * @param string
     */
    private identifier: string;

    /**
     *
     */
    private udpOptions: any = {};

    /**
     * @type {dgram.Socket}
     */
    private udpClient: dgram.Socket;

    /**
     * @type {net.Server}
     */
    private clientServer: net.Server;

    /**
     *
     */
    private clientOption: any = {};

    /**
     * @type {Array}
     */
    private clients: Array<any> = [];

    /**
     * @type {null}
     */
    private senderParser: ParseInterface = new ObjectParse();

    /**
     * @type {null}
     */
    private receiverParser: ParseInterface = new BufferParse();

    /**
     * @param udpOptions
     * @param clientOption
     * @param identifier
     */
    constructor(udpOptions: any, clientOption: any, identifier: string) {
        super();
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
    private _createUdpClientBroadcaster() {

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
    private _onBroadcasterListening() {
        console.log('BROADCASTER LISTENING');
        this.udpClient.setBroadcast(true);
    }

    /**
     * @param message
     * @param info
     * @private
     */
    private _onBroadcasterMessage(message, info) {
        let jsonMessage = JSON.parse(message.toString());
        console.log(jsonMessage, this.clientServer);
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
            this.appendClient(info.address, jsonMessage.port);
        }
    }

    /**
     * @param error
     * @private
     */
    private _onBroadcasterError(error: object) {
        console.log('BROADCASTER ERROR', error);
    }

    /**
     * @param {string} ip
     * @return {any}
     * @private
     */
    private _createServer(ip: string) {

        console.log('CREATE SERVER',this.clientOption.port,  ip, this.clientOption.type);
        let server;
        switch (this.clientOption.type) {
            case P2p.ADAPTER_TCP:
                let net = require('net');

                server = net.createServer((socket) => {
                    socket.write('Echo server' + this.identifier);
                    socket.pipe(socket);

                    socket.on('data', this._onServerMessage.bind(this));
                });

                server.listen(this.clientOption.port,  ip);
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
    appendClient(ip, port) {
        switch (this.clientOption.type) {
            case P2p.ADAPTER_TCP:
                console.log('CLIENT CREAZIONE', ip);
                try {
                    let net = require('net');

                    let client = new net.Socket();
                    client.connect(port, ip, () => {
                        console.log('CLIENT CONNESSO');
                        this.clients.push(client);
                    });

                    client.on('data', this._onClientMessage.bind(this));

                    client.on('close', function() {
                        console.log('CLIENT CHIUSO');
                        this.p2p._clearEndConnection();
                    }.bind({client : client, p2p : this}));

                } catch (e) {
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
    private _onServerMessage(message: any) {
        let parsedMessage = this.receiverParser.parse(message);
        console.log('SERVER MESSAGE', parsedMessage);
        this.getEventManager().emit(P2p.SERVER_MESSAGE, parsedMessage);
    }

    /**
     * @param message
     * @private
     */
    private _onClientMessage(message: any) {
        console.log('CLIENT MESSAGE', message.toString());
    }

    /**
     * @private
     */
    private _clearEndConnection() {
        for (let cont = 0; this.clients.length > cont; cont++) {
            if (this.clients[cont] && !this.clients[cont].connecting) {
                this.clients[cont].destroy();
                this.clients.splice(cont, 1);
            }
        }
    }

    /**
     * @return {{debugString: *, ip: String}}
     */
    generateMessage() {
        return {
            'id' : this.identifier,
            'port' : this.clientOption.port
        };
    }

    /**
     * @private
     */
    _loopAlive() {
        setTimeout(
            () =>  {
                let stringMessage = JSON.stringify(this.generateMessage());
                // console.log("SEND MESSAGE", stringMessage);
                this.udpClient.send(stringMessage, 0, stringMessage.length, this.udpOptions.portSender, P2p.BROADCASTER_IP);
                this._loopAlive();
            },
            this.udpOptions.transmissionTimeout
        );
    }

    /**
     * @param {string} ip
     * @return {boolean}
     */
    public hasIpClient(ip) {
        return this.clients.findIndex((element) => {
            return element.remoteAddress === ip;
        }) >= 0;
    }

    /**
     * @param {object} message
     */
    public send(message: object) {
        let parsedMessage = this.senderParser.parse(message);
        for (let cont = 0; this.clients.length > cont; cont++) {
            this.clients[cont].write(parsedMessage);
        }
    }

    /**
     *
     */
    public runKeepAlive() {
        this._loopAlive();
    }
}
