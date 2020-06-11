import { StorageAdapterInterface } from "../StorageAdapterInterface";
import { DataDecodeInterface } from "../../../data-transform/DataDecodeInterface";
import { DataEncodeInterface } from "../../../data-transform/DataEncodeInterface";
import { UrlBuilderInterface } from "./url/UrlBuilderInterface";
/**
 * @class XmlhAdapter
 */
export declare class XmlhAdapter implements StorageAdapterInterface {
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
     * @inheritDoc
     */
    getNameCollection(): string;
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
}
