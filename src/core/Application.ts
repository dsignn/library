import {ContainerInterface, ContainerAwareInterface} from "../container/index";
import {Module} from "./module/index";
import {EventManagerAware, EventManagerAwareInterface, EventManagerInterface} from "../event/index";
import {WidgetInterface} from "./widget/WidgetInterface";
import { HydratorInterface } from "../hydrator";
import { ComponentInterface } from "./ComponentInterface";
import { WebComponent } from "./webcomponent";

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
    static DELETE_MODULE: string = 'delete-module';

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
     * @type {string}
     */
    private additionalModulePath: string;

    /**
     * @type {string}
     */
    private nodeModulePath: string;

    /**
     * @type {Array}
     */
    private coreModules: Array<string> = [
        'dashboard',
        'monitor',
        'resource',
        'playlist',
        'admin'
    ];

    /**
     * @type {Array<Module>}
     */
    private modules: Array<Module> = [];

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
    public async addModule(pathModule: string, container: ContainerInterface) {
     
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

        this.modules.splice((this.modules.length-1), 0, module);

        this.getEventManager().emit(Application.IMPORT_MODULE, module);
    }

    /**
     * 
     * @param module 
     */
    public async deleteModule(module: Module) {

        var fs = require('fs');
        var pathModule = `${this.getAdditionalModulePath()}/${module.getName()}`;
        var stat = fs.lstatSync(pathModule);
        if (!stat.isDirectory()) {
            console.warn(`Directory ${pathModule} not found`);
            return;
        }

        fs.rmdir(pathModule,  { recursive: true }, (err) => {

            if (err) {
                throw err
            }

            let index = this.modules.findIndex((element) => {
                return element.getName() === module.getName();
            });
    
            this.modules.splice(index, 1);

            this.getEventManager().emit(Application.DELETE_MODULE, module);
        });
    };

    /**
     * @param listModules 
     */
    public setCoreModules(coreModules: Array<string>) {
        this.coreModules = coreModules;
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
        await this._loadShortcutComponent(module);

        /**
         * Import auto load ws
         */
        await this._loadAdminViewComponent(module);

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
    async _importAutoLoadClass(module: Module) {

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
    async _importAutoLoadWc(module: Module) {

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
     *
     * @param {Module} module
     * @return {Promise<void>}
     */
    private async _loadShortcutComponent(module: Module) {
        if (module.getShortcutComponent().length > 0) {
            let wcComponentPath;
            for (let cont = 0; module.getShortcutComponent().length > cont; cont++) {
                if (customElements.get(module.getShortcutComponent()[cont].getName()) === undefined) {
                    wcComponentPath = `${this.getModulePath(module)}/${module.getName()}/${module.getShortcutComponent()[cont].getPath().getPath()}`;
                    try {
                        let wcComponent = await import(wcComponentPath);
                        console.log(`Load shortcut component "${module.getShortcutComponent()[cont].getName()}" store in ${wcComponentPath}`, wcComponent);
                    }
                    catch (err) {
                        console.error(`Failed to load shortcut component  store in ${wcComponentPath}`, err);
                    }
                }
            }
        }
    }
    
    /**
     *
     * @param {Widget} widget
     * @return {Promise<void>}
     */
    private async _loadAdminViewComponent(module: Module) {
        if (module.getAdminViewComponent().length > 0) {
            let wcComponentPath;
            for (let cont = 0; module.getAdminViewComponent().length > cont; cont++) {
                if (customElements.get(module.getAdminViewComponent()[cont].getName()) === undefined) {
                    wcComponentPath = `${this.getModulePath(module)}/${module.getName()}/${module.getAdminViewComponent()[cont].getPath().getPath()}`;
                    try {
                        let wcComponent = await import(wcComponentPath);
                        console.log(`Load admin view component "${module.getAdminViewComponent()[cont].getName()}" store in ${wcComponentPath}`, wcComponent);
                    }
                    catch (err) {
                        console.error(`Failed to load admin view component  store in ${wcComponentPath}`, err);
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
            let configModulePath = `${this.getModulePath(module)}/${module.getName()}/${module.getConfigEntryPoint()}`;
            console.log(`Init ${module.getName()}`);

            configModule = await import(configModulePath);
           
            // TODO wordaroun to check if is core module
            if ( configModule.Repository.toString().search('class Repository') === 0) {
                configModuleClass = new configModule.Repository();
            } else {
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
    private async _loadWidget(widget: WidgetInterface) {
        console.groupCollapsed(`Load Widget ${widget.getName()}`);
        let path;

        if (widget.getWebComponent() && widget.getWebComponent().getName() && customElements.get(widget.getWebComponent().getName()) === undefined) {

            if (widget.getCore() === false) {
                path = `${this.getAdditionalModulePath()}/${widget.getWebComponent().getPath().getPath()}`;
            } else {           
                path = `${this.basePath}module/${widget.getWebComponent().getPath().getPath()}`;
            }

            try {
                await import(path);
                console.log(`Load entry point module "${widget.getWebComponent().getName()}" store in ${path}`, widget);
            } catch (err) {
                console.error(`Failed to load entry point module store in ${path}`, err);
            }
        }

        if (widget.getWebComponentData() && widget.getWebComponentData().getName() && customElements.get(widget.getWebComponentData().getName()) === undefined) {
           
            if (widget.getCore() === false) {
                path = `${this.getAdditionalModulePath()}/${widget.getWebComponentData().getPath().getPath()}`;
            } else {           
                path = `${this.basePath}module/${widget.getWebComponentData().getPath().getPath()}`;
            }

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
     * @returns {boolean}
     */
    isCore(module: Module): boolean {
        return this.coreModules.includes(module.getName());
    }

    /**
     * @private
     * @param {Module} module
     * @return {Application}
     */
    public _addModule(module:Module): Application {
        this.modules.push(module);
        return this;
    }

    /**
     * @return {Array<Module>}
     */
    public getModules(): Array<Module> {
        return this.modules;
    }

    /**
     * @return {Array<WidgetInterface>}
     */
    public getWidgets(): Array<WidgetInterface> {
        let data =  [];
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
    public setResourcePath(resourcePath: string): Application {
        this.resourcePath = resourcePath;
        return this;
    }

    /**
     * @return string
     */
    public getResourcePath(): string {
        return this.resourcePath;
    }

    /**
     * @param {string} modulePath
     * @return {Application}
     */
    public setModulePath(modulePath: string): Application {
        this.modulePath = modulePath;
        return this;
    }

    /**
     * @return string
     */
    public getModulePath(module: Module): string {
       
        return (this.coreModules.includes(module.getName())) ? this.modulePath : this.getAdditionalModulePath();
    }

    /**
     * @param {string} additionalModulePath 
     * @returns {Application}
     */
    public setAdditionalModulePath(additionalModulePath: string): Application {
        this.additionalModulePath = additionalModulePath;
        return this;
    }

    /**
     * @returns 
     */
    public getAdditionalModulePath(): string {
        return this.additionalModulePath;
    }

    /**
     * @param {string} nodeModulePath 
     * @returns {Application}
     */
     public setNodeModulePath(nodeModulePath: string): Application {
        this.nodeModulePath = nodeModulePath;
        return this;
    }

    /**
     * @returns 
     */
    public getNodeModulePath(): string {
        return this.nodeModulePath;
    }

    /**
     * @param {string} storagePath
     * @return {Application}
     */
    public setStoragePath(storagePath: string): Application {
        this.storagePath = storagePath;
        return this;
    }

    /**
     * @return string
     */
    public getStoragePath(): string {
        return this.storagePath;
    }

    /**
     * @param {string} basePath
     * @return {Application}
     */
    public setBasePath(basePath: string): Application {
        this.basePath = basePath;
        return this;
    }

    /**
     * @return {string}
     */
    public getBasePath(): string {
        return this.basePath;
    }

    /**
     * @param {HydratorInterface} moduleHydrator 
     * @return {Application}
     */
    public setModuleHydrator(moduleHydrator: HydratorInterface): Application {
        this.moduleHydrator = moduleHydrator;
        return this;
    }
}
