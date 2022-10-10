/**
 *
 */
import Dexie from 'dexie';
import { Store } from "./Store";
export declare class DexieManager extends Dexie {
    /**
     *
     * @type {number}
     */
    private versionDb;
    /**
     *
     * @type {Array<Store>}
     */
    private stores;
    /**
     * @param {string} name
     * @param {Array<Store>} stores
     */
    constructor(name: string, stores?: Array<Store>);
    /**
     * Set schema and run db
     */
    generateSchema(): Dexie.Version;
    /**
     * @param callback
     */
    upgradeSchema(callback: any): Dexie.Version;
    /**
     *
     * @return {{}}
     */
    protected getSchema(): {};
    /**
     * @param {Store} store
     * @return DexieManager
     */
    addStore(store: Store): this;
    /**
     * @param {Store} store
     * @return DexieManager
     */
    removeStore(store: Store): this;
    /**
     * @param {number} version
     */
    setVersion(version: number): this;
}
