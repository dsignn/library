module.exports = {
    container : {
        Container: require('./commonjs/container/Container').Container,
        ContainerAware: require('./commonjs/container/ContainerAware').ContainerAware
    },
    core : {
        Application: require('./commonjs/core/Application').Application,
        module: {
            Module: require('./commonjs/core/module/Module').Module
        },

    },
    event : {
        Event: require('./commonjs/event/Event').Event,
        EventManagerAware: require('./commonjs/event/EventManagerAware').EventManagerAware,
        EventManager: require('./commonjs/event/EventManager').EventManager,
        Listener: require('./commonjs/event/Listener').Listener
    },
    hydrator : {
        AbstractHydrator: require('./commonjs/hydrator/AbstractHydrator').AbstractHydrator,
        PropertyHydrator: require('./commonjs/hydrator/PropertyHydrator').PropertyHydrator,
        AggregatePropertyHydrator: require('./commonjs/hydrator/AggregatePropertyHydrator').AggregatePropertyHydrator,
        strategy : {
            value : {
                HydratorStrategy : require('./commonjs/hydrator/strategy/value/HydratorStrategy').HydratorStrategy,
                HybridStrategy : require('./commonjs/hydrator/strategy/value/HybridStrategy').HybridStrategy,
                NumberStrategy : require('./commonjs/hydrator/strategy/value/NumberStrategy').NumberStrategy,
            }
        }
    },
    fs : {
        Fs: require('./commonjs/fs/Fs').Fs
    },
    localize : {
        Localize : require('./commonjs/localize/Localize').Localize
    },
    path : {
        Path : require('./commonjs/path/Path').Path,
    },
    sender : {
        ProxyIpc : require('./commonjs/sender/ProxyIpc').ProxyIpc,
        AbstractSender : require('./commonjs/sender/AbstractSender').AbstractSender
    },
    storage : {
        Storage : require('./commonjs/storage/Storage').Storage,
        adapter : {
            dexie : {
                DexieManager : require('./commonjs/storage/adapter/dexie/DexieManager').DexieManager,
                DexieAdapter : require('./commonjs/storage/adapter/dexie/DexieAdapter').DexieAdapter,
                Store : require('./commonjs/storage/adapter/dexie/Store').Store
            },
            localStorage: {
                LocalStorageAdapter : require('./commonjs/storage/adapter/local-storage/LocalStorageAdapter').LocalStorageAdapter
            }
        },
        entity : {
            EntityIdentifier : require('./commonjs/storage/entity/EntityIdentifier').EntityIdentifier,
            EntityNestedReference : require('./commonjs/storage/entity/EntityNestedReference').EntityNestedReference,
            EntityReference : require('./commonjs/storage/entity/EntityReference').EntityReference
        },
        util : {
            MongoIdGenerator : require('./commonjs/storage/util/MongoIdGenerator').MongoIdGenerator
        }
    }
};
