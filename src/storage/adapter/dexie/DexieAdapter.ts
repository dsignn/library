import Dexie from "dexie";
import {StorageAdapterInterface} from "../StorageAdapterInterface";
import {Pagination} from "../../../pagination/Pagination";
/**
 *
 */
export class DexieAdapter implements StorageAdapterInterface {

    /**
     * @type Dexie
     */
    private manager:Dexie;

    /**
     * @type string
     */
    private nameCollection:string;

    /**
     * @param {Dexie} manager
     * @param {string} nameCollection
     */
    constructor(manager: Dexie, nameCollection:string) {

        /**
         * @type {Dexie}
         */
        this.manager = manager;

        /**
         * @type {string}
         */
        this.nameCollection = nameCollection;
    }

    /**
     * @return {string}
     */
    getNameCollection() {
        return this.nameCollection;
    }

    /**
     * @inheritDoc
     */
    get(id: string): Promise<any> {
        return this.manager.table(this.nameCollection).get(id);
    }

    /**
     * @inheritDoc
     */
    remove(data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.manager.table(this.nameCollection)
                .delete(data.id)
                .then(
                    (id) => {
                        resolve(data);
                    })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    /**
     * @inheritDoc
     */
    save(data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.manager.table(this.nameCollection)
                .add(data)
                .then(
                (id) => {
                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    /**
     * @inheritDoc
     */
    update(data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.manager.table(this.nameCollection)
                .put(data)
                .then(
                    (id) => {
                        resolve(data);
                    })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    /**
     * @inheritDoc
     */
    getAll(filter: object): Promise<any> {
        return this.filter(filter).toArray();
    }

    /**
     * @param {number} page
     * @param {number} itemCount
     * @param {object} filter
     * @return {Promise<Pagination>}
     */
    getPaged(page: number, itemCount: number, filter: object): Promise<any> {
        return new Promise((resolve, reject) => {

            this.filter(filter)
                .count()
                .then(
                    (totalItems) => {

                        this.filter(filter)
                            .offset((page - 1) * itemCount)
                            .limit(itemCount)
                            .toArray()
                            .then(
                                (items) => {
                                    resolve(new Pagination(items, page, itemCount, totalItems));
                                }
                            )
                    }
                )
        });
    }

    /**
     * @param filter
     * @return {Dexie.Collection<any, any>}
     */
    protected filter(filter) {
        return this.manager.table(this.nameCollection).toCollection();
    }
}
