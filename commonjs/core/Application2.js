"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application2 = void 0;
const index_1 = require("../event/index");
/**
 * @class
 * Application
 */
class Application2 extends index_1.EventManagerAware {
    constructor() {
        super(...arguments);
        /**
         * @type {Array<Module>}
         */
        this.modules = [];
        /**
         * @type {Array<Module>}
         */
        this.widgets = [];
    }
    /**
     * @param {Array<Module>} modules
     * @param {ContainerInterface} container
     */
    loadModules(modules, container) {
        return __awaiter(this, void 0, void 0, function* () {
            // Load module
            for (let cont = 0; modules.length > cont; cont++) {
                yield this._loadModule(modules[cont], container);
            }
            // Load widget
            for (let cont = 0; this.widgets.length > cont; cont++) {
                yield this.loadWidget(this.widgets[cont]);
            }
            this.getEventManager().emit(Application2.BOOTSTRAP_MODULE, this.modules);
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
            this.addModule(module);
            /**
             * to run absolute path on windows, for polymer cli script c:/ !== /c:/ when use import
             */
            console.groupCollapsed(`Load Module ${module.getName()}`);
            /**
             * Load entry point module
             */
            yield this._importEntryPoint(module);
            /**
             * Import auto load class
             */
            yield this._importAutoLoadClass(module);
            /**
             * Import auto load ws
             */
            yield this._importAutoLoadWs(module);
            /**
             * Import auto load ws
             */
            yield this._importConfigModule(module, container);
            console.groupEnd();
            return module;
        });
    }
    /**
     * @param {Module} module
     * @private
     */
    _importEntryPoint(module) {
        return __awaiter(this, void 0, void 0, function* () {
            let wcEntryPoint;
            /**
             * Load entry point module
             */
            if (customElements && customElements.get(module.getEntryPoint().getName()) === undefined) {
                wcEntryPoint = `${this.getModulePath()}/${module.getName()}/${module.getEntryPoint().getPath()}`;
                try {
                    yield Promise.resolve().then(() => require(wcEntryPoint));
                    console.log(`Load entry point module "${module.getEntryPoint().getName()}" store in ${wcEntryPoint}`, module);
                }
                catch (err) {
                    console.error(`Failed to load entry point module store in ${wcEntryPoint}`, err);
                }
            }
        });
    }
    /**
     * @param {Module} module
     * @private
     */
    _importAutoLoadClass(module) {
        return __awaiter(this, void 0, void 0, function* () {
            if (module.getAutoloads().length > 0) {
                let autoLoadPath;
                let autoLoadImport;
                for (let cont = 0; module.getAutoloads().length > cont; cont++) {
                    autoLoadPath = `${this.getModulePath()}/${module.getName()}/${module.getAutoloads()[cont].path}`;
                    try {
                        autoLoadImport = yield Promise.resolve().then(() => require(autoLoadPath));
                        window[module.getAutoloads()[cont].name] = autoLoadImport[module.getAutoloads()[cont].name];
                        console.log(`Load auto load class in ${autoLoadPath}`, autoLoadImport);
                    }
                    catch (err) {
                        console.error(`Failed to load auto load class ${module.getAutoloads()[cont].name} in ${module.getAutoloads()[cont].path}`, err);
                    }
                }
            }
        });
    }
    /**
     * @param {Module} module
     * @private
     */
    _importAutoLoadWs(module) {
        return __awaiter(this, void 0, void 0, function* () {
            if (module.getAutoloadsWs().length > 0) {
                let wcComponentPath;
                for (let cont = 0; module.getAutoloadsWs().length > cont; cont++) {
                    if (customElements.get(module.getAutoloadsWs()[cont].getName()) === undefined) {
                        wcComponentPath = `${this.getModulePath()}/${module.getName()}/${module.getAutoloadsWs()[cont].getPath()}`;
                        try {
                            let wcComponent = yield Promise.resolve().then(() => require(wcComponentPath));
                            console.log(`Load web component "${module.getAutoloadsWs()[cont].getName()}" store in ${wcComponentPath}`, wcComponent);
                        }
                        catch (err) {
                            console.error(`Failed to load autoloads store in ${wcComponentPath}`, err);
                        }
                    }
                }
            }
        });
    }
    /**
     * @param {Module} module
     * @param {Container} container
     * @private
     */
    _importConfigModule(module, container) {
        return __awaiter(this, void 0, void 0, function* () {
            if (module.getConfigEntryPoint()) {
                let configModule;
                let configModuleClass;
                let configModulePath = `${this.getModulePath()}/${module.getName()}/${module.getConfigEntryPoint()}`;
                console.log(`Init ${module.name}`);
                configModule = yield Promise.resolve().then(() => require(configModulePath));
                configModuleClass = new configModule.Repository();
                configModuleClass.setContainer(container);
                configModuleClass.init();
            }
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
    getResourceRelativePath() {
        return this.resourceRelativePath;
    }
    /**
     * @param {string} resourceRelativePath
     * @return {Application}
     */
    setResourceRelativePath(resourceRelativePath) {
        this.resourceRelativePath = resourceRelativePath;
        return this;
    }
    /**
     * @return string
     */
    getResourcePath() {
        return `${this.basePath}${this.resourceRelativePath}`;
    }
    /**
     * @return {string}
     */
    getModuleRelativePath() {
        return this.moduleRelativePath;
    }
    /**
     * @param {string} moduleRelativePath
     * @return {Application}
     */
    setModuleRelativePath(moduleRelativePath) {
        this.moduleRelativePath = moduleRelativePath;
        return this;
    }
    /**
     * @return string
     */
    getModulePath() {
        return `${this.basePath}${this.moduleRelativePath}`;
    }
    /**
     * @return {string}
     */
    getStorageRelativePath() {
        return this.storageRelativePath;
    }
    /**
     * @param {string} storageRelativePath
     * @return {Application}
     */
    setStorageRelativePath(storageRelativePath) {
        this.storageRelativePath = storageRelativePath;
        return this;
    }
    /**
     * @return string
     */
    getStoragePath() {
        return `${this.basePath}${this.storageRelativePath}`;
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
}
exports.Application2 = Application2;
/**
 * @type {string}
 */
Application2.BOOTSTRAP_MODULE = 'bootstrap-module';
/**
 * @type {string}
 */
Application2.LOAD_MODULE = 'laod-module';
