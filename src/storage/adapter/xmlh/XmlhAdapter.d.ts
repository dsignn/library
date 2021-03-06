import { StorageAdapterInterface } from "../StorageAdapterInterface";
import { DataDecodeInterface } from "../../../data-transform/DataDecodeInterface";
import { DataEncodeInterface } from "../../../data-transform/DataEncodeInterface";
import { UrlBuilderInterface } from "./url/UrlBuilderInterface";
/**
 * TODO refactor
 * @class XmlhAdapter
 */
export declare class XmlhAdapter implements StorageAdapterInterface {
    protected errorStatus: Object;
    /**
     * @type string
     */
    protected rootPath: string;
    /**
     * @type string
     */
    protected nameResource: string;
    /**
     * @type DataEncodeInterface
     */
    protected dataEncode: DataEncodeInterface;
    /**
     * @type DataDecodeInterface
     */
    protected dataDecode: DataDecodeInterface;
    /**
     * @type Object
     */
    protected headers: Object;
    /**
     * @type string
     */
    protected updateMethod: string;
    /**
     * @type UrlBuilderInterface
     */
    protected urlBuilder: UrlBuilderInterface;
    /**
     * @param rootPath
     * @param nameResource
     * @param dataEncode
     * @param dataDecode
     */
    constructor(rootPath: string, nameResource: string, dataEncode: DataEncodeInterface, dataDecode: DataDecodeInterface, urlBuilder: UrlBuilderInterface);
    /**
     * @param {object} search
     * @returns {string}
     */
    _buildQueryString(search: object): string;
    /**
     * @param {XMLHttpRequest} request
     * @param {string} method
     * @returns {XMLHttpRequest}
     * @private
     */
    _appendHeaders(request: XMLHttpRequest, method: string): XMLHttpRequest;
    /**
     * @param {string} header
     * @param {string} content
     * @param {string} method
     * @returns {XmlhAdapter}
     */
    addHeader(header: string, content: string, method: string): XmlhAdapter;
    /**
     * @param {string} header
     * @param {string} method
     * @returns {XmlhAdapter}
     */
    removeHeader(header: string, method: string): XmlhAdapter;
    /**
     * @param method
     */
    getHeaders(method: string): any;
    /**
     * @inheritDoc
     */
    getNameCollection(): string;
    /**
     * @param {string} method
     */
    setUpdateMethod(method: any): this;
    /**
     * @inheritDoc
     */
    get(id: string): Promise<any>;
    /**
     * @inheritDoc
     */
    getAll(filter: object): Promise<any>;
    /**
     * @inheritDoc
     */
    getPaged(page: number, itemCount: number, filter: object): Promise<any>;
    /**
     * @inheritDoc
     */
    remove(data: any): Promise<any>;
    /**
     * @inheritDoc
     */
    save(data: any): Promise<any>;
    /**
     * @inheritDoc
     */
    update(data: any): Promise<any>;
    /**
     *
     * @param method
     * @param url
     * @param headers
     * @param data
     * @param query
     * @param options
     */
    request(method: string, url: string, headers: object, data: object, query: object, options: object): Promise<unknown>;
}
