import { EventManager } from "../event/EventManager";
/**
 * @class
 * Application
 */
export class Application {
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
        for (let cont = 0; this.widgets.length > cont; cont++) {
            await this.loadWidget(this.widgets[cont]);
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
        let wcComponentPath;
        console.groupCollapsed(`Load Module ${module.getName()}`);
        /**
         * Load entry point module
         */
        if (customElements && customElements.get(module.getEntryPoint().getName()) === undefined) {
            wcEntryPoint = `${modulePath}${module.getName()}${this.getSlash()}${module.getEntryPoint().getPath().getPath()}`;
            try {
                await import(wcEntryPoint);
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
                        let wcComponent = await import(wcComponentPath);
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
            await configModuleClass.init();
        }
        console.groupEnd();
        return module;
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
    /**
     *
     * @param env
     */
    static getHomeApplicationDataDir(env) {
        if (!env.HOME) {
            throw 'Dont set home directory in environment object';
        }
        if (!env.npm_package_name) {
            throw 'Dont set the name in the package json';
        }
        let directory;
        const os = require('os');
        const path = require('path');
        switch (os.type()) {
            case 'Linux':
                directory = `${env.HOME}${path.sep}.config${path.sep}${env.npm_package_name}`;
                break;
            case 'Darwin':
                directory = `${env.HOME}${path.sep}Library${path.sep}Application Support${path.sep}${env.npm_package_name}`;
                break;
            case 'Window_NT':
                directory = `${env.HOME}${path.sep}AppData${path.sep}Local${path.sep}${env.npm_package_name}`;
                break;
        }
        return directory;
    }
    /**
     * @param {string} dataPath
     */
    static createDirectories(dataPath) {
        const fs = require('fs');
        const fse = require('fs-extra');
        const path = require('path');
        try {
            if (!fs.existsSync(`${dataPath}${path.sep}storage`)) {
                fse.mkdirpSync(`${dataPath}${path.sep}storage`);
            }
            if (!fs.existsSync(`${dataPath}${path.sep}storage${path.sep}resource`)) {
                fse.mkdirpSync(`${dataPath}${path.sep}storage${path.sep}resource`);
            }
            if (!fs.existsSync(`${dataPath}${path.sep}storage${path.sep}archive`)) {
                fse.mkdirpSync(`${dataPath}${path.sep}storage${path.sep}archive`);
            }
            if (!fs.existsSync(`${dataPath}${path.sep}storage${path.sep}tmp`)) {
                fse.mkdirpSync(`${dataPath}${path.sep}storage${path.sep}tmp`);
            }
        }
        catch (err) {
            console.error(err);
        }
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