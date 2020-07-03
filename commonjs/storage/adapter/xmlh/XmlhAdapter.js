"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XmlhAdapter = void 0;
const DefaultBuilder_1 = require("./url/DefaultBuilder");
const pagination_1 = require("../../../pagination");
/**
 * @class XmlhAdapter
 */
class XmlhAdapter {
    /**
     * @param rootPath
     * @param nameResource
     * @param dataEncode
     * @param dataDecode
     */
    constructor(rootPath, nameResource, dataEncode, dataDecode, urlBuilder) {
        /**
         * @type Object
         */
        this.headers = {};
        /**
         * @type UrlBuilderInterface
         */
        this.urlBuilder = new DefaultBuilder_1.DefaultBuilder();
        this.rootPath = rootPath;
        this.nameResource = nameResource;
        this.dataEncode = dataEncode;
        this.dataDecode = dataDecode;
        this.urlBuilder = urlBuilder;
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
    getNameCollection() {
        return this.nameResource;
    }
    /**
     * @inheritDoc
     */
    get(id) {
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            let method = 'GET';
            request.open(method, this.urlBuilder.buildUrl(this.rootPath, this.getNameCollection(), method, id), true);
            // Append headers
            this._appendHeaders(request, method);
            // Result handler
            request.addEventListener('load', () => {
                if (request.status >= 300) {
                    return reject(this.dataDecode.dataDecode(request.response));
                }
                console.log('GET entity request', request.status);
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
            request.open(method, `${this.urlBuilder.buildUrl(this.rootPath, this.getNameCollection(), method)}${this._buildQueryString(filter)}`, true);
            // Append headers
            this._appendHeaders(request, method);
            // Result handler
            request.addEventListener('load', () => {
                if (request.status >= 300) {
                    return reject(this.dataDecode.dataDecode(request.response));
                }
                console.log('GET request', request.status);
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
    getPaged(page, itemCount, filter) {
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            let method = 'GET';
            filter['page'] = page;
            filter['item-per-page'] = itemCount;
            request.open(method, `${this.urlBuilder.buildUrl(this.rootPath, this.getNameCollection(), method)}${this._buildQueryString(filter)}`, true);
            // Append headers
            this._appendHeaders(request, method);
            // Result handler
            request.addEventListener('load', () => {
                if (request.status >= 300) {
                    return reject(this.dataDecode.dataDecode(request.response));
                }
                let decodeResponse = this.dataDecode.dataDecode(request.response);
                console.log('PAGINATE request', decodeResponse);
                // TODO add adapter for pagination
                resolve(new pagination_1.Pagination(decodeResponse['data'], decodeResponse['meta']['page'], decodeResponse['meta']['item-per-page'], decodeResponse['meta']['total-count']));
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
    remove(data) {
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            let method = 'DELETE';
            let id = data['id'] ? data['id'] : null;
            if (!id) {
                throw 'id not found';
            }
            request.open(method, this.urlBuilder.buildUrl(this.rootPath, this.getNameCollection(), method, id), true);
            // Append headers
            this._appendHeaders(request, method);
            // Result handler
            request.addEventListener('load', () => {
                if (request.status >= 300) {
                    return reject(this.dataDecode.dataDecode(request.response));
                }
                console.log('DELETE request', request.status);
                resolve(request.response);
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
    save(data) {
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            let method = 'POST';
            request.open(method, this.urlBuilder.buildUrl(this.rootPath, this.getNameCollection(), method), true);
            // Append headers
            this._appendHeaders(request, method);
            // Result handler
            request.addEventListener('load', () => {
                if (request.status >= 300) {
                    return reject(this.dataDecode.dataDecode(request.response));
                }
                console.log('POST request', request.status);
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
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            let method = 'PUT';
            request.open(method, this.urlBuilder.buildUrl(this.rootPath, this.getNameCollection(), method), true);
            // Append headers
            this._appendHeaders(request, method);
            // Result handler
            request.addEventListener('load', () => {
                if (request.status >= 300) {
                    return reject(this.dataDecode.dataDecode(request.response));
                }
                console.log('PUT request', request.status);
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
}
exports.XmlhAdapter = XmlhAdapter;
