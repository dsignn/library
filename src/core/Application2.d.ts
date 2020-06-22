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
}
