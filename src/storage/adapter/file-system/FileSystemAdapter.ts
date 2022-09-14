import {StorageAdapterInterface} from "../StorageAdapterInterface";
import {Pagination} from "../../../pagination/Pagination";
import { MongoIdGenerator } from "../../util/MongoIdGenerator";

/**
 *
 */
export class FileSystemAdapter implements StorageAdapterInterface {

    /**
     * @type string
     */
    private stringPath:string;

    /**
     * @type string
     */
    private nameCollection:string;

    private fs = require('fs');

    private path = require('path');

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
     * @returns string
     */
    private idFn: Function = () => { return MongoIdGenerator.statcGenerateId() };

    /**
     * @param {string} name
     */
    constructor(stringPath: string, nameCollection: string) {
        this.stringPath = stringPath;
        this.nameCollection = nameCollection;
        
        this.fs.mkdirSync(stringPath, { recursive: true });
        this.data = [];
        if (this.fs.existsSync(this.getFileName())) {

            try {
                let read = this.fs.readFileSync(this.getFileName(), 'utf8');
                this.data =  JSON.parse(read);
            } catch(err) {
                this.data = [];
                console.error(err);
            }
        }
    }

    /**
     * Persist data
     */
    protected persist() {
        return new Promise((resolve, reject) => {
            this.fs.writeFile(
                this.getFileName(), 
                JSON.stringify(this.data),
                (err) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(this.data);
                }
            );
        });
    }

    /**
     * @return {string}
     */
    getNameCollection(): string{
        return this.nameCollection;
    }

    /**
     * @return {string}
     */
    private getFileName() {
        return this.path.normalize(`${this.stringPath}${this.path.sep}${this.getNameCollection()}.json`);
    }

    /**
     * @param filter
     * @return {Array<any>}
     */
       protected filter(filter) {
        return JSON.parse(JSON.stringify(this.filterCallback(filter)));
    }

    /**
     * @param filterCallback
     */
    public setFilterCallback(filterCallback: Function) {
        this.filterCallback = filterCallback;
        return this;
    }

    /**
     *
     * @param identifier
     */
    public setIdentifier(identifier: string) {
        this.identifier = identifier;
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
                this.persist().then((dataPesist) => {
                    resolve(true);
                }).catch((err) => {
                    reject(err);
                }) ;
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

                if (data[this.identifier]) {
                    this.update(data).then((dataPesist) => {
                        resolve(data);
                    }).catch((err) => {
                        reject(err);
                    }) ;
                } else {
                    data[this.identifier] = this.idFn();
                    this.data.push(data);
                    this.persist()
                        .then((dataPesist) => {
                            resolve(data);
                        }).catch((err) => {
                            reject(err);
                        }) ;
                }
            }
        });
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
            
            this.persist().then((dataPesist) => {
                resolve(data);
            }).catch((err) => {
                reject(err);
            }) ;
        });
    }
}
