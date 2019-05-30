import {ContainerInterface} from "../container";
import {ContainerAggregateInterface} from "../container/index";
import {Storage} from "../storage/index";

export class Archive {

    /**
     * @type {module:fs}
     * @private
     */
    private _output:any;

    /**
     * @type {module:archiver}
     * @private
     */
    private _archiver:any = require('archiver');

    /**
     * @type {string}
     */
    private type: string = 'zip';

    /**
     * @type {object}
     */
    private options: object = { zlib: { level: 9 } };

    /**
     * @type {string}
     */
    private destinationDir: string = '';

    /**
     * @type {string}
     */
    private tmpDir: string = '';

    /**
     * @type {string}
     */
    private nameFile: string = 'dsign';

    /**
     * @type {object}
     */
    private directories: object = {};

    /**
     * @type {object}
     */
    private listener: object = {
        progress : [],
        entry : [],
        close : [],
        error : [],
        warning : []
    };

    /**
     * @type {ContainerInterface}
     */
    private storageContainer: ContainerAggregateInterface = null;

    /**
     * @param {string} destinationDir
     */
    constructor(destinationDir: string) {
        this.destinationDir = destinationDir;
    }

    /**
     * @private
     */
    private _prepareArchive() {
        let fs = require('fs');
        let archiver = require('archiver');

        this._archiver = archiver(this.type, this.options);

        this._output = fs.createWriteStream(this._computNameDestination());
        this._archiver.pipe(this._output);
    }

    /**
     * @private
     */
    private _computNameDestination() {
        let date = new Date();
        let timestampString = `${date.getMonth()+1}-${date.getDate()}_${date.getHours()}:${date.getMinutes()}`;
        return `${this.destinationDir}${this.nameFile}-${timestampString}.${this.type}`;
    }

    /**
     * @param {string} fsPath
     * @param {string} zipPath
     * @return {Archive}
     */
    public appendDirectory(fsPath: string, zipPath: string) {
        this.directories[fsPath] = zipPath;
        return this;
    }

    /**
     *
     */
    public async archive() {
        this._prepareArchive();
        for (let property in this.directories)  {
            console.log(property, this.directories[property]);
            this._archiver.directory(property, this.directories[property]);
        }

        if (this.storageContainer) {
            let services = this.storageContainer.getAll();
            let promises = [];
            for (let cont = 0; services.length > cont; cont++) {
                promises.push(this._appendStorageData(services[cont]));
            }
            let data = await Promise.all(promises);
        }

        /**
         * evt progress
         */
        this._archiver.on('progress', (evt) => {
          console.log('PROGRESS', evt);
            if (this.listener['progress'].length) {
                for (let cont = 0; this.listener['progress'].length > cont; cont++) {
                    this.listener['progress'][cont](evt);
                }
            }
        });

        /**
         * evt entry
         */
        this._archiver.on('entry', (evt) => {
            console.log('ENTRY', evt);
            if (this.listener['entry'].length) {
                for (let cont = 0; this.listener['entry'].length > cont; cont++) {
                    this.listener['entry'][cont](evt);
                }
            }
        });

        /**
         * evt warning
         */
        this._archiver.on('error', (evt) => {
            console.log('ERROR', evt);
            if (this.listener['error'].length) {
                for (let cont = 0; this.listener['error'].length > cont; cont++) {
                    this.listener['error'][cont](evt);
                }
            }
        });

        /**
         * evt warning
         */
        this._archiver.on('warning', (evt) => {
            console.warn('Archive warning', evt);
            if (this.listener['warning'].length) {
                for (let cont = 0; this.listener['warning'].length > cont; cont++) {
                    this.listener['warning'][cont](evt);
                }
            }
        });

        /**
         * evt close
         */
        this._output.on('close', (evt) => {
            console.log('CLOSE');
            if (this.listener['close'].length) {
                for (let cont = 0; this.listener['close'].length > cont; cont++) {
                    this.listener['close'][cont](evt);
                }
            }

            this._output = null;
            this._archiver = null;
        });

        this._archiver.finalize();
    }

    public async restore() {

        let fsExtra = require('fs-extra');
        fsExtra.emptyDirSync(this.tmpDir);
        console.log('restore', this.tmpDir);
    }

    /**
     * @param event
     * @param callback
     */
    public addEventListener(event: string, callback: any) {
        switch (event) {
            case 'progress' :
            case 'entry' :
            case 'error' :
            case 'warning' :
            case 'close' :
                this.listener[event].push(callback);
                break;
        }
    }

    /**
     * @param {Storage} storage
     * @return {Promise}
     * @private
     */
    _appendStorageData(storage:Storage) {

        return new Promise((resolve, reject) => {

            storage.getAll().then((data) => {

                let dataString = '';
                let comma = ',';
                for (let cont = 0; data.length > cont; cont++) {

                    comma = data.length > (cont+1) ? comma : '';
                    try {
                        dataString = dataString.concat(`${JSON.stringify(storage.getHydrator().extract(data[cont]))}${comma}`);
                    } catch (e) {
                        console.warn(`Bad entity for extract ${name} id:${data[cont].id}`);
                        dataString = dataString.concat(`${comma}`);
                    }
                }
                let result = `[${dataString}]`;

                if (this._archiver) {
                    this._archiver.append(result, { name: `${storage.getAdapter().getNameCollection()}.json` });
                }
                resolve(this);
            }).catch((err) => {
                reject(err);
            });

        });
    }

    /**
     *
     * @param {string} type
     * @return {this}
     */
    public setType(type:string) {
        this.type = type;
        return this;
    }

    /**
     * @return {string}
     */
    public getType() {
        return this.type;
    }

    /**
     *
     * @param {object} options
     * @return {this}
     */
    public setOptions(options:object) {
        this.options = options;
        return this;
    }

    /**
     * @return {string}
     */
    public getOptions() {
        return this.options;
    }

    /**
     *
     * @param {string} destinationDir
     * @return {this}
     */
    public setDestinationDir(destinationDir:string) {
        this.destinationDir = destinationDir;
        return this;
    }

    /**
     * @return {string}
     */
    public getDestinationDir() {
        return this.destinationDir;
    }

    /**
     *
     * @param {string} tmpDir
     * @return {this}
     */
    public setTmpDir(tmpDir:string) {
        this.tmpDir = tmpDir;
        return this;
    }

    /**
     * @return {string}
     */
    public getTmpDir() {
        return this.tmpDir;
    }

    /**
     * @param {ContainerAggregateInterface} container
     * @return {this}
     */
    public setStorageContainer(container:ContainerAggregateInterface) {
        this.storageContainer = container;
        return this;
    }
}
