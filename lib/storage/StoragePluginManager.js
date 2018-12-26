ServiceManager = require('./../service-manager/ServiceManager.js');
/**
 *
 */
class StoragePluginManager extends ServiceManager {

    /**
     * @returns StoragePluginManager
     */
    static getInstance() {
        if (!this.instance) {
            this.instance = new StoragePluginManager();
        }
        return this.instance;
    }
}

module.exports = StoragePluginManager;