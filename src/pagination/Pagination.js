/**
 *
 */
export class Pagination extends Array {
    /**
     * @param {Array<any>} items
     * @param {number} page
     * @param {number} itemPerPage
     * @param {number} totalItems
     */
    constructor(items, page, itemPerPage, totalItems) {
        super();
        /**
         * @type number
         */
        this.itemPerPage = 0;
        /**
         * @type number
         */
        this.page = 1;
        /**
         * @type number
         */
        this.totalItems = 0;
        if (items.length > 0) {
            items.forEach(element => { this.push(element); });
        }
        this.page = page;
        this.itemPerPage = itemPerPage;
        this.totalItems = totalItems;
    }
    /**
     * @inheritDoc
     */
    getItemPerPage() {
        return 0;
    }
    /**
     * @inheritDoc
     */
    getPage() {
        return 0;
    }
    /**
     * @inheritDoc
     */
    getTotalItems() {
        return 0;
    }
}
//# sourceMappingURL=Pagination.js.map