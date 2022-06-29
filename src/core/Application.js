import { EventManagerAware } from "../event/index";
/**
 * @class
 * Application
 */
export class Application extends EventManagerAware {
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
    async loadModules(modules, container) {
        // Load module
        for (let cont = 0; modules.length > cont; cont++) {
            await this._loadModule(modules[cont], container);
            this.addModule(modules[cont]);
        }
        // Load widget
        for (let cont = 0; this.widgets.length > cont; cont++) {
            await this._loadWidget(this.widgets[cont]);
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
    async importModule(pathModule, container) {
        let fs = require('fs');
        if (!fs.existsSync(pathModule)) {
            return 'File not found at ' + pathModule;
        }
        let decompress = require('decompress');
        let done = await decompress(pathModule, this.modulePath);
        if (done[0].type !== 'directory') {
            return 'File dont contain module directory';
        }
        let configFile = `${this.modulePath}/${done[0].path}package.json`;
        if (!fs.existsSync(configFile)) {
            return 'File dont contain module directory';
        }
        let module = this.moduleHydrator.hydrate(JSON.parse(fs.readFileSync(configFile)));
        let laod = await this._loadModule(module, container);
        this.modules.splice((this.modules.length - 1), 0, module);
        this.getEventManager().emit(Application.IMPORT_MODULE, module);
        fs.writeFile(`${this.basePath}config/module.json`, JSON.stringify(this.modules, null, 4), function (err) {
            if (err)
                return console.error(err);
        });
        // TODO rewrite import widget
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
            wcEntryPoint = `${this.getModulePath()}/${module.getName()}/${module.getEntryPoint().getPath().getPath()}`;
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
                autoLoadPath = `${this.getModulePath()}/${module.getName()}/${module.getAutoloads()[cont].getPath().getPath()}`;
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
                    wcComponentPath = `${this.getModulePath()}/${module.getName()}/${module.getAutoloadsWc()[cont].getPath().getPath()}`;
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
            let configModulePath = `${this.getModulePath()}/${module.getName()}/${module.getConfigEntryPoint()}`;
            console.log(`Init ${module.getName()}`);
            configModule = await import(configModulePath);
            configModuleClass = new configModule.Repository();
            configModuleClass.setContainer(container);
            configModuleClass.init();
        }
    }
    /**
     *
     * @param {Widget} widget
     * @return {Promise<void>}
     */
    async _loadWidget(widget) {
        console.groupCollapsed(`Load Widget ${widget.getName()}`);
        let path;
        if (widget.getWebComponent() && customElements.get(widget.getWebComponent().getName()) === undefined) {
            path = `${this.basePath}module/${widget.getWebComponent().getPath().getPath()}`;
            try {
                await import(path);
                console.log(`Load entry point module "${widget.getWebComponent().getName()}" store in ${path}`, widget);
            }
            catch (err) {
                console.error(`Failed to load entry point module store in ${path}`, err);
            }
        }
        if (widget.getWebComponentData() && customElements.get(widget.getWebComponentData().getName()) === undefined) {
            path = `${this.basePath}module/${widget.getWebComponentData().getPath().getPath()}`;
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
//# sourceMappingURL=Application.js.map