"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DexieAdapter = void 0;
const Pagination_1 = require("../../../pagination/Pagination");
/**
 *
 */
class DexieAdapter {
    /**
     * @param {Dexie} manager
     * @param {string} nameCollection
     */
    constructor(manager, nameCollection) {
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
    get(id) {
        return this.manager.table(this.nameCollection).get(id);
    }
    /**
     * @inheritDoc
     */
    remove(data) {
        return new Promise((resolve, reject) => {
            this.manager.table(this.nameCollection)
                .delete(data.id)
                .then((id) => {
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
    save(data) {
        return new Promise((resolve, reject) => {
            this.manager.table(this.nameCollection)
                .add(data)
                .then((id) => {
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
    update(data) {
        return new Promise((resolve, reject) => {
            this.manager.table(this.nameCollection)
                .put(data)
                .then((id) => {
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
    getAll(filter) {
        return this.filter(filter).toArray();
    }
    /**
     * @param {number} page
     * @param {number} itemCount
     * @param {object} filter
     * @return {Promise<Pagination>}
     */
    getPaged(page, itemCount, filter) {
        return new Promise((resolve, reject) => {
            this.filter(filter)
                .count()
                .then((totalItems) => {
                this.filter(filter)
                    .offset((page - 1) * itemCount)
                    .limit(itemCount)
                    .toArray()
                    .then((items) => {
                    resolve(new Pagination_1.Pagination(items, page, itemCount, totalItems));
                });
            });
        });
    }
    /**
     * @param filter
     * @return {Dexie.Collection<any, any>}
     */
    filter(filter) {
        return this.manager.table(this.nameCollection).toCollection();
    }
}
exports.DexieAdapter = DexieAdapter;
