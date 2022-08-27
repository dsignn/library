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
     * type
     */
    protected options: any;

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

        /**
         * Options connection
         */
        this.options = options ? options : {};
        this.options = Object.assign(options,  { useNewUrlParser: true });
    }

    /**
     * Connect to db
     */
    connect() {
        const { MongoClient } = require("mongodb");
        const mongoClient = new MongoClient(`mongodb://${this.uri}:${this.port}/${this.name}`, this.options);

        
        mongoClient.connect()
            .then((client) => {

                this.db = client.db();
                this.eventManager.emit(MongoDb.READY_CONNECTION, this);
            }).catch((error) => {
                console.error(error)
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