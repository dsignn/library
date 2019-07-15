import {EventManagerInterface, EventManager} from "../../../event/index";

/**
 *
 */
export class MongoDb {

    /**
     * @type {string}
     */
    public static READY_CONNECTION = 'ready-connection';

    /**
     * @type {string}
     */
    protected uri: string = '127.0.0.1';

    /**
     * @type {number}
     */
    protected port: number = 27017;

    /**
     * @type {string}
     */
    protected name: string;

    /**
     * type
     */
    protected db: any;

    /**
     * @type {EventManagerInterface}
     */
    protected eventManager:EventManagerInterface = new EventManager();

    /**
     *
     * @param {string} name
     * @param {string} uri
     * @param {number} port
     * @param {Object} options
     */
    constructor(name: string, uri: string, port?: number, options?: object) {

        /**
         * @type {string}
         */
        this.name = name;

        /**
         * @type {string}
         */
        this.uri = uri;

        /**
         * @type {string}
         */
        this.port = port ? port : this.port;

        options = options ? options : {};
        options = Object.assign(options,  { useNewUrlParser: true });

        const mongoClient = require('mongodb');
        mongoClient.connect(`mongodb://${this.uri}:${this.port}/${this.name}`, options).then((client) => {
            this.db = client.db();

            this.eventManager.emit(MongoDb.READY_CONNECTION, this);
        });
    }

    /**
     * @return {any}
     */
    public getDb() {
        return this.db;
    }

    /**
     * @return {EventManagerInterface}
     */
    public getEventManager() {
        return this.eventManager;
    }

    /**
     * @return {boolean | any}
     */
    public isConnected() {
        return !!this.db && !!this.db.topology  && this.db.topology.isConnected();
    }
}