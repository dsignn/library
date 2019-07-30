/**
 * Event
 */
export declare class Event {
    /**
     * @type {string}
     */
    private name;
    /**
     * @type {object}
     */
    private data;
    /**
     * @type {boolean}
     */
    private stopPropagation;
    /**
     * @param {string} name
     * @param {object} data
     */
    constructor(name: any, data: any);
    /**
     * @param {boolean} stopPropagation
     */
    setStopPropagation(stopPropagation: boolean): this;
    /**
     * @return {boolean}
     */
    getStopPropagation(): boolean;
}
