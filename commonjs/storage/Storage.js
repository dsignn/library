"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EventManager_1 = require("../event/EventManager");
const util_1 = require("./util");
/**
 *
 */
class Storage {
    /**
     * @param {StorageAdapterInterfaceInterface} adapter
     */
    constructor(adapter) {
        /**
         * @type {EventManagerInterface}
         */
        this.eventManager = new EventManager_1.EventManager();
        /**
         * @type {IdGeneratorInterface}
         */
        this.idGenerator = new util_1.MongoIdGenerator();
        /**
         * @type {StorageAdapterInterfaceInterface}
         */
        this.adapter = adapter;
    }
    /**
     * @param {EventManagerInterface} eventManager
     * @return {this}
     */
    setEventManager(eventManager) {
        this.eventManager = eventManager;
        return this;
    }
    /**
     * @return {EventManagerInterface}
     */
    getEventManager() {
        return this.eventManager;
    }
    /**
     * @return {HydratorInteface}
     */
    getHydrator() {
        return this.hydrator;
    }
    /**
     * @param {HydratorInteface} hydrator
     */
    setHydrator(hydrator) {
        this.hydrator = hydrator;
        return this;
    }
    /**
     * @inheritDoc
     */
    get(id) {
        return new Promise((resolve, reject) => {
            this.adapter.get(id)
                .then((data) => {
                // TODO add event
                resolve(this.getHydrator() ? this.getHydrator().hydrate(data) : data);
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
    getAll(filter) {
        return new Promise((resolve, reject) => {
            this.adapter.getAll(filter)
                .then((result) => {
                // TODO add this logic in the pagination class
                if (this.getHydrator()) {
                    for (let cont = 0; result.length > cont; cont++) {
                        result[cont] = this.hydrator ? this.hydrator.hydrate(result[cont]) : result[cont];
                    }
                }
                resolve(result);
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
    getPaged(page, itemCount, filter) {
        return new Promise((resolve, reject) => {
            this.adapter.getPaged(page, itemCount, filter)
                .then((result) => {
                // TODO add this logic in the pagination class
                if (this.getHydrator()) {
                    for (let cont = 0; result.length > cont; cont++) {
                        result[cont] = this.hydrator ? this.hydrator.hydrate(result[cont]) : result[cont];
                    }
                }
                resolve(result);
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
    /**
     * @inheritDoc
     */
    delete(entity) {
        return new Promise((resolve, reject) => {
            this.getEventManager().emit(Storage.BEFORE_REMOVE, entity);
            this.adapter.remove(entity)
                .then((data) => {
                this.getEventManager().emit(Storage.POST_REMOVE, entity);
                resolve(entity);
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
    /**
     * @inheritDoc
     */
    save(entity) {
        entity.setId(this.idGenerator.generateId());
        return new Promise((resolve, reject) => {
            this.getEventManager().emit(Storage.BEFORE_SAVE, entity);
            let data = this.hydrator ? this.hydrator.extract(entity) : entity;
            this.adapter.save(data)
                .then((data) => {
                this.getEventManager().emit(Storage.POST_SAVE, entity);
                resolve(entity);
            }).catch((err) => {
                reject(err);
            });
        });
    }
    /**
     * @inheritDoc
     */
    update(entity) {
        return new Promise((resolve, reject) => {
            this.getEventManager().emit(Storage.BEFORE_UPDATE, entity);
            let data = this.hydrator ? this.hydrator.extract(entity) : entity;
            this.adapter.update(data)
                .then((data) => {
                this.getEventManager().emit(Storage.POST_UPDATE, entity);
                resolve(entity);
            }).catch((err) => {
                reject(err);
            });
        });
    }
    /**
     * @param {IdGeneratorInterface} idGenerator
     */
    setIdGenerator(idGenerator) {
        this.idGenerator = idGenerator;
        return this;
    }
}
/**
 * Constants
 */
Storage.BEFORE_SAVE = "after-save";
Storage.POST_SAVE = "post-save";
Storage.BEFORE_UPDATE = "after-update";
Storage.POST_UPDATE = "post-update";
Storage.BEFORE_REMOVE = "after-remove";
Storage.POST_REMOVE = "post-remove";
Storage.BEFORE_GET = "after-get";
Storage.POST_GET = "post-get";
exports.Storage = Storage;
