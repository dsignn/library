import { EventManager } from "../event/EventManager";
/**
 *  Application
 */
export class Application {
    constructor() {
        /**
         * @type {Array<Module>}
         */
        this.modules = [];
        /**
         * @type {EventManager}
         */
        this.eventManager = new EventManager();
        /**
         * @type {path}
         */
        this.path = require('path');
    }
    /**
     * @param {Array<Module>} modules
     * @param {ContainerInterface} container
     */
    async loadModules(modules, container) {
        for (let cont = 0; modules.length > cont; cont++) {
            this.modules.push(await this._loadModule(modules[cont], container));
        }
        this.getEventManager().emit(Application.BOOTSTRAP_MODULE, this.modules);
        return this.modules;
    }
    /**
     * @param {Module} module
     * @param {ContainerInterface} container
     * @return {Promise<Module>}
     * @private
     */
    async _loadModule(module, container) {
        /**
         * to run absolute path on windows, for polymer cli script c:/ !== /c:/ when use import
         */
        let modulePath = this.getModulePath();
        modulePath = modulePath.charAt(0) !== '/' ? `/${modulePath}` : modulePath;
        let configModule;
        let configModuleClass;
        let autoloadRequire;
        let wcEntryPoint;
        let wcComponent;
        console.group(`Load Module ${module.getName()}`);
        /**
         * Load entry point module
         */
        if (module.getWebComponentEntryPointName() && customElements && customElements.get(module.getWebComponentEntryPointName()) === undefined) {
            wcEntryPoint = `${modulePath}${module.getName()}${this.getSlash()}${module.getWebComponentEntryPointNameFile()}`;
            await import(wcEntryPoint)
                .then((moduleLoaded) => {
                console.log(`Load entry point module "${module.getWebComponentEntryPointName()}" store in ${wcEntryPoint}`);
            })
                .catch((err) => {
                console.error(`Failed to load entry point module store in ${wcEntryPoint}`);
            });
        }
        if (module.getAutoloads().length > 0) {
            for (let cont = 0; module.getAutoloads().length > cont; cont++) {
                autoloadRequire = require(`${this.getModulePath()}${module.getName()}${this.getSlash()}${this.path.normalize(module.getAutoloads()[cont])}`);
                window[autoloadRequire.name] = autoloadRequire;
            }
        }
        if (module.getAutoloadsWs().length > 0) {
            for (let cont = 0; module.getAutoloadsWs().length > cont; cont++) {
                wcComponent = `${modulePath}${module.getName()}${this.getSlash()}${this.path.normalize(module.getAutoloadsWs()[cont])}`;
                await import(wcComponent)
                    .then((moduleLoaded) => {
                    console.log(`Load web component store in "${wcComponent}"`);
                })
                    .catch((err) => {
                    console.error(`Failed to load autoloads store in ${wcComponent}`);
                });
            }
        }
        if (module.getConfigEntryPoint()) {
            let configModulePath = `${this.getModulePath()}${module.getName()}${this.getSlash()}${this.path.normalize(module.getConfigEntryPoint())}`;
            configModule = require(configModulePath);
            configModuleClass = new configModule();
            window[configModuleClass.constructor.name] = configModule;
            configModuleClass.setContainer(container);
            /**
             * Init module
             */
            await configModuleClass.init();
        }
        console.groupEnd();
        return module;
    }
    /**
     * @return {string}
     */
    getBasePath() {
        return this.basePath;
    }
    /**
     * @param {string} basePath
     * @return {Application}
     */
    setBasePath(basePath) {
        this.basePath = basePath;
        return this;
    }
    /**
     * @return {string}
     */
    getResourcePath() {
        return this.resourcePath;
    }
    /**
     * @param {string} resourcePath
     * @return {Application}
     */
    setResourcePath(resourcePath) {
        this.resourcePath = resourcePath;
        return this;
    }
    /**
     * @return {string}
     */
    getModulePath() {
        return this.modulePath;
    }
    /**
     * @param {string} modulePath
     * @return {Application}
     */
    setModulePath(modulePath) {
        this.modulePath = modulePath;
        return this;
    }
    /**
     * @return {string}
     */
    getSlash() {
        return this.path.sep;
    }
    /**
     * @param {Module} module
     */
    addModule(module) {
        this.modules.push(module);
    }
    /**
     * @return {Array<Module>}
     */
    getModules() {
        return this.modules;
    }
    /**
     * @param {string} id
     * @return Application
     */
    removeModule(id) {
        for (let cont = 0; this.modules.length > cont; cont) {
            if (this.modules[cont].getId() === id) {
                this.modules.splice(cont, 1);
                break;
            }
        }
        return this;
    }
    /**
     * @param {EventManagerInterface} eventManager
     * @return {this}
     */
    setEventManager(eventManager) {
        this.eventManager = eventManager;
        return this;
    }
    /**
     * @return {EventManagerInterface}
     */
    getEventManager() {
        return this.eventManager;
    }
}
/**
 * @type {string}
 */
Application.BOOTSTRAP_MODULE = 'bootstrap-module';
/**
 * @type {string}
 */
Application.LOAD_MODULE = 'laod-module';
//# sourceMappingURL=Application.js.map