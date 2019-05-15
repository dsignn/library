"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        this.nameCollaction = nameCollection;
    }
    /**
     * @inheritDoc
     */
    get(id) {
        return this.manager.table(this.nameCollaction).get(id);
    }
    /**
     * @inheritDoc
     */
    remove(data) {
        return this.manager.table(this.nameCollaction).delete(data.id);
    }
    /**
     * @inheritDoc
     */
    save(data) {
        return this.manager.table(this.nameCollaction).add(data);
    }
    /**
     * @inheritDoc
     */
    update(data) {
        return this.manager.table(this.nameCollaction).put(data);
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
     * @return {Promise<any>}
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
        return this.manager.table(this.nameCollaction).toCollection();
    }
}
exports.DexieAdapter = DexieAdapter;
