/**
 *
 */
class ServiceManagerAware {

    constructor() {

        /**
         *
         * @type {ServiceManager|null}
         */
        this.serviceManager = null;
    }

    /**
     * @param serviceManager
     * @return {ServiceManagerAware}
     */
    setServiceManager(serviceManager) {

        this.serviceManager = serviceManager;
        return this;
    }

    /**
     * @return {ServiceManager|null}
     */
    getServiveManager() {
        return this.serviceManager;
    }
}

module.exports = ServiceManagerAware;