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
         * @type {Array}
         */
        this.coreModules = [
            'dashboard',
            'monitor',
            'resource',
            'playlist',
            'admin'
        ];
        /**
         * @type {Array<Module>}
         */
        this.modules = [];
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
                this._addModule(modules[cont]);
            }
            for (let cont = 0; this.modules.length > cont; cont++) {
                let widgets = this.modules[cont].getWidgets();
                for (let cont1 = 0; widgets.length > cont1; cont1++) {
                    yield this._loadWidget(widgets[cont1]);
                }
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
    addModule(pathModule, container) {
        return __awaiter(this, void 0, void 0, function* () {
            let fs = require('fs');
            if (!fs.existsSync(pathModule)) {
                throw 'File not found at ' + pathModule;
            }
            let admZip = require('adm-zip');
            let zip = new admZip(pathModule);
            zip.extractAllTo(this.additionalModulePath, true);
            var zipEntries = zip.getEntries();
            if (!zipEntries[0].isDirectory) {
                throw 'File dont contain module directory';
            }
            let configFile = `${this.additionalModulePath}/${zipEntries[0].entryName}package.json`;
            if (!fs.existsSync(configFile)) {
                throw 'File dont contain module directory';
            }
            let module = this.moduleHydrator.hydrate(JSON.parse(fs.readFileSync(configFile)));
            let laod = yield this._loadModule(module, container);
            let widgets = module.getWidgets();
            for (let cont1 = 0; widgets.length > cont1; cont1++) {
                yield this._loadWidget(widgets[cont1]);
            }
            this.modules.splice((this.modules.length - 1), 0, module);
            this.getEventManager().emit(Application.IMPORT_MODULE, module);
        });
    }
    /**
     *
     * @param module
     */
    deleteModule(module) {
        return __awaiter(this, void 0, void 0, function* () {
            var fs = require('fs');
            var pathModule = `${this.getAdditionalModulePath()}/${module.getName()}`;
            var stat = fs.lstatSync(pathModule);
            if (!stat.isDirectory()) {
                console.warn(`Directory ${pathModule} not found`);
                return;
            }
            fs.rmdir(pathModule, { recursive: true }, (err) => {
                if (err) {
                    throw err;
                }
                let index = this.modules.findIndex((element) => {
                    return element.getName() === module.getName();
                });
                this.modules.splice(index, 1);
                this.getEventManager().emit(Application.DELETE_MODULE, module);
            });
        });
    }
    ;
    /**
     * @param listModules
     */
    setCoreModules(coreModules) {
        this.coreModules = coreModules;
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
            yield this._loadShortcutComponent(module);
            /**
             * Import auto load ws
             */
            yield this._loadAdminViewComponent(module);
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
                wcEntryPoint = `${this.getModulePath(module)}/${module.getName()}/${module.getEntryPoint().getPath().getPath()}`;
                try {
                    yield Promise.resolve(`${wcEntryPoint}`).then(s => require(s));
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
                    autoLoadPath = `${this.getModulePath(module)}/${module.getName()}/${module.getAutoloads()[cont].getPath().getPath()}`;
                    try {
                        autoLoadImport = yield Promise.resolve(`${autoLoadPath}`).then(s => require(s));
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
                        wcComponentPath = `${this.getModulePath(module)}/${module.getName()}/${module.getAutoloadsWc()[cont].getPath().getPath()}`;
                        try {
                            let wcComponent = yield Promise.resolve(`${wcComponentPath}`).then(s => require(s));
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
     *
     * @param {Module} module
     * @return {Promise<void>}
     */
    _loadShortcutComponent(module) {
        return __awaiter(this, void 0, void 0, function* () {
            if (module.getShortcutComponent().length > 0) {
                let wcComponentPath;
                for (let cont = 0; module.getShortcutComponent().length > cont; cont++) {
                    if (customElements.get(module.getShortcutComponent()[cont].getName()) === undefined) {
                        wcComponentPath = `${this.getModulePath(module)}/${module.getName()}/${module.getShortcutComponent()[cont].getPath().getPath()}`;
                        try {
                            let wcComponent = yield Promise.resolve(`${wcComponentPath}`).then(s => require(s));
                            console.log(`Load shortcut component "${module.getShortcutComponent()[cont].getName()}" store in ${wcComponentPath}`, wcComponent);
                        }
                        catch (err) {
                            console.error(`Failed to load shortcut component  store in ${wcComponentPath}`, err);
                        }
                    }
                }
            }
        });
    }
    /**
     *
     * @param {Widget} widget
     * @return {Promise<void>}
     */
    _loadAdminViewComponent(module) {
        return __awaiter(this, void 0, void 0, function* () {
            if (module.getAdminViewComponent().length > 0) {
                let wcComponentPath;
                for (let cont = 0; module.getAdminViewComponent().length > cont; cont++) {
                    if (customElements.get(module.getAdminViewComponent()[cont].getName()) === undefined) {
                        wcComponentPath = `${this.getModulePath(module)}/${module.getName()}/${module.getAdminViewComponent()[cont].getPath().getPath()}`;
                        try {
                            let wcComponent = yield Promise.resolve(`${wcComponentPath}`).then(s => require(s));
                            console.log(`Load admin view component "${module.getAdminViewComponent()[cont].getName()}" store in ${wcComponentPath}`, wcComponent);
                        }
                        catch (err) {
                            console.error(`Failed to load admin view component  store in ${wcComponentPath}`, err);
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
                let configModulePath = `${this.getModulePath(module)}/${module.getName()}/${module.getConfigEntryPoint()}`;
                console.log(`Init ${module.getName()}`);
                configModule = yield Promise.resolve(`${configModulePath}`).then(s => require(s));
                // TODO wordaroun to check if is core module
                if (configModule.Repository.toString().search('class Repository') === 0) {
                    configModuleClass = new configModule.Repository();
                }
                else {
                    let extModuleConfig = yield configModule.Repository();
                    configModuleClass = new extModuleConfig();
                }
                configModuleClass.setContainer(container);
                configModuleClass.init();
            }
        });
    }
    /**)
     *
     * @param {Widget} widget
     * @return {Promise<void>}
     */
    _loadWidget(widget) {
        return __awaiter(this, void 0, void 0, function* () {
            console.groupCollapsed(`Load Widget ${widget.getName()}`);
            let path;
            if (widget.getWebComponent() && widget.getWebComponent().getName() && customElements.get(widget.getWebComponent().getName()) === undefined) {
                if (widget.getCore() === false) {
                    path = `${this.getAdditionalModulePath()}/${widget.getWebComponent().getPath().getPath()}`;
                }
                else {
                    path = `${this.basePath}module/${widget.getWebComponent().getPath().getPath()}`;
                }
                try {
                    yield Promise.resolve(`${path}`).then(s => require(s));
                    console.log(`Load entry point module "${widget.getWebComponent().getName()}" store in ${path}`, widget);
                }
                catch (err) {
                    console.error(`Failed to load entry point module store in ${path}`, err);
                }
            }
            if (widget.getWebComponentData() && widget.getWebComponentData().getName() && customElements.get(widget.getWebComponentData().getName()) === undefined) {
                if (widget.getCore() === false) {
                    path = `${this.getAdditionalModulePath()}/${widget.getWebComponentData().getPath().getPath()}`;
                }
                else {
                    path = `${this.basePath}module/${widget.getWebComponentData().getPath().getPath()}`;
                }
                try {
                    yield Promise.resolve(`${path}`).then(s => require(s));
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
     * @returns {boolean}
     */
    isCore(module) {
        return this.coreModules.includes(module.getName());
    }
    /**
     * @private
     * @param {Module} module
     * @return {Application}
     */
    _addModule(module) {
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
     * @return {Array<WidgetInterface>}
     */
    getWidgets() {
        let data = [];
        for (let cont = 0; this.modules.length > cont; cont++) {
            let widgets = this.modules[cont].getWidgets();
            for (let cont1 = 0; widgets.length > cont1; cont1++) {
                data.push(widgets[cont1]);
            }
        }
        return data;
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
    getModulePath(module) {
        return (this.coreModules.includes(module.getName())) ? this.modulePath : this.getAdditionalModulePath();
    }
    /**
     * @param {string} additionalModulePath
     * @returns {Application}
     */
    setAdditionalModulePath(additionalModulePath) {
        this.additionalModulePath = additionalModulePath;
        return this;
    }
    /**
     * @returns
     */
    getAdditionalModulePath() {
        return this.additionalModulePath;
    }
    /**
     * @param {string} nodeModulePath
     * @returns {Application}
     */
    setNodeModulePath(nodeModulePath) {
        this.nodeModulePath = nodeModulePath;
        return this;
    }
    /**
     * @returns
     */
    getNodeModulePath() {
        return this.nodeModulePath;
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
    getBasePath() {
        return this.basePath;
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
Application.DELETE_MODULE = 'delete-module';
/**
 * @type {string}
 */
Application.IMPORT_MODULE = 'import-module';
exports.Application = Application;
