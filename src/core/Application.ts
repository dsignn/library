import {ContainerInterface, ContainerAwareInterface} from "../container/index";
import {Module} from "./module/index";
import {EventManagerAware, EventManagerAwareInterface, EventManagerInterface} from "../event/index";
import {WidgetInterface} from "./widget/WidgetInterface";
import { HydratorInterface } from "../hydrator";

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
    static IMPORT_MODULE: string = 'import-module';

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
         * @type {HydratorInterface}
     */
    private moduleHydrator: HydratorInterface;


    /**
     * @param {Array<Module>} modules
     * @param {ContainerInterface} container
     */
    public async loadModules(modules:Array<Module>, container:ContainerInterface) {

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
    public async importModule(pathModule: string, container: ContainerInterface) {
     
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
        this.modules.splice((this.modules.length-1), 0, module);

        this.getEventManager().emit(Application.IMPORT_MODULE, module);

        fs.writeFile(`${this.basePath}config/module.json` , JSON.stringify(this.modules, null, 4), function (err) {
            if (err) return console.error(err);
   
        });

        // TODO rewrite import widget
    }

    /**
     * @param {Module} module
     * @param {ContainerInterface} container
     * @return {Promise<Module>}
     * @private
     */
    private async _loadModule(module:Module, container:ContainerInterface) {

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
    async _importEntryPoint(module: Module) {

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
    async _importAutoLoadClass(module: Module) {

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
    async _importAutoLoadWc(module: Module) {

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
    async _importConfigModule(module : Module, container) {
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
    private async _loadWidget(widget: WidgetInterface) {
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

    /**
     * @param {HydratorInterface} moduleHydrator 
     * @return {Application}
     */
    public setModuleHydrator(moduleHydrator: HydratorInterface) {
        this.moduleHydrator = moduleHydrator;
        return this;
    }
}
