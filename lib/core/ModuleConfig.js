ServiceManagerAware = require('./../service-manager/ServiceManagerAware');

class ModuleConfig extends ServiceManagerAware {

    /**
     * @param {ServiceManager} serviceManager
     */
    constructor(serviceManager) {
        super();

        this.setServiceManager(serviceManager);
    }

    /**
     * Init auto load module settings
     */
    init() {
        throw 'Must be override';
    }
}

module.exports = ModuleConfig;