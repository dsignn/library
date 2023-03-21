import { EventManager } from "../../../event/index";
/**
 *
 */
class MongoDb {
    /**
     *
     * @param {string} name
     * @param {string} uri
     * @param {number} port
     * @param {Object} options
     */
    constructor(name, uri, port, options) {
        /**
         * @type {string}
         */
        this.uri = '127.0.0.1';
        /**
         * @type {number}
         */
        this.port = 27017;
        /**
         * @type {EventManagerInterface}
         */
        this.eventManager = new EventManager();
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
        this.options = Object.assign(options, { useNewUrlParser: true });
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
            console.error(error);
        });
    }
    /**
     * @return {any}
     */
    getDb() {
        return this.db;
    }
    /**
     * @return {EventManagerInterface}
     */
    getEventManager() {
        return this.eventManager;
    }
    /**
     * @return {boolean | any}
     */
    isConnected() {
        return !!this.db && !!this.db.topology && this.db.topology.isConnected();
    }
}
/**
 * @type {string}
 */
MongoDb.READY_CONNECTION = 'ready-connection';
export { MongoDb };
//# sourceMappingURL=MongoDb.js.map