import {StorageAdapterInterface} from "../StorageAdapterInterface";
import {MongoDb} from "./MongoDb";
import {Pagination} from "../../../pagination";
/**
 *
 */
export class MongoCollectionAdapter implements StorageAdapterInterface {

    /**
     * @type MongoDb
     */
    protected mongoDb:MongoDb;

    /**
     * @type string
     */
    protected nameCollection:string;

    /**
     * @param {MongoDb} MongoDb
     * @param {string} nameCollection
     */
    constructor(mongoDb: MongoDb, nameCollection:string) {

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
    public getNameCollection(): string {
        return this.nameCollection;
    }

    /**
     * @inheritDoc
     */
    public get(id: string): Promise<any> {
        return new Promise((resolve, reject) => {

            let objectId =  new (require('mongodb').ObjectID)(id);
            this.mongoDb.getDb()
                .collection(this.nameCollection)
                .findOne(
                    {_id: objectId},
                    (error, result) => {

                         if (error) {
                            reject(error);
                            return;
                        }
                        resolve(result ? result : null);
                    }
                );
        });
    }

    /**
     * @inheritDoc
     */
    public save(data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.mongoDb.getDb()
                .collection(this.nameCollection)
                .insertOne(data, ((error, result) => {
                        if (error) {
                            reject(error);
                            return;
                        }

                        resolve(data);
                    })
                );
        });
    }

    /**
     * @inheritDoc
     */
    public update(data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.mongoDb.getDb()
                .collection(this.nameCollection)
                .updateOne(
                    this._getIdCriteria(data),
                    {$set :data},
                    {upsert: true},
                    (error, result) => {
                        if (error) {
                            reject(error);
                            return;
                        }

                        resolve(data);
                    }
                );
        });
    }

    /**
     * @inheritDoc
     */
    public remove(data: any): Promise<any> {
        return new Promise((resolve, reject) => {

            this.mongoDb.getDb()
                .collection(this.nameCollection)
                .deleteOne(
                    this._getIdCriteria(data),
                    (error, result) => {
                        if (error) {
                            reject(error);
                            return;
                        }

                        resolve(data);
                    }
                );
        });
    }

    /**
     * @inheritDoc
     */
    public getAll(filter: Object): Promise<any> {
        return new Promise((resolve, reject) => {
            this.mongoDb.getDb()
                .collection(this.nameCollection)
                .find(
                    this.filter(filter)
                )
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
    public getPaged(page: number, itemCount: number, filter: Object): Promise<any> {

        return new Promise((resolve, reject) => {

            this.mongoDb.getDb()
                .collection(this.nameCollection)
                .find(
                    this.filter(filter)
                )
                .count((error, totalItems) => {

                    if (error) {
                        reject(error);
                        return;
                    }

                    this.mongoDb.getDb()
                        .collection(this.nameCollection)
                        .find(
                            this.filter(filter)
                        )
                        .skip((page - 1) * itemCount)
                        .limit(itemCount)
                        .toArray((error, items) => {

                            if (error) {
                                reject(error);
                                return;
                            }
                            resolve(new Pagination(items, page, itemCount, totalItems));
                        });
                });
        });
    }

    /**
     * @param data
     * @return {object}
     * @private
     */
    _getIdCriteria(data : any) {
        let objReturn = {};

        switch (true) {
            case  data['_id'] !== undefined && data['_id'] instanceof require('mongodb').ObjectID:
                objReturn['_id'] =  data['_id'];
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
    protected filter(filter) {
        return { name: {$regex: "te", $options: "$i"}};
    }
}