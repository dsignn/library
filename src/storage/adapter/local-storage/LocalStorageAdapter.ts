import {StorageAdapterInterface} from "../StorageAdapterInterface";
import {Pagination} from "../../../pagination/Pagination";

/**
 *
 */
export class LocalStorageAdapter implements StorageAdapterInterface {

    /**
     * @type string
     */
    private name:string;

    /**
     * @type string
     */
    private nameCollection:string;

    /**
     * @type Array
     */
    private data: Array<any> = [];

    /**
     * @type string
     */
    private identifier = '_id';

    /**
     * @type function
     */
    private filterCallback: Function = (filter) => { return this.data };

    /**
     * @param {string} name
     * @param {string} nameCollection
     */
    constructor(name: string, nameCollection: string) {
        this.name = name;
        this.nameCollection = nameCollection;
        this.data = localStorage.getItem(this.getNamespace()) ? JSON.parse(localStorage.getItem(this.getNamespace())) : [];
        this.data = Array.isArray(this.data) ? this.data : [];
    }

    /**
     * @return {string}
     */
    getNameCollection() {
        return this.nameCollection;
    }

    /**
     * Persist data
     */
    protected persist() {
        localStorage.setItem(this.getNamespace(), JSON.stringify(this.data));
    }

    /**
     * @return {string}
     */
    protected getNamespace() {
        return `${this.name}-${this.nameCollection}`;
    }

    /**
     * @param {string} id
     * @return {Promise<any>}
     */
    public get(id: string): Promise<any> {

        return new Promise((resolve, reject) => {

            let index = this.data.findIndex((element) => {
                return id === element[this.identifier];
            });

            if (index >= 0) {
                resolve(Object.assign({}, this.data[index]));
            } else {
                resolve(null);
            }
        });
    }

    /**
     * @param {object} filter
     * @return {Promise<any>}
     */
    public getAll(filter: object): Promise<any> {
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
    public getPaged(page: number, itemCount: number, filter: object): Promise<any> {
        return new Promise((resolve, reject) => {
            let filteredData = this.filter(filter);
            let data = [];
            let offset = (page - 1) * itemCount;
            switch (true) {
                case filteredData.length > offset:
                    data = filteredData.slice(offset, offset+itemCount);
                    break;
            }
            resolve(new Pagination(data , page , itemCount, filteredData.length)) ;
        });
    }

    /**
     * @param  data
     * @return {Promise<any>}
     */
    public remove(data: any): Promise<any> {
        return new Promise((resolve, reject) => {

            let index = this.data.findIndex((element) => {
                return data[this.identifier] === element[this.identifier];
            });

            if (index >= 0) {
                this.data.splice(index, 1);
                this.persist();
                resolve(true);
            } else {
                resolve(false);
            }
        });
    }

    /**
     * @param data
     * @return {Promise<any>}
     */
    public save(data: any): Promise<any> {

        return new Promise((resolve, reject) => {

            if (data) {
                this.data.push(data);
                this.persist();
            }
            resolve(data);
        });
    }

    /**
     * @param filterCallback
     */
    public setFilterCallback(filterCallback: Function) {
        this.filterCallback = filterCallback;
        return this;
    }

    /**
     * @param data
     * @return {Promise<any>}
     */
    public update(data: any): Promise<any> {
        return new Promise((resolve, reject) => {

            let index = this.data.findIndex((element) => {
                return data[this.identifier] === element[this.identifier];
            });

            if (index >= 0) {
                this.data[index] = data;
            } else {
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
    protected filter(filter) {
        return JSON.parse(JSON.stringify(this.filterCallback(filter)));
    }

    /**
     *
     * @param identifier
     */
    public setIdentifier(identifier: string) {
        this.identifier = identifier;
    }
}
