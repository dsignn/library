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
    getServiceManager() {
        return this._serviceManager;
    }
}

module.exports = ServiceManagerAware;