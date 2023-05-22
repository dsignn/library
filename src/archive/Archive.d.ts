import { ContainerAggregateInterface } from "../container/index";
import { Storage } from "../storage/index";
/**
 * @class
 * Archive
 */
export declare class Archive {
    /**
     * @type {module:fs}
     * @private
     */
    private _output;
    /**
     * @type {module:archiver}
     * @private
     */
    private _archiver;
    /**
     * @type {string}
     */
    private type;
    /**
     * @type {object}
     */
    private options;
    /**
     * @type {string}
     */
    private destinationDir;
    /**
     * @type {string}
     */
    private tmpDir;
    /**
     * @type {string}
     */
    private resourceDir;
    /**
     * @type {string}
     */
    private nameFile;
    /**
     * @type {object}
     */
    private directories;
    /**
     * @type {EventManager}
     */
    private eventManager;
    /**
     * @type {object}
     */
    private listener;
    /**
     * @type {ContainerInterface}
     */
    private storageContainer;
    /**
     * @param {string} destinationDir
     * @param {string} resourceDir
     */
    constructor(destinationDir: string, resourceDir: string);
    /**
     * @private
     */
    private _prepareArchive;
    /**
     * @private
     */
    private _computNameDestination;
    /**
     * @param {string} fsPath
     * @param {string} zipPath
     * @return {Archive}
     */
    appendDirectory(fsPath: string, zipPath: string): this;
    /**
     *
     */
    archive(): Promise<void>;
    /**
     * @param {string} path
     * @return {Promise<void>}
     */
    restore(path: any): Promise<unknown>;
    /**
     * @param tmpDir
     */
    _moveAndLoadData(tmpDir: any, copy?: boolean): void;
    /**
     * @param tmpPath
     * @param storage
     * @return {Promise}
     */
    private _restoreStorage;
    /**
     * @param event
     * @param callback
     */
    addEventListener(event: string, callback: any): void;
    /**
     * @param {Storage} storage
     * @return {Promise}
     * @private
     */
    _appendStorageData(storage: Storage): Promise<unknown>;
    /**
     *
     * @param {string} type
     * @return {this}
     */
    setType(type: string): this;
    /**
     * @return {string}
     */
    getType(): string;
    /**
     *
     * @param {object} options
     * @return {this}
     */
    setOptions(options: object): this;
    /**
     * @return {string}
     */
    getOptions(): object;
    /**
     *
     * @param {string} destinationDir
     * @return {this}
     */
    setDestinationDir(destinationDir: string): this;
    /**
     * @return {string}
     */
    getDestinationDir(): string;
    /**
     *
     * @param {string} tmpDir
     * @return {this}
     */
    setTmpDir(tmpDir: string): this;
    /**
     * @return {string}
     */
    getTmpDir(): string;
    /**
     *
     * @param {string} resourceDir
     * @return {this}
     */
    setResourceDir(resourceDir: string): this;
    /**
     * @return {string}
     */
    getResourceDir(): string;
    /**
     * @param {ContainerAggregateInterface} container
     * @return {this}
     */
    setStorageContainer(container: ContainerAggregateInterface): this;
}
