/**
 * @type {{Application: Application, Archive: Archive, core: {PaperToastNotification: PaperToastNotification}, EvtManager: EvtManager, hydrator: {HydratorPluginManager: HydratorPluginManager, AbstractHydrator: AbstractHydrator, AggregatePropertyHydrator: AggregatePropertyHydrator, HydratorAware: HydratorAware, PropertyHydrator: PropertyHydrator, strategy: {HydratorStrategy: HydratorStrategy, NumberStrategy: NumberStrategy}}, ModuleConfig: ModuleConfig, net: {P2p: P2p}, sport: {model: {Match: Match, Player: Player, Staff: Staff, Team: Team}}, serviceManager: {ServiceManager: ServiceManager, ServiceManagerAware: ServiceManagerAware}, storage: {StoragePluginManager: StoragePluginManager, Storage: Storage, adapter: {DexieCollection: DexieCollection, LocalStorage: LocalStorage, manager: {DexieManager: DexieManager}}, model: {Dates: Dates}}, Utils: Utils}}
 */
module.exports = {
    Application : require('./lib/core/Application.js'),
    Archive : require('./lib/archive/Archive.js'),
    core : {
        PaperToastNotification : require('./lib/core/PaperToastNotification.js'),
        ModuleConfig : require('./lib/core/ModuleConfig.js')
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
    net : {
        P2p : require('./lib/net/p2p/P2p'),
    },
    parse : {
        ObjectToString : require('./lib/parse/ObjectToString'),
        BufferToObject : require('./lib/parse/BufferToObject'),
    },
    sport : {
        model : {
            Match : require('./lib/sport/model/Match.js'),
            Player : require('./lib/sport/model/Player.js'),
            Staff : require('./lib/sport/model/Staff.js'),
            Team : require('./lib/sport/model/Team.js')
        }
    },
    serviceManager : {
        ServiceManager : require('./lib/service-manager/ServiceManager'),
        ServiceManagerAware : require('./lib/service-manager/ServiceManagerAware')
    },
    storage : {
        StoragePluginManager : require('./lib/storage/StoragePluginManager.js'),
        Storage : require('./lib/storage/Storage.js'),
        adapter : {
            DexieCollection : require('./lib/storage/indexed-db/dexie/DexieCollection.js'),
            LocalStorage : require('./lib/storage/local-storage/LocalStorage.js'),
            manager : {
                DexieManager : require('./lib/storage/indexed-db/dexie/DexieManager.js')
            }
        },
        model : {
            Dates : require('./lib/storage/model/Dates'),
        }
    },
    Utils : require('./lib/Utils.js')
};

