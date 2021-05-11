"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoCollectionAdapter = void 0;
const pagination_1 = require("../../../pagination");
/**
 *
 */
class MongoCollectionAdapter {
    /**
     * @param {MongoDb} MongoDb
     * @param {string} nameCollection
     */
    constructor(mongoDb, nameCollection) {
        /**
         * @type {MongoDb}
         */
        this.mongoDb = mongoDb;
        /**
         * @type {string}
         */
        this.nameCollection = nameCollection;
        /**
         * @type function
         */
        this.identityCriteria = (data) => {
            let objReturn = {};
            switch (true) {
                case data['_id'] !== undefined && data['_id'] instanceof require('mongodb').ObjectID:
                    objReturn['_id'] = data['_id'];
                    break;
                case data['_id'] !== undefined && typeof data['_id'] === 'string':
                    objReturn['_id'] = new (require('mongodb').ObjectID)(data['_id']);
                    break;
                case data['id'] !== undefined && data['id'] instanceof require('mongodb').ObjectID:
                    objReturn['_id'] = data['id'];
                    break;
                case data['id'] !== undefined && typeof data['id'] === 'string':
                    objReturn['_id'] = new (require('mongodb').ObjectID)(data['id']);
                    break;
                default:
                    throw 'Identity property not found _id or id';
            }
            return objReturn;
        };
    }
    /**
     * @inheritDoc
     */
    getNameCollection() {
        return this.nameCollection;
    }
    /**
     * @inheritDoc
     */
    get(id) {
        return new Promise((resolve, reject) => {
            let objectId = new (require('mongodb').ObjectID)(id);
            this.mongoDb.getDb()
                .collection(this.nameCollection)
                .findOne({ _id: objectId }, (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result ? result : null);
            });
        });
    }
    /**
     * @inheritDoc
     */
    save(data) {
        return new Promise((resolve, reject) => {
            this.mongoDb.getDb()
                .collection(this.nameCollection)
                .insertOne(data, ((error, result) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(data);
            }));
        });
    }
    /**
     * @inheritDoc
     */
    update(data) {
        return new Promise((resolve, reject) => {
            this.mongoDb.getDb()
                .collection(this.nameCollection)
                .updateOne(this.identityCriteria(data), { $set: data }, { upsert: true }, (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(data);
            });
        });
    }
    /**
     * @inheritDoc
     */
    remove(data) {
        return new Promise((resolve, reject) => {
            this.mongoDb.getDb()
                .collection(this.nameCollection)
                .deleteOne(this.identityCriteria(data), (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(data);
            });
        });
    }
    /**
     * @inheritDoc
     */
    getAll(filter) {
        return new Promise((resolve, reject) => {
            this.mongoDb.getDb()
                .collection(this.nameCollection)
                .find(this.filter(filter))
                .toArray((error, result) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result.length > 0 ? result : []);
            });
        });
    }
    /**
     * @inheritDoc
     */
    getPaged(page, itemCount, filter) {
        return new Promise((resolve, reject) => {
            this.mongoDb.getDb()
                .collection(this.nameCollection)
                .find(this.filter(filter))
                .count((error, totalItems) => {
                if (error) {
                    reject(error);
                    return;
                }
                this.mongoDb.getDb()
                    .collection(this.nameCollection)
                    .find(this.filter(filter))
                    .skip((page - 1) * itemCount)
                    .limit(itemCount)
                    .toArray((error, items) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(new pagination_1.Pagination(items, page, itemCount, totalItems));
                });
            });
        });
    }
    /**
     *
     * @param {Function} identityCriteria
     * @return MongoCollectionAdapter
     */
    setIdentityCriteria(identityCriteria) {
        this.identityCriteria = identityCriteria;
        return this;
    }
    /**
     * @param filter
     * @return {object}
     */
    filter(filter) {
        return {};
    }
}
exports.MongoCollectionAdapter = MongoCollectionAdapter;
