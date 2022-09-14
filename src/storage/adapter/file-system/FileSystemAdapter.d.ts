import { StorageAdapterInterface } from "../StorageAdapterInterface";
/**
 *
 */
export declare class FileSystemAdapter implements StorageAdapterInterface {
    /**
     * @type string
     */
    private stringPath;
    /**
     * @type string
     */
    private nameCollection;
    private fs;
    private path;
    /**
     * @type Array
     */
    private data;
    /**
     * @type string
     */
    private identifier;
    /**
     * @type function
     */
    private filterCallback;
    /**
     * @returns string
     */
    private idFn;
    /**
     * @param {string} name
     */
    constructor(stringPath: string, nameCollection: string);
    /**
     * Persist data
     */
    protected persist(): Promise<unknown>;
    /**
     * @return {string}
     */
    getNameCollection(): string;
    /**
     * @return {string}
     */
    private getFileName;
    /**
     * @param filter
     * @return {Array<any>}
     */
    protected filter(filter: any): any;
    /**
     * @param filterCallback
     */
    setFilterCallback(filterCallback: Function): this;
    /**
     *
     * @param identifier
     */
    setIdentifier(identifier: string): void;
    /**
     * @param {string} id
     * @return {Promise<any>}
     */
    get(id: string): Promise<any>;
    /**
     * @param {object} filter
     * @return {Promise<any>}
     */
    getAll(filter: object): Promise<any>;
    /**
     * @param {number} page
     * @param {number} itemCount
     * @param {object} filter
     * @return {Promise<any>}
     */
    getPaged(page: number, itemCount: number, filter: object): Promise<any>;
    /**
     * @param  data
     * @return {Promise<any>}
     */
    remove(data: any): Promise<any>;
    /**
     * @param data
     * @return {Promise<any>}
     */
    save(data: any): Promise<any>;
    /**
     * @param data
     * @return {Promise<any>}
     */
    update(data: any): Promise<any>;
}
