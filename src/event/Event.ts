/**
 * Event
 */
export class Event {

    /**
     * @type {string}
     */
    private name:string;

    /**
     * @type {object}
     */
    private data:object = {};

    /**
     * @type {boolean}
     */
    private stopPropagation:boolean = false;

    /**
     * @param {string} name
     * @param {object} data
     */
    constructor(name, data) {

        this.name = name;

        this.data = data;
    }

    /**
     * @param {boolean} stopPropagation
     */
    public setStopPropagation(stopPropagation:boolean) {
        this.stopPropagation = stopPropagation;
        return this;
    }

    /**
     * @return {boolean}
     */
    public getStopPropagation() {
        return this.stopPropagation;
    }
}