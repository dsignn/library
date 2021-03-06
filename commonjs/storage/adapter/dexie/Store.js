"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Store = void 0;
class Store {
    /**
     * @param {string} name
     * @param {Array<string>} index
     */
    constructor(name, index) {
        /**
         * @type {any[]}
         */
        this.index = [];
        this.name = name;
        this.index = index;
    }
    /**
     * @return string
     */
    getName() {
        return this.name;
    }
    /**
     * @return {string}
     */
    getIndexString() {
        let indexString = '';
        for (let cont = 0; this.index.length > cont; cont++) {
            indexString = cont === (this.index.length - 1) ?
                indexString + this.index[cont] :
                indexString + this.index[cont] + ', ';
        }
        return indexString;
    }
}
exports.Store = Store;
