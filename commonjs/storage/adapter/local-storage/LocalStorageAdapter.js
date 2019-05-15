"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Pagination_1 = require("../../../pagination/Pagination");
/**
 *
 */
class LocalStorageAdapter {
    /**
     * @param {string} name
     * @param {string} nameCollection
     */
    constructor(name, nameCollection) {
        /**
         * @type Array
         */
        this.data = [];
        this.name = name;
        this.nameCollection = nameCollection;
        this.data = localStorage.getItem(this.getNamespace()) ? JSON.parse(localStorage.getItem(this.getNamespace())) : [];
    }
    /**
     * Persist data
     */
    persist() {
        localStorage.setItem(this.getNamespace(), JSON.stringify(this.data));
    }
    /**
     * @return {string}
     */
    getNamespace() {
        return `${this.name}-${this.nameCollection}`;
    }
    /**
     * @param {string} id
     * @return {Promise<any>}
     */
    get(id) {
        return new Promise((resolve, reject) => {
            let index = this.data.findIndex((element) => {
                return id === element.id;
            });
            if (index >= 0) {
                resolve(this.data[index]);
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
                return data.id === element.id;
            });
            if (index >= 0) {
                this.data.splice(index, 1);
                this.persist();
                resolve(true);
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
                this.data.push(data);
                this.persist();
            }
            resolve(data);
        });
    }
    /**
     * @param data
     * @return {Promise<any>}
     */
    update(data) {
        return new Promise((resolve, reject) => {
            let index = this.data.findIndex((element) => {
                return data.id === element.id;
            });
            if (index >= 0) {
                this.data[index] = data;
            }
            else {
                this.data.push(data);
            }
            this.persist();
            resolve(data);
        });
    }
    /**
     * @param filter
     * @return {Array<any>}
     */
    filter(filter) {
        return this.data;
    }
}
exports.LocalStorageAdapter = LocalStorageAdapter;
