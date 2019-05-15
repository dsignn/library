import {PaginationInterface} from "./PaginationInterface";
import {HydratorInteface} from "../hydrator";
/**
 *
 */
export class Pagination extends Array implements PaginationInterface {

    /**
     * @type number
     */
    private itemPerPage:number = 0;

    /**
     * @type number
     */
    private page:number = 1;

    /**
     * @type number
     */
    private totalItems:number = 0;

    /**
     * @param {Array<any>} items
     * @param {number} page
     * @param {number} itemPerPage
     * @param {number} totalItems
     */
    constructor(items:Array<any>, page:number, itemPerPage:number, totalItems:number) {
        super();

        if (items.length > 0) {
            items.forEach(
                element => { this.push(element); }
            );
        }

        this.page = page;

        this.itemPerPage = itemPerPage;

        this.totalItems = totalItems;
    }

    /**
     * @inheritDoc
     */
    getItemPerPage(): number {
        return 0;
    }

    /**
     * @inheritDoc
     */
    getPage(): number {
        return 0;
    }

    /**
     * @inheritDoc
     */
    getTotalItems(): number {
        return 0;
    }
}