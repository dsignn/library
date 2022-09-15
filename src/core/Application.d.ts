import { ContainerInterface } from "../container/index";
import { Module } from "./module/index";
import { EventManagerAware, EventManagerAwareInterface } from "../event/index";
import { HydratorInterface } from "../hydrator";
/**
 * @class
 * Application
 */
export declare class Application extends EventManagerAware implements EventManagerAwareInterface {
    /**
     * @type {string}
     */
    static BOOTSTRAP_MODULE: string;
    /**
     * @type {string}
     */
    static LOAD_MODULE: string;
    /**
     * @type {string}
     */
    static DELETE_MODULE: string;
    /**
     * @type {string}
     */
    static IMPORT_MODULE: string;
    /**
     * @type {string}
     */
    private basePath;
    /**
     * @type {string}
     */
    private storagePath;
    /**
     * @type {string}
     */
    private resourcePath;
    /**
     * @type {string}
     */
    private modulePath;
    /**
     * @type {Array<Module>}
     */
    private modules;
    /**
         * @type {HydratorInterface}
     */
    private moduleHydrator;
    /**
     * @param {Array<Module>} modules
     * @param {ContainerInterface} container
     */
    loadModules(modules: Array<Module>, container: ContainerInterface): Promise<Module[]>;
    /**
     *
     * @param {string} pathModule
     * @param {ContainerInterface} container
     * @returns
     */
    importModule(pathModule: string, container: ContainerInterface): Promise<string>;
    /**
     *
     * @param module
     */
    deleteModule(module: Module): Promise<void>;
    /**
     * @param {Module} module
     * @param {ContainerInterface} container
     * @return {Promise<Module>}
     * @private
     */
    private _loadModule;
    /**
     * @param {Module} module
     * @private
     */
    _importEntryPoint(module: Module): Promise<void>;
    /**
     * @param {Module} module
     * @private
     */
    _importAutoLoadClass(module: Module): Promise<void>;
    /**
     * @param {Module} module
     * @private
     */
    _importAutoLoadWc(module: Module): Promise<void>;
    /**
     * @param {Module} module
     * @param {Container} container
     * @private
     */
    _importConfigModule(module: Module, container: any): Promise<void>;
    /**
     *
     * @param {Widget} widget
     * @return {Promise<void>}
     */
    private _loadWidget;
    /**
     * @param {Module} module
     * @return {Application}
     */
    addModule(module: Module): this;
    /**
     * @return {Array<Module>}
     */
    getModules(): Module[];
    /**
     * @param {string} id
     * @return Application
     */
    removeModule(id: string): this;
    /**
     * @return {Array<Widget>}
     */
    getWidgets(): any[];
    /**
     * @param {string} resourcePath
     * @return {Application}
     */
    setResourcePath(resourcePath: string): this;
    /**
     * @return string
     */
    getResourcePath(): string;
    /**
     * @param {string} modulePath
     * @return {Application}
     */
    setModulePath(modulePath: string): this;
    /**
     * @return string
     */
    getModulePath(): string;
    /**
     * @param {string} storagePath
     * @return {Application}
     */
    setStoragePath(storagePath: string): this;
    /**
     * @return string
     */
    getStoragePath(): string;
    /**
     * @return {string}
     */
    getBasePath(): string;
    /**
     * @param {string} basePath
     * @return {Application}
     */
    setBasePath(basePath: string): this;
    /**
     * @param {HydratorInterface} moduleHydrator
     * @return {Application}
     */
    setModuleHydrator(moduleHydrator: HydratorInterface): this;
}
