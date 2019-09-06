"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../../event/index");
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
        this.eventManager = new index_1.EventManager();
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
        options = Object.assign(options, { useNewUrlParser: true });
        const mongoClient = require('mongodb');
        mongoClient.connect(`mongodb://${this.uri}:${this.port}/${this.name}`, options).then((client) => {
            this.db = client.db();
            this.eventManager.emit(MongoDb.READY_CONNECTION, this);
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
exports.MongoDb = MongoDb;
/**
 * @type {string}
 */
MongoDb.READY_CONNECTION = 'ready-connection';
