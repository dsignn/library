import { EventManagerAware } from "../event/index";
/**
 * @class
 * Application
 */
class Application extends EventManagerAware {
    constructor() {
        super(...arguments);
        /**
         * @type {Array}
         */
        this.coreModules = [
            'dashboard',
            'monitor',
            'resource',
            'timeslot',
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
    async loadModules(modules, container) {
        // Load module
        for (let cont = 0; modules.length > cont; cont++) {
            await this._loadModule(modules[cont], container);
            this._addModule(modules[cont]);
        }
        for (let cont = 0; this.modules.length > cont; cont++) {
            let widgets = this.modules[cont].getWidgets();
            for (let cont1 = 0; widgets.length > cont1; cont1++) {
                await this._loadWidget(widgets[cont1]);
            }
        }
        this.getEventManager().emit(Application.BOOTSTRAP_MODULE, this.modules);
        return this.modules;
    }
    /**
     *
     * @param {string} pathModule
     * @param {ContainerInterface} container
     * @returns
     */
    async addModule(pathModule, container) {
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
        let laod = await this._loadModule(module, container);
        let widgets = module.getWidgets();
        for (let cont1 = 0; widgets.length > cont1; cont1++) {
            await this._loadWidget(widgets[cont1]);
        }
        this.modules.splice((this.modules.length - 1), 0, module);
        this.getEventManager().emit(Application.IMPORT_MODULE, module);
    }
    /**
     *
     * @param module
     */
    async deleteModule(module) {
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
    }
    ;
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
        console.groupCollapsed(`Load Module ${module.getName()}`);
        /**
         * Load entry point module
         */
        await this._importEntryPoint(module);
        /**
         * Import auto load class
         */
        await this._importAutoLoadClass(module);
        /**
         * Import auto load ws
         */
        await this._importAutoLoadWc(module);
        /**
         * Import auto load ws
         */
        await this._importConfigModule(module, container);
        console.groupEnd();
        return module;
    }
    /**
     * @param {Module} module
     * @private
     */
    async _importEntryPoint(module) {
        let wcEntryPoint;
        /**
         * Load entry point module
         */
        if (customElements && customElements.get(module.getEntryPoint().getName()) === undefined) {
            wcEntryPoint = `${this.getModulePath(module)}/${module.getName()}/${module.getEntryPoint().getPath().getPath()}`;
            try {
                await import(wcEntryPoint);
                console.log(`Load entry point module "${module.getEntryPoint().getName()}" store in ${wcEntryPoint}`, module);
            }
            catch (err) {
                console.error(`Failed to load entry point module store in ${wcEntryPoint}`, err);
            }
        }
    }
    /**
     * @param {Module} module
     * @private
     */
    async _importAutoLoadClass(module) {
        if (module.getAutoloads().length > 0) {
            let autoLoadPath;
            let autoLoadImport;
            for (let cont = 0; module.getAutoloads().length > cont; cont++) {
                autoLoadPath = `${this.getModulePath(module)}/${module.getName()}/${module.getAutoloads()[cont].getPath().getPath()}`;
                try {
                    autoLoadImport = await import(autoLoadPath);
                    window[module.getAutoloads()[cont].getName()] = autoLoadImport[module.getAutoloads()[cont].getName()];
                    console.log(`Load auto load class in ${autoLoadPath}`, autoLoadImport);
                }
                catch (err) {
                    console.error(`Failed to load auto load class ${module.getAutoloads()[cont].getName()} in ${module.getAutoloads()[cont].getPath()}`, err);
                }
            }
        }
    }
    /**
     * @param {Module} module
     * @private
     */
    async _importAutoLoadWc(module) {
        if (module.getAutoloadsWc().length > 0) {
            let wcComponentPath;
            for (let cont = 0; module.getAutoloadsWc().length > cont; cont++) {
                if (customElements.get(module.getAutoloadsWc()[cont].getName()) === undefined) {
                    wcComponentPath = `${this.getModulePath(module)}/${module.getName()}/${module.getAutoloadsWc()[cont].getPath().getPath()}`;
                    try {
                        let wcComponent = await import(wcComponentPath);
                        console.log(`Load web component "${module.getAutoloadsWc()[cont].getName()}" store in ${wcComponentPath}`, wcComponent);
                    }
                    catch (err) {
                        console.error(`Failed to load autoloads store in ${wcComponentPath}`, err);
                    }
                }
            }
        }
    }
    /**
     * @param {Module} module
     * @param {Container} container
     * @private
     */
    async _importConfigModule(module, container) {
        if (module.getConfigEntryPoint()) {
            let configModule;
            let configModuleClass;
            let configModulePath = `${this.getModulePath(module)}/${module.getName()}/${module.getConfigEntryPoint()}`;
            console.log(`Init ${module.getName()}`);
            configModule = await import(configModulePath);
            // TODO wordaroun to check if is core module
            if (configModule.Repository.toString().search('class Repository') === 0) {
                configModuleClass = new configModule.Repository();
            }
            else {
                let extModuleConfig = await configModule.Repository();
                configModuleClass = new extModuleConfig();
            }
            configModuleClass.setContainer(container);
            configModuleClass.init();
        }
    }
    /**)
     *
     * @param {Widget} widget
     * @return {Promise<void>}
     */
    async _loadWidget(widget) {
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
                await import(path);
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
                await import(path);
                console.log(`Load entry point module "${widget.getWebComponentData().getName()}" store in ${path}`, widget);
            }
            catch (err) {
                console.error(`Failed to load entry point module store in ${path}`, err);
            }
        }
        console.groupEnd();
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
export { Application };
//# sourceMappingURL=Application.js.map