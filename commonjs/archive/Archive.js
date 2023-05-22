"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Archive = void 0;
const index_1 = require("../event/index");
/**
 * @class
 * Archive
 */
class Archive {
    /**
     * @param {string} destinationDir
     * @param {string} resourceDir
     */
    constructor(destinationDir, resourceDir) {
        /**
         * @type {module:archiver}
         * @private
         */
        this._archiver = require('archiver');
        /**
         * @type {string}
         */
        this.type = 'zip';
        /**
         * @type {object}
         */
        this.options = { zlib: { level: 9 } };
        /**
         * @type {string}
         */
        this.destinationDir = '';
        /**
         * @type {string}
         */
        this.tmpDir = '';
        /**
         * @type {string}
         */
        this.resourceDir = '';
        /**
         * @type {string}
         */
        this.nameFile = 'dsign';
        /**
         * @type {object}
         */
        this.directories = {};
        /**
         * @type {EventManager}
         */
        this.eventManager = new index_1.EventManager();
        /**
         * @type {object}
         */
        this.listener = {
            progress: [],
            entry: [],
            close: [],
            error: [],
            warning: []
        };
        /**
         * @type {ContainerInterface}
         */
        this.storageContainer = null;
        this.destinationDir = destinationDir;
        this.resourceDir = resourceDir;
    }
    /**
     * @private
     */
    _prepareArchive() {
        let fs = require('fs');
        let archiver = require('archiver');
        this._archiver = archiver(this.type, this.options);
        this._output = fs.createWriteStream(this._computNameDestination());
        this._archiver.pipe(this._output);
    }
    /**
     * @private
     */
    _computNameDestination() {
        let date = new Date();
        let timestampString = `${date.getMonth() + 1}-${date.getDate()}_${date.getHours()}:${date.getMinutes()}`;
        return `${this.destinationDir}${this.nameFile}-${timestampString}.${this.type}`;
    }
    /**
     * @param {string} fsPath
     * @param {string} zipPath
     * @return {Archive}
     */
    appendDirectory(fsPath, zipPath) {
        this.directories[fsPath] = zipPath;
        return this;
    }
    /**
     *
     */
    archive() {
        return __awaiter(this, void 0, void 0, function* () {
            this._prepareArchive();
            for (let property in this.directories) {
                console.log(property, this.directories[property]);
                this._archiver.directory(property, this.directories[property]);
            }
            if (this.storageContainer) {
                let services = this.storageContainer.getAll();
                let promises = [];
                for (let cont = 0; services.length > cont; cont++) {
                    promises.push(this._appendStorageData(services[cont]));
                }
                let data = yield Promise.all(promises);
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
        });
    }
    /**
     * @param {string} path
     * @return {Promise<void>}
     */
    restore(path) {
        var decompress = require('decompress');
        var fsExtra = require('fs-extra');
        var fs = require('fs');
        var evtData = { path: path };
        return new Promise((resolve, reject) => {
            console.log(`Inizio`);
            this.eventManager.emit('star-progress-extract', evtData);
            fsExtra.emptyDir(this.tmpDir)
                .then(() => {
                let stat = fs.statSync(path);
                console.log('STAT', stat);
                if (stat.isDirectory()) {
                    this._moveAndLoadData(path, true);
                }
                else {
                    decompress(path, this.tmpDir)
                        .then((files) => {
                        console.log('Finito decompress');
                        this._moveAndLoadData(this.tmpDir);
                    });
                }
            });
        });
    }
    /**
     * @param tmpDir
     */
    _moveAndLoadData(tmpDir, copy = false) {
        var fsExtra = require('fs-extra');
        var fs = require('fs');
        let method = copy ? 'copy' : 'move';
        fsExtra[method](`${tmpDir}resource`, this.resourceDir, { overwrite: true })
            .then(() => {
            console.log('Finito spostare resource');
            //this.eventManager.emit('close-extract', {});
            fs.readdir(tmpDir, (err, items) => __awaiter(this, void 0, void 0, function* () {
                for (let cont = 0; cont < items.length; cont++) {
                    let collection = items[cont].split('.')[0];
                    let storage = this.storageContainer.getAll().find((element) => {
                        return element.getAdapter().getNameCollection() === collection;
                    });
                    if (!storage || items[cont].indexOf("application") >= 0) {
                        console.warn(`Skip collection ${collection}`);
                        continue;
                    }
                    try {
                        yield this._restoreStorage(`${tmpDir}${items[cont]}`, storage);
                    }
                    catch (error) {
                        this.eventManager.emit('storage-error', { error: error });
                    }
                }
                console.log(`Finito`);
                this.eventManager.emit('close-extract', {});
            }));
        }).catch((error) => {
            this.eventManager.emit('storage-error', { error: error });
        });
    }
    /**
     * @param tmpPath
     * @param storage
     * @return {Promise}
     */
    _restoreStorage(tmpPath, storage) {
        return __awaiter(this, void 0, void 0, function* () {
            var fsExtra = require('fs-extra');
            let jsonData = yield fsExtra.readJson(tmpPath);
            if (jsonData.length > 0) {
                let promises = [];
                for (let contI = 0; jsonData.length > contI; contI++) {
                    promises.push(storage.update(storage.getHydrator().hydrate(jsonData[contI])));
                }
                try {
                    console.log('Finito', storage.getAdapter().getNameCollection());
                    let data = yield Promise.all(promises);
                    return data;
                }
                catch (error) {
                    throw error;
                }
            }
            else {
                return null;
            }
        });
    }
    /**
     * @param event
     * @param callback
     */
    addEventListener(event, callback) {
        switch (event) {
            case 'progress':
            case 'entry':
            case 'error':
            case 'warning':
            case 'close':
                this.listener[event].push(callback);
                break;
            case 'error-extract':
            case 'close-extract':
            case 'star-progress-extract':
                this.eventManager.on(event, callback);
                break;
        }
    }
    /**
     * @param {Storage} storage
     * @return {Promise}
     * @private
     */
    _appendStorageData(storage) {
        return new Promise((resolve, reject) => {
            storage.getAll().then((data) => {
                let dataString = '';
                let comma = ',';
                for (let cont = 0; data.length > cont; cont++) {
                    comma = data.length > (cont + 1) ? comma : '';
                    try {
                        dataString = dataString.concat(`${JSON.stringify(storage.getHydrator().extract(data[cont]))}${comma}`);
                    }
                    catch (e) {
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
    setType(type) {
        this.type = type;
        return this;
    }
    /**
     * @return {string}
     */
    getType() {
        return this.type;
    }
    /**
     *
     * @param {object} options
     * @return {this}
     */
    setOptions(options) {
        this.options = options;
        return this;
    }
    /**
     * @return {string}
     */
    getOptions() {
        return this.options;
    }
    /**
     *
     * @param {string} destinationDir
     * @return {this}
     */
    setDestinationDir(destinationDir) {
        this.destinationDir = destinationDir;
        return this;
    }
    /**
     * @return {string}
     */
    getDestinationDir() {
        return this.destinationDir;
    }
    /**
     *
     * @param {string} tmpDir
     * @return {this}
     */
    setTmpDir(tmpDir) {
        this.tmpDir = tmpDir;
        return this;
    }
    /**
     * @return {string}
     */
    getTmpDir() {
        return this.tmpDir;
    }
    /**
     *
     * @param {string} resourceDir
     * @return {this}
     */
    setResourceDir(resourceDir) {
        this.resourceDir = resourceDir;
        return this;
    }
    /**
     * @return {string}
     */
    getResourceDir() {
        return this.resourceDir;
    }
    /**
     * @param {ContainerAggregateInterface} container
     * @return {this}
     */
    setStorageContainer(container) {
        this.storageContainer = container;
        return this;
    }
}
exports.Archive = Archive;
