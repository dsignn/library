/**
 * @type {
        Archive: Archive,
        EvtManager: EvtManager,
        Application: Application
    }
 */
module.exports = {
    Application : require('./lib/core/Application.js'),
    Archive : require('./lib/archive/Archive.js'),
    EvtManager : require('./lib/event/EvtManager.js'),
    hydrator : {
        HydratorPluginManager : require('./lib/hydrator/HydratorPluginManager.js'),
        AbstractHydrator : require('./lib/hydrator/AbstractHydrator.js'),
        AggregatePropertyHydrator : require('./lib/hydrator/AggregatePropertyHydrator.js'),
        HydratorAware :  require('./lib/hydrator/HydratorAware.js'),
        PropertyHydrator : require('./lib/hydrator/PropertyHydrator.js'),
        strategy : {
            HydratorStrategy : require('./lib/hydrator/strategy/HydratorStrategy.js'),
            NumberStrategy : require('./lib/hydrator/strategy/NumberStrategy.js'),
        }
    },
    ModuleConfig : require('./lib/core/ModuleConfig.js'),
    ServiceManager : require('./lib/service-manager/ServiceManager.js'),
    storage : {
        StoragePluginManager : require('./lib/storage/StoragePluginManager.js')
    }
};

