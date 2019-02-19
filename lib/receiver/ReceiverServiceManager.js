ServiceManager = require('./../service-manager/ServiceManager.js');
/**
 *
 */
class ReceiverServiceManager extends ServiceManager {

    /**
     * @returns ReceiverServiceManager
     */
    static getInstance() {
        if (!this.instance) {
            this.instance = new ReceiverServiceManager();
        }
        return this.instance;
    }
}

module.exports = ReceiverServiceManager;