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
            let wcComponentPath;
            console.groupCollapsed(`Load Module ${module.getName()}`);
            /**
             * Load entry point module
             */
            if (customElements && customElements.get(module.getEntryPoint().getName()) === undefined) {
                wcEntryPoint = `${modulePath}${module.getName()}${this.getSlash()}${module.getEntryPoint().getPath().getPath()}`;
                try {
                    yield Promise.resolve().then(() => require(wcEntryPoint));
                    console.log(`Load entry point module "${module.getEntryPoint().getName()}" store in ${wcEntryPoint}`, module);
                }
                catch (err) {
                    console.error(`Failed to load entry point module store in ${wcEntryPoint}`, err);
                }
            }
            if (module.getAutoloads().length > 0) {
                for (let cont = 0; module.getAutoloads().length > cont; cont++) {
                    autoloadRequire = require(`${this.getModulePath()}${module.getName()}${this.getSlash()}${this.path.normalize(module.getAutoloads()[cont])}`);
                    window[autoloadRequire.name] = autoloadRequire;
                }
            }
            if (module.getAutoloadsWs().length > 0) {
                for (let cont = 0; module.getAutoloadsWs().length > cont; cont++) {
                    if (customElements.get(module.getAutoloadsWs()[cont].getName()) === undefined) {
                        wcComponentPath = `${modulePath}${module.getName()}${this.getSlash()}${this.path.normalize(module.getAutoloadsWs()[cont].getPath().getPath())}`;
                        try {
                            let wcComponent = yield Promise.resolve().then(() => require(wcComponentPath));
                            console.log(`Load web component store in  "${module.getAutoloadsWs()[cont].getPath().getPath()}" store in ${module.getAutoloadsWs()[cont].getName()}`, wcComponent);
                        }
                        catch (err) {
                            console.error(`Failed to load autoloads store in ${module.getAutoloadsWs()[cont].getPath().getPath()}`, err);
                        }
                    }
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
            if (widget.getWc() && customElements.get(widget.getWc()) === undefined) {
                path = `${this.basePath}module/${widget.getSrc().getPath()}`;
                try {
                    yield Promise.resolve().then(() => require(path));
                    console.log(`Load entry point module "${widget.getWc()}" store in ${path}`, widget);
                }
                catch (err) {
                    console.error(`Failed to load entry point module store in ${path}`, err);
                }
            }
            if (widget.getWcData() && customElements.get(widget.getWcData()) === undefined) {
                path = `${this.basePath}module/${widget.getSrcData().getPath()}`;
                try {
                    yield Promise.resolve().then(() => require(path));
                    console.log(`Load entry point module "${widget.getWcData()}" store in ${path}`, widget);
                }
                catch (err) {
                    console.error(`Failed to load entry point module store in ${path}`, err);
                }
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
