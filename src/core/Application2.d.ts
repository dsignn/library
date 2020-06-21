import { ContainerInterface } from "../container/index";
import { Module } from "./module/index";
import { EventManagerAware, EventManagerAwareInterface } from "../event/index";
import { Widget2 as Widget } from "./widget/Widget2";
/**
 * @class
 * Application
 */
export declare class Application2 extends EventManagerAware implements EventManagerAwareInterface {
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
    private basePath;
    /**
     * @type {string}
     */
    private storageRelativePath;
    /**
     * @type {string}
     */
    private resourceRelativePath;
    /**
     * @type {string}
     */
    private moduleRelativePath;
    /**
     * @type {Array<Module>}
     */
    private modules;
    /**
     * @type {Array<Module>}
     */
    private widgets;
    /**
     * @param {Array<Module>} modules
     * @param {ContainerInterface} container
     */
    loadModules(modules: Array<Module>, container: ContainerInterface): Promise<Module[]>;
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
    _importEntryPoint(module: any): Promise<void>;
    /**
     * @param {Module} module
     * @private
     */
    _importAutoLoadClass(module: any): Promise<void>;
    /**
     * @param {Module} module
     * @private
     */
    _importAutoLoadWs(module: any): Promise<void>;
    /**
     * @param {Module} module
     * @param {Container} container
     * @private
     */
    _importConfigModule(module: any, container: any): Promise<void>;
    /**
     *
     * @param {Widget} widget
     * @return {Promise<void>}
     */
    private loadWidget;
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
     * @param {Widget} widget
     * @return {Application}
     */
    addWidget(widget: Widget): this;
    /**
     * @param {string} nameWs
     * @return {Application}
     */
    removeWidget(nameWs: string): this;
    /**
     * @param {Array<Widget>} widgets
     * @return {this}
     */
    setWidgets(widgets: any): this;
    /**
     * @return {Array<Widget>}
     */
    getWidgets(): Widget[];
    /**
     * @return {string}
     */
    getResourceRelativePath(): string;
    /**
     * @param {string} resourceRelativePath
     * @return {Application}
     */
    setResourceRelativePath(resourceRelativePath: string): this;
    /**
     * @return string
     */
    getResourcePath(): string;
    /**
     * @return {string}
     */
    getModuleRelativePath(): string;
    /**
     * @param {string} moduleRelativePath
     * @return {Application}
     */
    setModuleRelativePath(moduleRelativePath: string): this;
    /**
     * @return string
     */
    getModulePath(): string;
    /**
     * @return {string}
     */
    getStorageRelativePath(): string;
    /**
     * @param {string} storageRelativePath
     * @return {Application}
     */
    setStorageRelativePath(storageRelativePath: string): this;
    /**
     * @return string
     */
    getStoragePath(): string;
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
}
