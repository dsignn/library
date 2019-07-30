export declare class Store {
    /**
     * @type
     */
    protected name: string;
    /**
     * @type {any[]}
     */
    protected index: Array<string>;
    /**
     * @param {string} name
     * @param {Array<string>} index
     */
    constructor(name: string, index: Array<string>);
    /**
     * @return string
     */
    getName(): string;
    /**
     * @return {string}
     */
    getIndexString(): string;
}
