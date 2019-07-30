import { EventManagerInterface } from "../../../event/index";
/**
 *
 */
export declare class MongoDb {
    /**
     * @type {string}
     */
    static READY_CONNECTION: string;
    /**
     * @type {string}
     */
    protected uri: string;
    /**
     * @type {number}
     */
    protected port: number;
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
    protected eventManager: EventManagerInterface;
    /**
     *
     * @param {string} name
     * @param {string} uri
     * @param {number} port
     * @param {Object} options
     */
    constructor(name: string, uri: string, port?: number, options?: object);
    /**
     * @return {any}
     */
    getDb(): any;
    /**
     * @return {EventManagerInterface}
     */
    getEventManager(): EventManagerInterface;
    /**
     * @return {boolean | any}
     */
    isConnected(): any;
}
