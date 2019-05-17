import { Path } from "../../path/Path";
/**
 *  Widget
 */
export class Widget {
    constructor() {
        /**
         * @type {string}
         */
        this.name = null;
        /**
         * @type {string}
         */
        this.description = null;
        /**
         * @type {string}
         */
        this.wc = null;
        /**
         * @type {string}
         */
        this.dataProperty = null;
        /**
         * @type {string}
         */
        this.dataLabel = null;
        /**
         * @type {string}
         */
        this.dataRequired = false;
        /**
         * @type {Path}
         */
        this.path = new Path();
    }
}
//# sourceMappingURL=Widget.js.map