import { StorageAdapterInterface } from "../StorageAdapterInterface";
/**
 *
 */
export declare class LocalStorageAdapter implements StorageAdapterInterface {
    /**
     * @type string
     */
    private name;
    /**
     * @type string
     */
    private nameCollection;
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
     * @param {string} name
     * @param {string} nameCollection
     */
    constructor(name: string, nameCollection: string);
    /**
     * @return {string}
     */
    getNameCollection(): string;
    /**
     * Persist data
     */
    protected persist(): void;
    /**
     * @return {string}
     */
    protected getNamespace(): string;
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
     * @param filterCallback
     */
    setFilterCallback(filterCallback: Function): this;
    /**
     * @param data
     * @return {Promise<any>}
     */
    update(data: any): Promise<any>;
    /**
     * @param filter
     * @return {Array<any>}
     */
    protected filter(filter: any): any;
    /**
     *
     * @param identifier
     */
    setIdentifier(identifier: string): void;
}
