/**
 * @type {
        Archive: Archive,
        EvtManager: EvtManager,
        Application: Application
    }
 */
module.exports = {
    Archive : require('./lib/archive/Archive.js'),
    EvtManager : require('./lib/event/EvtManager.js'),
    Application : require('./lib/core/Application.js')
};

