
/**
 * @class UrlBuilderInterface
 */
export interface UrlBuilderInterface {

    /**
     * @param {string} rootPath
     * @param {string} nameResource
     * @param {string} id
     * @param {string} method
     * @param {object} data
     */
    buildUrl(rootPath: string, nameResource: string, method: string, id?: string, data?: object): string;
}