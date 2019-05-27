"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const EventManager_1 = require("../event/EventManager");
/**
 *  Application
 */
class Application {
    constructor() {
        /**
         * @type {Array<Module>}
         */
        this.modules = [];
        /**
         * @type {Array<Module>}
         */
        this.widgets = [];
        /**
         * @type {EventManager}
         */
        this.eventManager = new EventManager_1.EventManager();
        /**
         * @type {path}
         */
        this.path = require('path');
    }
    /**
     * @param {Array<Module>} modules
     * @param {ContainerInterface} container
     */
    loadModules(modules, container) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let cont = 0; modules.length > cont; cont++) {
                this.modules.push(yield this._loadModule(modules[cont], container));
            }
            for (let cont = 0; this.widgets.length > cont; cont++) {
                yield this.loadWidget(this.widgets[cont]);
            }
            this.getEventManager().emit(Application.BOOTSTRAP_MODULE, this.modules);
            return this.modules;
        });
    }
    /**
     * @param {Module} module
     * @param {ContainerInterface} container
     * @return {Promise<Module>}
     * @private
     */
    _loadModule(module, container) {
        return __awaiter(this, void 0, void 0, function* () {
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
            console.groupCollapsed(`Load Module ${module.getName()}`);
            /**
             * Load entry point module
             */
            if (module.getWebComponentEntryPointName() && customElements && customElements.get(module.getWebComponentEntryPointName()) === undefined) {
                wcEntryPoint = `${modulePath}${module.getName()}${this.getSlash()}${module.getWebComponentEntryPointNameFile()}`;
                yield Promise.resolve().then(() => require(wcEntryPoint)).then((moduleLoaded) => {
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
                    yield Promise.resolve().then(() => require(wcComponent)).then((moduleLoaded) => {
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
                yield configModuleClass.init();
            }
            console.groupEnd();
            return module;
        });
    }
    /**
     *
     * @param {Widget} widget
     * @return {Promise<void>}
     */
    loadWidget(widget) {
        return __awaiter(this, void 0, void 0, function* () {
            console.groupCollapsed(`Load Widget ${widget.getName()}`);
            let path;
            if (widget.getWc()) {
                path = `${this.basePath}module/${widget.getSrc().getPath()}`;
                yield Promise.resolve().then(() => require(path)).then((moduleLoaded) => {
                    console.log(`Load widget store in "${path}"`);
                })
                    .catch((err) => {
                    console.error(`Failed to load widget store in ${path}`);
                });
            }
            if (widget.getWcData()) {
                path = `${this.basePath}module/${widget.getSrcData().getPath()}`;
                yield Promise.resolve().then(() => require(path)).then((moduleLoaded) => {
                    console.log(`Load widget data store in "${path}"`);
                })
                    .catch((err) => {
                    console.error(`Failed to load widget dagta store in ${path}`);
                });
            }
            console.groupEnd();
        });
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
     * @param {Widget} widget
     * @return {Application}
     */
    addWidget(widget) {
        this.widgets.push(widget);
        return this;
    }
    /**
     * @param {string} nameWs
     * @return {Application}
     */
    removeWidget(nameWs) {
        for (let cont = 0; this.widgets.length > cont; cont++) {
            if (this.widgets[cont].getWc() === nameWs) {
                this.widgets.splice(cont, 1);
                break;
            }
        }
        return this;
    }
    /**
     * @param {Array<Widget>} widgets
     * @return {this}
     */
    setWidgets(widgets) {
        this.widgets = widgets;
        return this;
    }
    /**
     * @return {Array<Widget>}
     */
    getWidgets() {
        return this.widgets;
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
     * @return {Application}
     */
    addModule(module) {
        this.modules.push(module);
        return this;
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
exports.Application = Application;
