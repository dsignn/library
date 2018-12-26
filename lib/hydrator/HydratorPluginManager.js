ServiceManager = require('./../service-manager/ServiceManager.js');
/**
 * Hydrate by method property
 */
class HydratorPluginManager extends ServiceManager {

    /**
     * @returns HydratorPluginManager
     */
    static getInstance() {
        if (!this.instance) {
            this.instance = new HydratorPluginManager();
        }
        return this.instance;
    }
}

module.exports = HydratorPluginManager;