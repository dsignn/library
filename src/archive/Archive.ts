import {ContainerInterface} from "../container";
import {ContainerAggregateInterface} from "../container/index";
import {Storage} from "../storage/index";
import {EventManager} from "../event/index";

/**
 * @class
 * Archive
 */
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
    private resourceDir: string = '';

    /**
     * @type {string}
     */
    private nameFile: string = 'dsign';

    /**
     * @type {object}
     */
    private directories: object = {};

    /**
     * @type {EventManager}
     */
    private eventManager: EventManager = new EventManager();

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
     * @param {string} resourceDir
     */
    constructor(destinationDir: string, resourceDir: string) {
        this.destinationDir = destinationDir;
        this.resourceDir = resourceDir
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

    /**
     * @param {string} path
     * @return {Promise<void>}
     */
    public async restore(path) {

        let fs = require('fs');
        let fsExtra = require('fs-extra');
        let admZip = require('adm-zip');
        let evtData = {path: path};

        this.eventManager.emit('star-progress-extract', evtData);
        fsExtra.emptyDirSync(this.tmpDir);

        try {
            let zip = new admZip(path);
            zip.extractAllTo(this.tmpDir, true);
        } catch (e) {
            this.eventManager.emit('error-extract', {path: e});
        }

        /**
         * async
         */
        fsExtra.move(`${this.tmpDir}resource`, this.resourceDir, {overwrite:true}, (err) => {
            if (err) {
                this.eventManager.emit('error-extract', err);
                return;
            }
        });

        fs.readdir(this.tmpDir, (err, items) => {


            for (let cont=0; cont < items.length; cont++) {

                
                if (items[cont].indexOf("application") > 0) {
                    continue;
                }

                if (items[cont].indexOf(".json") > 0) {

                    let collection = items[cont].split('.')[0];
                    let storage = this.storageContainer.getAll().find((element) => {
                        return element.getAdapter().getNameCollection() === collection;
                    });

                    if (!storage) {
                        console.warn(`Storage ${collection} not found`);
                        continue;
                    }


                    fs.readFile(`${this.tmpDir}${items[cont]}`, function(err, data) {
                        if (err) {
                            throw err;
                        }

                        let jsonData = JSON.parse(data.toString());

                        if (jsonData.length > 0) {

                            let promises = [];
                            for (let contI = 0; jsonData.length > contI; contI++) {
                                promises.push(storage.update(this.getHydrator().hydrate(jsonData[contI])));
                            }

                            Promise.all(promises).then((data) => {
                                console.log(`Update ${this.getAdapter().getNameCollection()}`, data);
                            });
                        }

                    }.bind(storage));
                }
            }
        });


        this.eventManager.emit('close-extract', evtData);
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
            case 'error-extract':
            case 'close-extract':
            case 'star-progress-extract':
                this.eventManager.on(event, callback);
                break
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
     *
     * @param {string} resourceDir
     * @return {this}
     */
    public setResourceDir(resourceDir:string) {
        this.resourceDir = resourceDir;
        return this;
    }

    /**
     * @return {string}
     */
    public getResourceDir() {
        return this.resourceDir;
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
