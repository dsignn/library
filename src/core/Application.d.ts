import { ContainerInterface } from "../container/index";
import { Module } from "./module/index";
import { EventManagerAwareInterface, EventManagerInterface } from "../event/index";
import { Widget } from "./widget";
/**
 * @class
 * Application
 */
export declare class Application implements EventManagerAwareInterface {
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
     * @type {EventManager}
     */
    private eventManager;
    /**
     * @type {path}
     */
    private path;
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
    getResourcePath(): string;
    /**
     * @param {string} resourcePath
     * @return {Application}
     */
    setResourcePath(resourcePath: string): this;
    /**
     * @return {string}
     */
    getModulePath(): string;
    /**
     * @param {string} modulePath
     * @return {Application}
     */
    setModulePath(modulePath: string): this;
    /**
     * @return {string}
     */
    getSlash(): any;
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
     * @param {EventManagerInterface} eventManager
     * @return {this}
     */
    setEventManager(eventManager: EventManagerInterface): this;
    /**
     * @return {EventManagerInterface}
     */
    getEventManager(): EventManagerInterface;
    /**
     *
     * @param env
     */
    static getHomeApplicationDataDir(env: any): any;
    /**
     * @param {string} dataPath
     */
    static createDirectories(dataPath: string): void;
}
