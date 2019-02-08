/**
 *
 * @type {{archive: {Archive: Archive}, core: {Application: Application, ModuleConfig: ModuleConfig, PaperToastNotification: PaperToastNotification}, event: {EvtManager: EvtManager}, hydrator: {AbstractHydrator: AbstractHydrator, AggregatePropertyHydrator: AggregatePropertyHydrator, HydratorAware: HydratorAware, HydratorPluginManager: HydratorPluginManager, PropertyHydrator: PropertyHydrator, strategy: {HydratorStrategy: HydratorStrategy, NumberStrategy: NumberStrategy, HybridStrategy: HybridStrategy, BooleanStrategy: BooleanStrategy}}, net: {P2p: P2p}, parse: {BufferToObject: BufferToObject, ObjectToString: ObjectToString}, sport: {model: {Match: Match, Player: Player, Staff: Staff, Team: Team}}, serviceManager: {ServiceManager: ServiceManager, ServiceManagerAware: ServiceManagerAware}, storage: {Storage: Storage, StoragePluginManager: StoragePluginManager, adapter: {DexieCollection: DexieCollection, LocalStorage: LocalStorage, manager: {DexieManager: DexieManager}}, model: {Dates: Dates}}, Utils: Utils}}
 */
module.exports = {
    archive : {
        Archive : require('./lib/archive/Archive.js'),
    },
    core : {
        Application : require('./lib/core/Application.js'),
        ModuleConfig : require('./lib/core/ModuleConfig.js'),
        PaperToastNotification : require('./lib/core/PaperToastNotification.js')
    },
    event : {
        EvtManager : require('./lib/event/EvtManager.js'),
    },
    hydrator : {
        AbstractHydrator : require('./lib/hydrator/AbstractHydrator.js'),
        AggregatePropertyHydrator : require('./lib/hydrator/AggregatePropertyHydrator.js'),
        HydratorAware :  require('./lib/hydrator/HydratorAware.js'),
        HydratorPluginManager : require('./lib/hydrator/HydratorPluginManager.js'),
        PropertyHydrator : require('./lib/hydrator/PropertyHydrator.js'),
        strategy : {
            HydratorStrategy : require('./lib/hydrator/strategy/HydratorStrategy.js'),
            NumberStrategy : require('./lib/hydrator/strategy/NumberStrategy.js'),
            NullStrategy : require('./lib/hydrator/strategy/NullStrategy.js'),
            HybridStrategy : require('./lib/hydrator/strategy/HybridStrategy.js'),
            BooleanStrategy :  require('./lib/hydrator/strategy/BooleanStrategy.js'),
        }
    },
    net : {
        Http:  require('./lib/net/http/HttpClient'),
        P2p : require('./lib/net/p2p/P2p')
    },
    parse : {
        BufferToObject : require('./lib/parse/BufferToObject'),
        ObjectToString : require('./lib/parse/ObjectToString')
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
        Storage : require('./lib/storage/Storage.js'),
        StoragePluginManager : require('./lib/storage/StoragePluginManager.js'),
        adapter : {
            DexieCollection : require('./lib/storage/indexed-db/dexie/DexieCollection.js'),
            LocalStorage : require('./lib/storage/local-storage/LocalStorage.js'),
            manager : {
                DexieManager : require('./lib/storage/indexed-db/dexie/DexieManager.js')
            }
        },
        model : {
            Dates : require('./lib/storage/model/Dates')
        }
    },
    Utils : require('./lib/Utils.js')
};

