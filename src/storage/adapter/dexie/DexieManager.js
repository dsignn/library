/**
 *
 */
import Dexie from 'dexie';
export class DexieManager extends Dexie {
    /**
     * @param {string} name
     * @param {Array<Store>} stores
     */
    constructor(name, stores) {
        super(name);
        /**
         *
         * @type {number}
         */
        this.versionDb = 1;
        /**
         *
         * @type {Array<Store>}
         */
        this.stores = [];
        this.stores = stores ? stores : [];
    }
    /**
     * Set schema and run db
     */
    generateSchema() {
        this.version(this.versionDb).stores(this.getSchema());
    }
    /**
     *
     * @return {{}}
     */
    getSchema() {
        let schema = {};
        for (let cont = 0; this.stores.length > cont; cont++) {
            schema[this.stores[cont].getName()] = this.stores[cont].getIndexString();
        }
        return schema;
    }
    /**
     * @param {Store} store
     * @return DexieManager
     */
    addStore(store) {
        this.stores.push(store);
        return this;
    }
    /**
     * @param {Store} store
     * @return DexieManager
     */
    removeStore(store) {
        let index = this.stores.findIndex((iStore) => {
            return iStore.getName() === store.getName();
        });
        if (index > -1) {
            this.stores.splice(index, 1);
        }
        return this;
    }
}
//# sourceMappingURL=DexieManager.js.map