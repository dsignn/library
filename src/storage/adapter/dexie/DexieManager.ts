/**
 *
 */
import Dexie from 'dexie';
import {Store} from "./Store";

export class DexieManager extends Dexie {

    /**
     *
     * @type {number}
     */
    private versionDb:number = 1;

    /**
     *
     * @type {Array<Store>}
     */
    private stores:Array<Store> = [];

    /**
     * @param {string} name
     * @param {Array<Store>} stores
     */
    constructor(name:string, stores?: Array<Store>) {

        super(name);

        this.stores = stores ? stores : [];
    }

    /**
     * Set schema and run db
     */
    public generateSchema() {

        this.version(this.versionDb).stores(this.getSchema());
    }

    /**
     *
     * @return {{}}
     */
    protected getSchema() {
        let schema = {};
        for (let cont = 0; this.stores.length > cont; cont++) {
            schema[this.stores[cont].getName()] = this.stores[cont].getIndexString()
        }
        return schema;
    }

    /**
     * @param {Store} store
     * @return DexieManager
     */
    public addStore(store: Store) {
        this.stores.push(store);
        return this;
    }

    /**
     * @param {Store} store
     * @return DexieManager
     */
    public removeStore(store: Store) {
        let index = this.stores.findIndex((iStore) => {
            return iStore.getName() === store.getName();
        });

        if (index > -1) {
            this.stores.splice(index, 1);
        }
        return this;
    }
}