module.exports = {
    archive: {
        Archive: require('./commonjs/archive/Archive').Archive,
    },
    container : {
        Container: require('./commonjs/container/Container').Container,
        ContainerAware: require('./commonjs/container/ContainerAware').ContainerAware,
        ContainerAggregate: require('./commonjs/container/ContainerAggregate').ContainerAggregate
    },
    core : {
        Application: require('./commonjs/core/Application').Application,
        module: {
            Module: require('./commonjs/core/module/Module').Module
        },
        widget: {
            Module: require('./commonjs/core/widget/Widget').Widget
        }
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
            property : {
                MapHydratorStrategy : require('./commonjs/hydrator/strategy/proprerty/MapHydratorStrategy').MapProprertyStrategy,
            },
            value : {
                FixValueStrategy : require('./commonjs/hydrator/strategy/value/FixValueStrategy').FixValueStrategy,
                HydratorStrategy : require('./commonjs/hydrator/strategy/value/HydratorStrategy').HydratorStrategy,
                HybridStrategy : require('./commonjs/hydrator/strategy/value/HybridStrategy').HybridStrategy,
                NumberStrategy : require('./commonjs/hydrator/strategy/value/NumberStrategy').NumberStrategy,
                MongoIdStrategy : require('./commonjs/hydrator/strategy/value/MongoIdStrategy').MongoIdStrategy,
                PathStrategy : require('./commonjs/hydrator/strategy/value/PathStrategy').PathStrategy,
            }
        }
    },
    fs : {
        Fs: require('./commonjs/fs/Fs').Fs
    },
    localize : {
        Localize : require('./commonjs/localize/Localize').Localize
    },
    net : {
      P2p: require('./commonjs/net/P2p').P2p
    },
    path : {
        Path : require('./commonjs/path/Path').Path,
    },
    parse : {
        ObjectParse : require('./commonjs/parse/ObjectParse').ObjectParse,
        BufferParse : require('./commonjs/parse/BufferParse').BufferParse
    },
    permission : {
        acl: {
            Acl: require('./commonjs/permission/acl/Acl').Acl,
            adapter: {
                JsAclAdapter: require('./commonjs/permission/acl/adapter/JsAclAdapter').JsAclAdapter,
            }
        }
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
            },
            mongo : {
                MongoDb : require('./commonjs/storage/adapter/mongo/MongoDb').MongoDb,
                MongoCollectionAdapter : require('./commonjs/storage/adapter/mongo/MongoCollectionAdapter').MongoCollectionAdapter
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
    },
    validation : {
        RegExValidation : require('./commonjs/validation/RegExValidation').RegExValidation,
        DirectoryExistValidator : require('./commonjs/validation/DirectoryExistValidator').DirectoryExistValidator,
        DirectoryExistInPathValidator : require('./commonjs/validation/DirectoryExistInPathValidator').DirectoryExistInPathValidator
    }
};
