import { DefaultBuilder } from "./url/DefaultBuilder";
/**
 * @class XmlhAdapter
 */
export class XmlhAdapter {
    constructor() {
        /**
         * @type Object
         */
        this.headers = {};
        /**
         * @type UrlBuilderInterface
         */
        this.urlBuilder = new DefaultBuilder();
    }
    /**
     * @param {object} search
     * @returns {string}
     */
    _buildQueryString(search) {
        let query = '';
        let computeSearchItem = null;
        for (let value in search) {
            if (search.hasOwnProperty(value)) {
                computeSearchItem = `${value}=${search[value]}`;
                query += query ? `&${computeSearchItem}` : `?${computeSearchItem}`;
            }
        }
        return query;
    }
    /**
     * @param {XMLHttpRequest} request
     * @param {string} method
     * @returns {XMLHttpRequest}
     * @private
     */
    _appendHeaders(request, method) {
        let headers = {};
        if (this.headers[method]) {
            headers = this.headers[method];
        }
        else if (this.headers['default']) {
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
    addHeader(header, content, method) {
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
    removeHeader(header, method) {
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
    get(id) {
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            let method = 'GET';
            request.open(method, this.urlBuilder.buildUrl(this.rootPath, this.nameResource, method, id), true);
            // Append headers
            this._appendHeaders(request, method);
            // Result handler
            request.addEventListener('load', () => {
                if (request.status >= 300) {
                    return reject(this.dataDecode.dataDecode(request.response));
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
    getAll(filter) {
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            let method = 'GET';
            request.open(method, `${this.urlBuilder.buildUrl(this.rootPath, this.nameResource, method)}${this._buildQueryString(filter)}`, true);
            // Append headers
            this._appendHeaders(request, method);
            // Result handler
            request.addEventListener('load', () => {
                if (request.status >= 300) {
                    return reject(this.dataDecode.dataDecode(request.response));
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
    getNameCollection() {
        return "";
    }
    /**
     * @inheritDoc
     */
    getPaged(page, itemCount, filter) {
        return undefined;
    }
    /**
     * @inheritDoc
     */
    remove(data) {
        return undefined;
    }
    /**
     * @inheritDoc
     */
    save(data) {
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            let method = 'POST';
            request.open(method, this.urlBuilder.buildUrl(this.rootPath, this.nameResource, method), true);
            // Append headers
            this._appendHeaders(request, method);
            // Result handler
            request.addEventListener('load', () => {
                if (request.status >= 300) {
                    return reject(this.dataDecode.dataDecode(request.response));
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
    update(data) {
        return undefined;
    }
}
//# sourceMappingURL=XmlhAdapter.js.map