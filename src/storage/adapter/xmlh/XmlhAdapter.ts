import {StorageAdapterInterface} from "../StorageAdapterInterface";
import {DataDecodeInterface} from "../../../data-transform/DataDecodeInterface";
import {DataEncodeInterface} from "../../../data-transform/DataEncodeInterface";
import {UrlBuilderInterface} from "./url/UrlBuilderInterface";
import {DefaultBuilder} from "./url/DefaultBuilder";

/**
 * @class XmlhAdapter
 */
export class XmlhAdapter implements StorageAdapterInterface {

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
    protected headers: Object = {};

    /**
     * @type UrlBuilderInterface
     */
    protected urlBuilder: UrlBuilderInterface = new DefaultBuilder();

    /**
     * @param {object} search
     * @returns {string}
     */
    _buildQueryString(search: object): string {
        let query = '';
        let computeSearchItem = null;
        for (let value in search){
            if (search.hasOwnProperty(value)) {
                computeSearchItem = `${value}=${search[value]}`;
                query += query ? `&${computeSearchItem}` : `?${computeSearchItem}`;
            }
        }
        return query
    }

    /**
     * @param {XMLHttpRequest} request
     * @param {string} method
     * @returns {XMLHttpRequest}
     * @private
     */
    _appendHeaders(request: XMLHttpRequest, method: string): XMLHttpRequest {

        let headers= {};
        if (this.headers[method]) {
            headers = this.headers[method];
        } else if (this.headers['default']) {
            headers = this.headers['default'];
        }

        for (let headerName in headers) {
            request.setRequestHeader(headerName, headers[headerName]);
        }

        return request;
    }


    /**
     * @param {string} header
     * @param {string} content
     * @param {string} method
     * @returns {XmlhAdapter}
     */
    addHeader(header: string, content: string, method: string): XmlhAdapter {
        if (!method) {
            method = 'default';
        }

        if (!this.headers[method]) {
            this.headers[method] = {};
        }

        this.headers[method][header] = content;
        return this;
    }

    /**
     * @param {string} header
     * @param {string} method
     * @returns {XmlhAdapter}
     */
    removeHeader(header: string, method: string): XmlhAdapter {
        if (!method) {
            method = 'default';
        }

        if (!this.headers[method] && !this.headers[method][header]) {
            delete this.headers[method][header];
        }
        return this;
    }

    /**
     * @inheritDoc
     */
    get(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();

            let method = 'GET';

            request.open(
                method,
                this.urlBuilder.buildUrl(this.rootPath,  this.nameResource, method, id),
                true
            );
            // Append headers
            this._appendHeaders(request, method);

            // Result handler
            request.addEventListener('load', () => {

                if (request.status >= 300) {
                    return reject(this.dataDecode.dataDecode(request.response))
                }
                console.log('request ok', request.status);
                resolve(this.dataDecode.dataDecode(request.response));

            });

            // Error handler
            request.addEventListener('error', () => {
                console.log('error', request.status);
                reject(request.response);

            });

            request.send();
        });
    }

    /**
     * @inheritDoc
     */
    getAll(filter: object): Promise<any> {
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();

            let method = 'GET';

            request.open(
                method,
                `${this.urlBuilder.buildUrl(this.rootPath,  this.nameResource, method)}${this._buildQueryString(filter)}`,
                true
            );
            // Append headers
            this._appendHeaders(request, method);

            // Result handler
            request.addEventListener('load', () => {
                if (request.status >= 300) {
                    return reject(this.dataDecode.dataDecode(request.response))
                }
                console.log('request ok', request.status);
                resolve(this.dataDecode.dataDecode(request.response));

            });

            // Error handler
            request.addEventListener('error', () => {
                console.log('error', request.status);
                reject(request.response);

            });

            request.send();
        });
    }

    /**
     * @inheritDoc
     */
    getNameCollection(): string {
        return "";
    }

    /**
     * @inheritDoc
     */
    getPaged(page: number, itemCount: number, filter: object): Promise<any> {
        return undefined;
    }

    /**
     * @inheritDoc
     */
    remove(data: any): Promise<any> {
        return undefined;
    }

    /**
     * @inheritDoc
     */
    save(data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();

            let method = 'POST';

            request.open(
                method,
                this.urlBuilder.buildUrl(this.rootPath,  this.nameResource, method),
                true
            );

            // Append headers
            this._appendHeaders(request, method);

            // Result handler
            request.addEventListener('load', () => {
                if (request.status >= 300) {
                    return reject(this.dataDecode.dataDecode(request.response))
                }
                console.log('request ok', request.status);
                resolve(this.dataDecode.dataDecode(request.response));

            });

            // Error handler
            request.addEventListener('error', () => {
                console.log('error', request.status);
                reject(request.response);

            });

            request.send(this.dataEncode.dataEncode(data));
        });
    }

    /**
     * @inheritDoc
     */
    update(data: any): Promise<any> {
        return undefined;
    }
}