import Dexie from "dexie";
import { StorageAdapterInterface } from "../StorageAdapterInterface";
/**
 *
 */
export declare class DexieAdapter implements StorageAdapterInterface {
    /**
     * @type Dexie
     */
    private manager;
    /**
     * @type string
     */
    private nameCollection;
    /**
     * @param {Dexie} manager
     * @param {string} nameCollection
     */
    constructor(manager: Dexie, nameCollection: string);
    /**
     * @return {string}
     */
    getNameCollection(): string;
    /**
     * @inheritDoc
     */
    get(id: string): Promise<any>;
    /**
     * @inheritDoc
     */
    remove(data: any): Promise<any>;
    /**
     * @inheritDoc
     */
    save(data: any): Promise<any>;
    /**
     * @inheritDoc
     */
    update(data: any): Promise<any>;
    /**
     * @inheritDoc
     */
    getAll(filter: object): Promise<any>;
    /**
     * @param {number} page
     * @param {number} itemCount
     * @param {object} filter
     * @return {Promise<Pagination>}
     */
    getPaged(page: number, itemCount: number, filter: object): Promise<any>;
    /**
     * @param filter
     * @return {Dexie.Collection<any, any>}
     */
    protected filter(filter: any): Dexie.Collection<any, any>;
}
