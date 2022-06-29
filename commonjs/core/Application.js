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
exports.Application = void 0;
const index_1 = require("../event/index");
/**
 * @class
 * Application
 */
class Application extends index_1.EventManagerAware {
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
                this.addModule(modules[cont]);
            }
            // Load widget
            for (let cont = 0; this.widgets.length > cont; cont++) {
                yield this._loadWidget(this.widgets[cont]);
            }
            this.getEventManager().emit(Application.BOOTSTRAP_MODULE, this.modules);
            return this.modules;
        });
    }
    /**
     *
     * @param {string} pathModule
     * @param {ContainerInterface} container
     * @returns
     */
    importModule(pathModule, container) {
        return __awaiter(this, void 0, void 0, function* () {
            let fs = require('fs');
            if (!fs.existsSync(pathModule)) {
                return 'File not found at ' + pathModule;
            }
            let decompress = require('decompress');
            let done = yield decompress(pathModule, this.modulePath);
            if (done[0].type !== 'directory') {
                return 'File dont contain module directory';
            }
            let configFile = `${this.modulePath}/${done[0].path}package.json`;
            if (!fs.existsSync(configFile)) {
                return 'File dont contain module directory';
            }
            let module = this.moduleHydrator.hydrate(JSON.parse(fs.readFileSync(configFile)));
            let laod = yield this._loadModule(module, container);
            this.modules.splice((this.modules.length - 1), 0, module);
            this.getEventManager().emit(Application.IMPORT_MODULE, module);
            fs.writeFile(`${this.basePath}config/module.json`, JSON.stringify(this.modules, null, 4), function (err) {
                if (err)
                    return console.error(err);
            });
            // TODO rewrite import widget
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
            yield this._importAutoLoadWc(module);
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
                wcEntryPoint = `${this.getModulePath()}/${module.getName()}/${module.getEntryPoint().getPath().getPath()}`;
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
                    autoLoadPath = `${this.getModulePath()}/${module.getName()}/${module.getAutoloads()[cont].getPath().getPath()}`;
                    try {
                        autoLoadImport = yield Promise.resolve().then(() => require(autoLoadPath));
                        window[module.getAutoloads()[cont].getName()] = autoLoadImport[module.getAutoloads()[cont].getName()];
                        console.log(`Load auto load class in ${autoLoadPath}`, autoLoadImport);
                    }
                    catch (err) {
                        console.error(`Failed to load auto load class ${module.getAutoloads()[cont].getName()} in ${module.getAutoloads()[cont].getPath()}`, err);
                    }
                }
            }
        });
    }
    /**
     * @param {Module} module
     * @private
     */
    _importAutoLoadWc(module) {
        return __awaiter(this, void 0, void 0, function* () {
            if (module.getAutoloadsWc().length > 0) {
                let wcComponentPath;
                for (let cont = 0; module.getAutoloadsWc().length > cont; cont++) {
                    if (customElements.get(module.getAutoloadsWc()[cont].getName()) === undefined) {
                        wcComponentPath = `${this.getModulePath()}/${module.getName()}/${module.getAutoloadsWc()[cont].getPath().getPath()}`;
                        try {
                            let wcComponent = yield Promise.resolve().then(() => require(wcComponentPath));
                            console.log(`Load web component "${module.getAutoloadsWc()[cont].getName()}" store in ${wcComponentPath}`, wcComponent);
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
                console.log(`Init ${module.getName()}`);
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
    _loadWidget(widget) {
        return __awaiter(this, void 0, void 0, function* () {
            console.groupCollapsed(`Load Widget ${widget.getName()}`);
            let path;
            if (widget.getWebComponent() && customElements.get(widget.getWebComponent().getName()) === undefined) {
                path = `${this.basePath}module/${widget.getWebComponent().getPath().getPath()}`;
                try {
                    yield Promise.resolve().then(() => require(path));
                    console.log(`Load entry point module "${widget.getWebComponent().getName()}" store in ${path}`, widget);
                }
                catch (err) {
                    console.error(`Failed to load entry point module store in ${path}`, err);
                }
            }
            if (widget.getWebComponentData() && customElements.get(widget.getWebComponentData().getName()) === undefined) {
                path = `${this.basePath}module/${widget.getWebComponentData().getPath().getPath()}`;
                try {
                    yield Promise.resolve().then(() => require(path));
                    console.log(`Load entry point module "${widget.getWebComponentData().getName()}" store in ${path}`, widget);
                }
                catch (err) {
                    console.error(`Failed to load entry point module store in ${path}`, err);
                }
            }
            console.groupEnd();
        });
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
     * @param {WidgetInterface} widget
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
            if (this.widgets[cont].getWebComponent().getName() === nameWs) {
                this.widgets.splice(cont, 1);
                break;
            }
        }
        return this;
    }
    /**
     * @param {Array<WidgetInterface>} widgets
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
     * @param {string} resourcePath
     * @return {Application}
     */
    setResourcePath(resourcePath) {
        this.resourcePath = resourcePath;
        return this;
    }
    /**
     * @return string
     */
    getResourcePath() {
        return this.resourcePath;
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
     * @return string
     */
    getModulePath() {
        return this.modulePath;
    }
    /**
     * @param {string} storagePath
     * @return {Application}
     */
    setStoragePath(storagePath) {
        this.storagePath = storagePath;
        return this;
    }
    /**
     * @return string
     */
    getStoragePath() {
        return this.storagePath;
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
     * @param {HydratorInterface} moduleHydrator
     * @return {Application}
     */
    setModuleHydrator(moduleHydrator) {
        this.moduleHydrator = moduleHydrator;
        return this;
    }
}
exports.Application = Application;
/**
 * @type {string}
 */
Application.BOOTSTRAP_MODULE = 'bootstrap-module';
/**
 * @type {string}
 */
Application.LOAD_MODULE = 'laod-module';
/**
* @type {string}
*/
Application.IMPORT_MODULE = 'import-module';
