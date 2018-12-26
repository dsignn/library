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
    core : {
        PaperToastNotification : require('./lib/core/PaperToastNotification.js'),
    },
    EvtManager : require('./lib/event/EvtManager.js'),
    hydrator : {
        HydratorPluginManager : require('./lib/hydrator/HydratorPluginManager.js'),
        AbstractHydrator : require('./lib/hydrator/AbstractHydrator.js'),
        AggregatePropertyHydrator : require('./lib/hydrator/AggregatePropertyHydrator.js'),
        HydratorAware :  require('./lib/hydrator/HydratorAware.js'),
        PropertyHydrator : require('./lib/hydrator/PropertyHydrator.js'),
        strategy : {
            HydratorStrategy : require('./lib/hydrator/strategy/HydratorStrategy.js'),
            NumberStrategy : require('./lib/hydrator/strategy/NumberStrategy.js')
        }
    },
    ModuleConfig : require('./lib/core/ModuleConfig.js'),
    ServiceManager : require('./lib/service-manager/ServiceManager.js'),
    sport : {
        model : {
            Match : require('./lib/sport/model/Match.js'),
            Player : require('./lib/sport/model/Player.js'),
            Staff : require('./lib/sport/model/Staff.js'),
            Team : require('./lib/sport/model/Team.js')
        }
    },
    storage : {
        StoragePluginManager : require('./lib/storage/StoragePluginManager.js'),
        Storage : require('./lib/storage/Storage.js'),
        adapter : {
            DexieCollection : require('./lib/storage/indexed-db/dexie/DexieCollection.js'),
            DexieManager : require('./lib/storage/indexed-db/dexie/DexieManager.js'),
            LocalStorage : require('./lib/storage/local-storage/LocalStorage.js'),
        },
        model : {
            Dates : require('./lib/storage/model/Dates'),
        }
    },
    Utils : require('./lib/Utils.js')
};

