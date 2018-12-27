/**
 *
 */
class ServiceManagerAware {

    constructor() {

        /**
         *
         * @type {ServiceManager|null}
         */
        this._serviceManager = null;
    }

    /**
     * @param serviceManager
     * @return {ServiceManagerAware}
     */
    setServiceManager(serviceManager) {

        this._serviceManager = serviceManager;
        return this;
    }

    /**
     * @return {ServiceManager|null}
     */
    getServiveManager() {
        return this._serviceManager;
    }
}

module.exports = ServiceManagerAware;