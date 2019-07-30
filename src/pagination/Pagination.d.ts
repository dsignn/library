import { PaginationInterface } from "./PaginationInterface";
/**
 *
 */
export declare class Pagination extends Array implements PaginationInterface {
    /**
     * @type number
     */
    private itemPerPage;
    /**
     * @type number
     */
    private page;
    /**
     * @type number
     */
    private totalItems;
    /**
     * @param {Array<any>} items
     * @param {number} page
     * @param {number} itemPerPage
     * @param {number} totalItems
     */
    constructor(items: Array<any>, page: number, itemPerPage: number, totalItems: number);
    /**
     * @inheritDoc
     */
    getItemPerPage(): number;
    /**
     * @inheritDoc
     */
    getPage(): number;
    /**
     * @inheritDoc
     */
    getTotalItems(): number;
}
