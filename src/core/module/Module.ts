/**
 *  Module
 */
export class Module {

    /**
     * @type string
     */
    private id: string = null;

    /**
     * @type string
     */
    private icon: string = '';

    /**
     * @type string
     */
    private name: string = '';

    /**
     * @type string
     */
    private webComponentEntryPointName: string = '';

    /**
     * @type {string}
     */
    private webComponentEntryPointNameFile: string = '';

    /**
     * @type {string}
     */
    private configEntryPoint:string = '';

    /**
     * @type string
     */
    private label: string = '';

    /**
     * @type Array<string>
     */
    private autoloads: Array<string> = [];

    /**
     * @type Array<string>
     */
    private autoloadsWs: Array<string> = [];

    /**
     * @return {string}
     */
    public getId() {
        return this.id;
    }

    /**
     * @param {string} id
     * @return {Module}
     */
    public setId(id: string) {
        this.id = id;
        return this;
    }

    /**
     * @return {string}
     */
    public getName() {
        return this.name;
    }

    /**
     * @param {string} name
     * @return {Module}
     */
    public setName(name: string) {
        this.name = name;
        return this;
    }

    /**
     * @return {string}
     */
    public getIcon() {
        return this.icon;
    }

    /**
     * @param {string} icon
     * @return {Module}
     */
    public setIcon(icon: string) {
        this.icon = icon;
        return this;
    }

    /**
     * @return {string}
     */
    public getWebComponentEntryPointName() {
        return this.webComponentEntryPointName;
    }

    /**
     * @param {string} webComponentEntryPointName
     * @return {Module}
     */
    public setWebComponentEntryPointName(webComponentEntryPointName: string) {
        this.webComponentEntryPointName = webComponentEntryPointName;
        return this;
    }

    /**
     * @return {string}
     */
    public getWebComponentEntryPointNameFile() {
        return this.webComponentEntryPointNameFile;
    }

    /**
     * @param {string} webComponentEntryPointNameFile
     * @return {Module}
     */
    public setWebComponentEntryPointNameFile(webComponentEntryPointNameFile: string) {
        this.webComponentEntryPointNameFile = webComponentEntryPointNameFile;
        return this;
    }

    /**
     * @return {string}
     */
    public getConfigEntryPoint() {
        return this.configEntryPoint;
    }

    /**
     * @param {string} configEntryPoint
     * @return {Module}
     */
    public setConfigEntryPoint(configEntryPoint: string) {
        this.configEntryPoint = configEntryPoint;
        return this;
    }

    /**
     * @return {Array<string>}
     */
    public getAutoloads() {
        return this.autoloads;
    }

    /**
     */
    public setAutoloads(autoloads: Array<string>) {
        this.autoloads = autoloads;
    }

    /**
     * @return {Array<string>}
     */
    public getAutoloadsWs() {
        return this.autoloadsWs;
    }

    /**
     * @param {Array<string>} autoloadsWs
     */
    public setAutoloadsWs(autoloadsWs: Array<string>) {
        this.autoloadsWs = autoloadsWs;
    }
}
