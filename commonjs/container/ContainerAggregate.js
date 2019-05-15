"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Container
 */
class ContainerAggregate {
    constructor() {
        /**
         * @type {object}
         */
        this.services = {};
    }
    /**
     * @inheritDoc
     */
    getContainer() {
        return this.container;
    }
    /**
     * @inheritDoc
     */
    setContainer(container) {
        this.container = container;
        return this;
    }
    /**
     * @inheritDoc
     */
    get(id) {
        if (typeof this.services[id] === 'function') {
            this.services[id] = this.services[id](this);
        }
        return this.services[id];
    }
    ;
    /**
     * @inheritDoc
     */
    getAsync(id) {
        return new Promise(function (resolve, reject) {
            /**
             * Inject container if the service is a callback
             */
            if (typeof this.services[id] === 'function') {
                this.services[id] = this.services[id](this);
            }
            resolve(this.services[id]);
        }.bind(this));
    }
    /**
     * @inheritDoc
     */
    has(id) {
        return !!this.services[id];
    }
    ;
    /**
     * @inheritDoc
     */
    set(id, service) {
        this.services[id] = service;
        if (typeof service !== 'function' && !this.isValid(service)) {
            throw 'Invalid service';
        }
        return this;
    }
    ;
    /**
     * @param service
     */
    isValid(service) {
        return service instanceof this.prototipeClass;
    }
    /**
     * @param prototipeClass
     * @return {this}
     */
    setPrototipeClass(prototipeClass) {
        this.prototipeClass = prototipeClass;
        return this;
    }
}
exports.ContainerAggregate = ContainerAggregate;
