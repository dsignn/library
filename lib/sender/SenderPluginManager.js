ServiceManager = require('./../service-manager/ServiceManager.js');
/**
 *
 */
class SenderPluginManager extends ServiceManager {

    /**
     * @returns CommunicatorPluginManager
     */
    static getInstance() {
        if (!this.instance) {
            this.instance = new SenderPluginManager();
        }
        return this.instance;
    }
}

module.exports = SenderPluginManager;