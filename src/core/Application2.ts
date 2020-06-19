import {ContainerInterface, ContainerAwareInterface} from "../container/index";
import {Module} from "./module/index";
import {EventManagerAware, EventManagerAwareInterface, EventManagerInterface} from "../event/index";
import {Widget} from "./widget";

/**
 * @class
 * Application
 */
export class Application2 extends EventManagerAware implements EventManagerAwareInterface {

    /**
     * @type {string}
     */
    static BOOTSTRAP_MODULE: string = 'bootstrap-module';

    /**
     * @type {string}
     */
    static LOAD_MODULE: string = 'laod-module';

    /**
     * @type {string}
     */
    private basePath: string;

    /**
     * @type {string}
     */
    private storageRelativePath: string;

    /**
     * @type {string}
     */
    private resourceRelativePath: string;

    /**
     * @type {string}
     */
    private moduleRelativePath: string;

    /**
     * @type {Array<Module>}
     */
    private modules: Array<Module> = [];

    /**
     * @type {Array<Module>}
     */
    private widgets: Array<Widget> = [];


    /**
     * @param {Array<Module>} modules
     * @param {ContainerInterface} container
     */
    public async loadModules(modules:Array<Module>, container:ContainerInterface) {

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
    private async _loadModule(module:Module, container:ContainerInterface) {

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

                autoLoadPath = `${this.getModulePath()}/${module.getName()}/${module.getAutoloads()[cont].getPath()}`;
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
    private async loadWidget(widget: Widget) {
        console.groupCollapsed(`Load Widget ${widget.getName()}`);
        let path;

        if (widget.getWc() && customElements.get(widget.getWc()) === undefined) {
            path = `${this.basePath}module/${widget.getSrc().getPath()}`;
            try {
                await import(path);
                console.log(`Load entry point module "${widget.getWc()}" store in ${path}`, widget);
            } catch (err) {
                console.error(`Failed to load entry point module store in ${path}`, err);
            }
        }

        if (widget.getWcData() && customElements.get(widget.getWcData()) === undefined) {
            path = `${this.basePath}module/${widget.getSrcData().getPath()}`;
            try {
                await import(path);
                console.log(`Load entry point module "${widget.getWcData()}" store in ${path}`, widget);
            } catch (err) {
                console.error(`Failed to load entry point module store in ${path}`, err);
            }
        }
        console.groupEnd();
    }

    /**
     * @return {string}
     */
    public getBasePath() {
        return this.basePath;
    }

    /**
     * @param {string} basePath
     * @return {Application}
     */
    public setBasePath(basePath: string) {
        this.basePath = basePath;
        return this;
    }

    /**
     * @param {Widget} widget
     * @return {Application}
     */
    public addWidget(widget: Widget) {
        this.widgets.push(widget);
        return this;
    }

    /**
     * @param {string} nameWs
     * @return {Application}
     */
    public removeWidget(nameWs: string) {

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
    public setWidgets(widgets) {
        this.widgets = widgets;
        return this;
    }

    /**
     * @return {Array<Widget>}
     */
    public getWidgets() {
        return this.widgets;
    }

    /**
     * @return {string}
     */
    public getResourceRelativePath() {
        return this.resourceRelativePath;
    }

    /**
     * @param {string} resourceRelativePath
     * @return {Application}
     */
    public setResourceRelativePath(resourceRelativePath: string) {
        this.resourceRelativePath = resourceRelativePath;
        return this;
    }

    /**
     * @return string
     */
    public getResourcePath() {
        return `${this.basePath}${this.resourceRelativePath}`
    }

    /**
     * @return {string}
     */
    public getModuleRelativePath() {
        return this.moduleRelativePath;
    }

    /**
     * @param {string} moduleRelativePath
     * @return {Application}
     */
    public setModuleRelativePath(moduleRelativePath: string) {
        this.moduleRelativePath = moduleRelativePath;
        return this;
    }

    /**
     * @return string
     */
    public getModulePath() {
        return `${this.basePath}${this.moduleRelativePath}`
    }

    /**
     * @return {string}
     */
    public getStorageRelativePath() {
        return this.storageRelativePath;
    }

    /**
     * @param {string} storageRelativePath
     * @return {Application}
     */
    public setStorageRelativePath(storageRelativePath: string) {
        this.storageRelativePath = storageRelativePath;
        return this;
    }


    /**
     * @return string
     */
    public getStoragePath() {
        return `${this.basePath}${this.storageRelativePath}`
    }


    /**
     * @param {Module} module
     * @return {Application}
     */
    public addModule(module:Module) {
        this.modules.push(module);
        return this;
    }

    /**
     * @return {Array<Module>}
     */
    public getModules() {
        return this.modules;
    }

    /**
     * @param {string} id
     * @return Application
     */
    public removeModule(id: string) {
        for (let cont = 0; this.modules.length > cont; cont) {
            if (this.modules[cont].getId() === id) {
                this.modules.splice(cont, 1);
                break;
            }
        }
        return this;
    }
}
