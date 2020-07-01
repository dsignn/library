import {ContainerInterface, ContainerAwareInterface} from "../container/index";
import {Module} from "./module/index";
import {EventManagerAware, EventManagerAwareInterface, EventManagerInterface} from "../event/index";
import {WidgetInterface} from "./widget/WidgetInterface";

/**
 * @class
 * Application
 */
export class Application extends EventManagerAware implements EventManagerAwareInterface {

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
    private storagePath: string;

    /**
     * @type {string}
     */
    private resourcePath: string;

    /**
     * @type {string}
     */
    private modulePath: string;

    /**
     * @type {Array<Module>}
     */
    private modules: Array<Module> = [];

    /**
     * @type {Array<Module>}
     */
    private widgets: Array<WidgetInterface> = [];


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

        this.getEventManager().emit(Application.BOOTSTRAP_MODULE, this.modules);
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
                    wcComponentPath = `${this.getModulePath()}/${module.getName()}/${module.getAutoloadsWs()[cont].getPath().getPath()}`;
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
    private async loadWidget(widget: WidgetInterface) {
        console.groupCollapsed(`Load Widget ${widget.getName()}`);
        let path;

        if (widget.getWebComponent() && customElements.get(widget.getWebComponent().getName()) === undefined) {
            path = `${this.basePath}module/${widget.getWebComponent().getPath().getPath()}`;
            try {
                await import(path);
                console.log(`Load entry point module "${widget.getWebComponent().getName()}" store in ${path}`, widget);
            } catch (err) {
                console.error(`Failed to load entry point module store in ${path}`, err);
            }
        }

        if (widget.getWebComponentData() && customElements.get(widget.getWebComponentData().getName()) === undefined) {
            path = `${this.basePath}module/${widget.getWebComponentData().getPath().getPath()}`;
            try {
                await import(path);
                console.log(`Load entry point module "${widget.getWebComponentData().getName()}" store in ${path}`, widget);
            } catch (err) {
                console.error(`Failed to load entry point module store in ${path}`, err);
            }
        }
        console.groupEnd();
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

    /**
     * @param {WidgetInterface} widget
     * @return {Application}
     */
    public addWidget(widget: WidgetInterface) {
        this.widgets.push(widget);
        return this;
    }

    /**
     * @param {string} nameWs
     * @return {Application}
     */
    public removeWidget(nameWs: string) {

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
    public setWidgets(widgets: Array<WidgetInterface>) {
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
     * @param {string} resourcePath
     * @return {Application}
     */
    public setResourcePath(resourcePath: string) {
        this.resourcePath = resourcePath;
        return this;
    }

    /**
     * @return string
     */
    public getResourcePath() {
        return this.resourcePath;
    }

    /**
     * @param {string} modulePath
     * @return {Application}
     */
    public setModulePath(modulePath: string) {
        this.modulePath = modulePath;
        return this;
    }

    /**
     * @return string
     */
    public getModulePath() {
        return this.modulePath;
    }

    /**
     * @param {string} storagePath
     * @return {Application}
     */
    public setStoragePath(storagePath: string) {
        this.storagePath = storagePath;
        return this;
    }

    /**
     * @return string
     */
    public getStoragePath() {
        return this.storagePath;
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
}
