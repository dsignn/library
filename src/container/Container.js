/**
 * Container
 */
export class Container {
    constructor() {
        /**
         * @type {object}
         */
        this.services = {};
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
     *
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
        return this;
    }
    ;
}
//# sourceMappingURL=Container.js.map