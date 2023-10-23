import { ContainerInterface } from "../container/index";
import { Module } from "./module/index";
import { EventManagerAware, EventManagerAwareInterface } from "../event/index";
import { WidgetInterface } from "./widget/WidgetInterface";
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
     * @type {string}
     */
    private additionalModulePath;
    /**
     * @type {string}
     */
    private nodeModulePath;
    /**
     * @type {Array}
     */
    private coreModules;
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
    addModule(pathModule: string, container: ContainerInterface): Promise<void>;
    /**
     *
     * @param module
     */
    deleteModule(module: Module): Promise<void>;
    /**
     * @param listModules
     */
    setCoreModules(coreModules: Array<string>): void;
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
     *
     * @param {Module} module
     * @return {Promise<void>}
     */
    private _loadShortcutComponent;
    /**
     *
     * @param {Widget} widget
     * @return {Promise<void>}
     */
    private _loadAdminViewComponent;
    /**
     * @param {Module} module
     * @param {Container} container
     * @private
     */
    _importConfigModule(module: Module, container: any): Promise<void>;
    /**)
     *
     * @param {Widget} widget
     * @return {Promise<void>}
     */
    private _loadWidget;
    /**
     * @param {Module} module
     * @returns {boolean}
     */
    isCore(module: Module): boolean;
    /**
     * @private
     * @param {Module} module
     * @return {Application}
     */
    _addModule(module: Module): Application;
    /**
     * @return {Array<Module>}
     */
    getModules(): Array<Module>;
    /**
     * @return {Array<WidgetInterface>}
     */
    getWidgets(): Array<WidgetInterface>;
    /**
     * @param {string} resourcePath
     * @return {Application}
     */
    setResourcePath(resourcePath: string): Application;
    /**
     * @return string
     */
    getResourcePath(): string;
    /**
     * @param {string} modulePath
     * @return {Application}
     */
    setModulePath(modulePath: string): Application;
    /**
     * @return string
     */
    getModulePath(module: Module): string;
    /**
     * @param {string} additionalModulePath
     * @returns {Application}
     */
    setAdditionalModulePath(additionalModulePath: string): Application;
    /**
     * @returns
     */
    getAdditionalModulePath(): string;
    /**
     * @param {string} nodeModulePath
     * @returns {Application}
     */
    setNodeModulePath(nodeModulePath: string): Application;
    /**
     * @returns
     */
    getNodeModulePath(): string;
    /**
     * @param {string} storagePath
     * @return {Application}
     */
    setStoragePath(storagePath: string): Application;
    /**
     * @return string
     */
    getStoragePath(): string;
    /**
     * @param {string} basePath
     * @return {Application}
     */
    setBasePath(basePath: string): Application;
    /**
     * @return {string}
     */
    getBasePath(): string;
    /**
     * @param {HydratorInterface} moduleHydrator
     * @return {Application}
     */
    setModuleHydrator(moduleHydrator: HydratorInterface): Application;
}
