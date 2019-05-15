/**
 *
 */
export interface PaginationInterface {

    /**
     * @return {number}
     */
    getPage(): number;

    /**
     * @return number
     */
    getItemPerPage(): number;

    /**
     * @return {number}
     */
    getTotalItems(): number;
}