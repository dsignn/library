/**
 *
 */
export class MongoCollectionAdapter {
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
                .updateOne(this._getIdCriteria(data), { $set: data }, { upsert: true }, (error, result) => {
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
                .deleteOne(this._getIdCriteria(data), (error, result) => {
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
                .skip((page - 1) * itemCount)
                .limit(itemCount)
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
     * @param data
     * @return {object}
     * @private
     */
    _getIdCriteria(data) {
        let objReturn = {};
        switch (true) {
            case data['_id'] !== undefined && data['_id'] instanceof require('mongodb').ObjectID:
                objReturn['_id'] = data['_id'];
                break;
            case data['_id'] !== undefined && typeof data['_id'] === 'string':
                objReturn['_id'] = new (require('mongodb').ObjectID)(data['_id']);
                break;
        }
        return objReturn;
    }
    /**
     * @param filter
     * @return {any}
     */
    filter(filter) {
        return filter;
    }
}
//# sourceMappingURL=MongoCollectionAdapter.js.map