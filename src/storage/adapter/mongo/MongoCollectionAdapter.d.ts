import { StorageAdapterInterface } from "../StorageAdapterInterface";
import { MongoDb } from "./MongoDb";
/**
 *
 */
export declare class MongoCollectionAdapter implements StorageAdapterInterface {
    /**
     * @type MongoDb
     */
    protected mongoDb: MongoDb;
    /**
     * @type string
     */
    protected nameCollection: string;
    /**
     *
     */
    protected identityCriteria: Function;
    /**
     * @param {MongoDb} MongoDb
     * @param {string} nameCollection
     */
    constructor(mongoDb: MongoDb, nameCollection: string);
    /**
     * @inheritDoc
     */
    getNameCollection(): string;
    /**
     * @inheritDoc
     */
    get(id: string): Promise<any>;
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
    remove(data: any): Promise<any>;
    /**
     * @inheritDoc
     */
    getAll(filter: Object): Promise<any>;
    /**
     * @inheritDoc
     */
    getPaged(page: number, itemCount: number, filter: Object): Promise<any>;
    /**
     *
     * @param {Function} identityCriteria
     * @return MongoCollectionAdapter
     */
    setIdentityCriteria(identityCriteria: Function): this;
    /**
     * @param filter
     * @return {object}
     */
    protected filter(filter: any): {};
}
