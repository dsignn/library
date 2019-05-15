/**
 *
 */
export interface StorageAdapterInterfaceInterface {

    /**
     * @param {string} id
     * @return {Promise<any>}
     */
    get(id: string) : Promise<any>;

    /**
     * @param {object} data
     * @return {Promise<any>}
     */
    save(data: any) : Promise<any>;

    /**
     * @param {object} data
     * @return {Promise<any>}
     */
    update(data: any) : Promise<any>;

    /**
     * @param {object} data
     * @return {Promise<any>}
     */
    remove(data: any) : Promise<any>;

    /**
     * @param {object} filter
     * @return {Promise<any>}
     */
    getAll(filter: object) : Promise<any>;

    /**
     * @param {number} page
     * @param {number} itemCount
     * @param {object} filter
     * @return {Promise<any>}
     */
    getPaged(page: number, itemCount: number, filter: object) : Promise<any>;
}