"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSystemAdapter = void 0;
const Pagination_1 = require("../../../pagination/Pagination");
const MongoIdGenerator_1 = require("../../util/MongoIdGenerator");
/**
 *
 */
class FileSystemAdapter {
    /**
     * @param {string} name
     */
    constructor(stringPath, nameCollection) {
        this.fs = require('fs');
        this.path = require('path');
        /**
         * @type Array
         */
        this.data = [];
        /**
         * @type string
         */
        this.identifier = '_id';
        /**
         * @type function
         */
        this.filterCallback = (filter) => { return this.data; };
        /**
         * @returns string
         */
        this.idFn = () => { return MongoIdGenerator_1.MongoIdGenerator.statcGenerateId(); };
        this.stringPath = stringPath;
        this.nameCollection = nameCollection;
        this.fs.mkdirSync(stringPath, { recursive: true });
        this.data = [];
        if (this.fs.existsSync(this.getFileName())) {
            try {
                let read = this.fs.readFileSync(this.getFileName(), 'utf8');
                this.data = JSON.parse(read);
            }
            catch (err) {
                this.data = [];
                console.error(err);
            }
        }
    }
    /**
     * Persist data
     */
    persist() {
        return new Promise((resolve, reject) => {
            this.fs.writeFile(this.getFileName(), JSON.stringify(this.data), (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(this.data);
            });
        });
    }
    /**
     * @return {string}
     */
    getNameCollection() {
        return this.nameCollection;
    }
    /**
     * @return {string}
     */
    getFileName() {
        return this.path.normalize(`${this.stringPath}${this.path.sep}${this.getNameCollection()}.json`);
    }
    /**
     * @param filter
     * @return {Array<any>}
     */
    filter(filter) {
        return JSON.parse(JSON.stringify(this.filterCallback(filter)));
    }
    /**
     * @param filterCallback
     */
    setFilterCallback(filterCallback) {
        this.filterCallback = filterCallback;
        return this;
    }
    /**
     *
     * @param identifier
     */
    setIdentifier(identifier) {
        this.identifier = identifier;
    }
    /**
     * @param {string} id
     * @return {Promise<any>}
     */
    get(id) {
        return new Promise((resolve, reject) => {
            let index = this.data.findIndex((element) => {
                return id === element[this.identifier];
            });
            if (index >= 0) {
                resolve(Object.assign({}, this.data[index]));
            }
            else {
                resolve(null);
            }
        });
    }
    /**
     * @param {object} filter
     * @return {Promise<any>}
     */
    getAll(filter) {
        return new Promise((resolve, reject) => {
            resolve(this.filter(filter));
        });
    }
    /**
     * @param {number} page
     * @param {number} itemCount
     * @param {object} filter
     * @return {Promise<any>}
     */
    getPaged(page, itemCount, filter) {
        return new Promise((resolve, reject) => {
            let filteredData = this.filter(filter);
            let data = [];
            let offset = (page - 1) * itemCount;
            switch (true) {
                case filteredData.length > offset:
                    data = filteredData.slice(offset, offset + itemCount);
                    break;
            }
            resolve(new Pagination_1.Pagination(data, page, itemCount, filteredData.length));
        });
    }
    /**
     * @param  data
     * @return {Promise<any>}
     */
    remove(data) {
        return new Promise((resolve, reject) => {
            let index = this.data.findIndex((element) => {
                return data[this.identifier] === element[this.identifier];
            });
            if (index >= 0) {
                this.data.splice(index, 1);
                this.persist().then((dataPesist) => {
                    resolve(true);
                }).catch((err) => {
                    reject(err);
                });
            }
            else {
                resolve(false);
            }
        });
    }
    /**
     * @param data
     * @return {Promise<any>}
     */
    save(data) {
        return new Promise((resolve, reject) => {
            if (data) {
                if (data[this.identifier]) {
                    this.update(data).then((dataPesist) => {
                        resolve(data);
                    }).catch((err) => {
                        reject(err);
                    });
                }
                else {
                    data[this.identifier] = this.idFn();
                    this.data.push(data);
                    this.persist()
                        .then((dataPesist) => {
                        resolve(data);
                    }).catch((err) => {
                        reject(err);
                    });
                }
            }
        });
    }
    /**
     * @param data
     * @return {Promise<any>}
     */
    update(data) {
        return new Promise((resolve, reject) => {
            let index = this.data.findIndex((element) => {
                return data[this.identifier] === element[this.identifier];
            });
            if (index >= 0) {
                this.data[index] = data;
            }
            else {
                this.data.push(data);
            }
            this.persist().then((dataPesist) => {
                resolve(data);
            }).catch((err) => {
                reject(err);
            });
        });
    }
}
exports.FileSystemAdapter = FileSystemAdapter;
