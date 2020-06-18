import { EventManagerAware } from "../event/index";
/**
 * @class
 * Application
 */
export class Application2 extends EventManagerAware {
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
        }
        // Load widget
        for (let cont = 0; this.widgets.length > cont; cont++) {
            await this.loadWidget(this.widgets[cont]);
        }
        this.getEventManager().emit(Application2.BOOTSTRAP_MODULE, this.modules);
        return this.modules;
    }
    /**
     * @param {Module} module
     * @param {ContainerInterface} container
     * @return {Promise<Module>}
     * @private
     */
    async _loadModule(module, container) {
        this.addModule(module);
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
        await this._importAutoLoadWs(module);
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
            wcEntryPoint = `${this.getModulePath()}/${module.getName()}/${module.getEntryPoint().getPath()}`;
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
                autoLoadPath = `${this.getModulePath()}/${module.getName()}/${module.getAutoloads()[cont].path}`;
                try {
                    autoLoadImport = await import(autoLoadPath);
                    window[module.getAutoloads()[cont].name] = autoLoadImport[module.getAutoloads()[cont].name];
                    console.log(`Load auto load class in ${autoLoadPath}`, autoLoadImport);
                }
                catch (err) {
                    console.error(`Failed to load auto load class ${module.getAutoloads()[cont].name} in ${module.getAutoloads()[cont].path}`, err);
                }
            }
        }
    }
    /**
     * @param {Module} module
     * @private
     */
    async _importAutoLoadWs(module) {
        if (module.getAutoloadsWs().length > 0) {
            let wcComponentPath;
            for (let cont = 0; module.getAutoloadsWs().length > cont; cont++) {
                if (customElements.get(module.getAutoloadsWs()[cont].getName()) === undefined) {
                    wcComponentPath = `${this.getModulePath()}/${module.getName()}/${module.getAutoloadsWs()[cont].getPath()}`;
                    try {
                        let wcComponent = await import(wcComponentPath);
                        console.log(`Load web component "${module.getAutoloadsWs()[cont].getName()}" store in ${wcComponentPath}`, wcComponent);
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
            console.log(`Init ${module.name}`);
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
    async loadWidget(widget) {
        console.groupCollapsed(`Load Widget ${widget.getName()}`);
        let path;
        if (widget.getWc() && customElements.get(widget.getWc()) === undefined) {
            path = `${this.basePath}module/${widget.getSrc().getPath()}`;
            try {
                await import(path);
                console.log(`Load entry point module "${widget.getWc()}" store in ${path}`, widget);
            }
            catch (err) {
                console.error(`Failed to load entry point module store in ${path}`, err);
            }
        }
        if (widget.getWcData() && customElements.get(widget.getWcData()) === undefined) {
            path = `${this.basePath}module/${widget.getSrcData().getPath()}`;
            try {
                await import(path);
                console.log(`Load entry point module "${widget.getWcData()}" store in ${path}`, widget);
            }
            catch (err) {
                console.error(`Failed to load entry point module store in ${path}`, err);
            }
        }
        console.groupEnd();
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
/**
 * @type {string}
 */
Application2.BOOTSTRAP_MODULE = 'bootstrap-module';
/**
 * @type {string}
 */
Application2.LOAD_MODULE = 'laod-module';
//# sourceMappingURL=Application2.js.map