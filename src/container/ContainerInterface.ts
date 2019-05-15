/**
 * ContainerInterface
 */

export interface ContainerInterface {

    /**
     * @param {string} id
     * @return Promise
     */
    get(id: string): any;

    /**
     *
     * @param {string} id
     * @return {Promise}
     */
    getAsync(id: string): Promise<any>;

    /**
     * @param {string} id
     * @return boolean
     */
    has(id: string): boolean;

    /**
     * @param {string} id
     * @param service
     * @return ContainerInterface
     */
    set(id: string, service: any);
}

