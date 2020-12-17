import { DefaultBuilder } from "./url/DefaultBuilder";
import { Pagination } from "../../../pagination";
/**
 * TODO refactor
 * @class XmlhAdapter
 */
export class XmlhAdapter {
    /**
     * @param rootPath
     * @param nameResource
     * @param dataEncode
     * @param dataDecode
     */
    constructor(rootPath, nameResource, dataEncode, dataDecode, urlBuilder) {
        this.errorStatus = {
            300: 'Multiple Choices',
            301: 'Moved Permanently',
            302: 'Found',
            303: 'See Other',
            304: 'Not Modified',
            307: 'Temporary Redirect',
            308: 'Permanent Redirect',
            400: 'Bad Request',
            401: 'Unauthorized',
            402: 'Payment Required',
            403: 'Forbidden',
            404: 'Not Found',
            405: 'Method Not Allowed',
            406: 'Not Acceptable',
            407: 'Proxy Authentication Required',
            408: 'Request Timeout',
            409: 'Conflict',
            410: 'Gone',
            411: 'Length Required',
            412: 'Precondition Failed',
            413: 'Payload Too Large',
            414: 'URI Too Long',
            415: 'Unsupported Media Type',
            416: 'Range Not Satisfiable',
            417: 'Expectation Failed',
            418: "I'm a teapot",
            422: 'Unprocessable Entity',
            425: 'Too Early',
            426: 'Upgrade Required',
            428: 'Precondition Required',
            429: 'Too Many Requests',
            431: 'Request Header Fields Too Large',
            451: 'Unavailable For Legal Reasons',
            500: 'Internal Server Error',
            501: 'Not Implemented',
            502: 'Bad Gateway',
            503: 'Service Unavailable',
            504: 'Gateway Timeout',
            505: 'HTTP Version Not Supported',
            506: 'Variant Also Negotiates',
            507: 'Insufficient Storage',
            508: 'Loop Detected',
            510: 'Not Extended',
            511: 'Network Authentication Required',
        };
        /**
         * @type Object
         */
        this.headers = {};
        /**
         * @type string
         */
        this.updateMethod = 'PUT';
        /**
         * @type UrlBuilderInterface
         */
        this.urlBuilder = new DefaultBuilder();
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
     * @param method
     */
    getHeaders(method) {
        if (!!this.headers[method]) {
            return this.headers[method];
        }
        return null;
    }
    /**
     * @inheritDoc
     */
    getNameCollection() {
        return this.nameResource;
    }
    /**
     * @param {string} method
     */
    setUpdateMethod(method) {
        this.updateMethod = method;
        return this;
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
                    return reject({
                        status: request.status,
                        message: this.errorStatus[request.status]
                    });
                }
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
            request.open(method, `${this.urlBuilder.buildUrl(this.rootPath, this.getNameCollection(), method, 'all')}${this._buildQueryString(filter)}`, true);
            // Append headers
            this._appendHeaders(request, method);
            // Result handler
            request.addEventListener('load', () => {
                if (request.status >= 300) {
                    return reject({
                        status: request.status,
                        message: this.errorStatus[request.status]
                    });
                }
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
                    return reject({
                        status: request.status,
                        message: this.errorStatus[request.status]
                    });
                }
                let decodeResponse = this.dataDecode.dataDecode(request.response);
                resolve(new Pagination(decodeResponse['data'], decodeResponse['meta']['page'], decodeResponse['meta']['item-per-page'], decodeResponse['meta']['total-count']));
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
                    return reject({
                        status: request.status,
                        message: this.errorStatus[request.status]
                    });
                }
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
                    let response = {
                        status: request.status,
                        message: this.errorStatus[request.status]
                    };
                    if (request.status === 422 && request.response) {
                        let errorResponse = this.dataDecode.dataDecode(request.response);
                        if (errorResponse['errors']) {
                            response['errors'] = errorResponse['errors'];
                        }
                    }
                    return reject(response);
                }
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
            let method = this.updateMethod;
            request.open(method, this.urlBuilder.buildUrl(this.rootPath, this.getNameCollection(), method, data.id), true);
            // Append headers
            this._appendHeaders(request, method);
            // Result handler
            request.addEventListener('load', () => {
                if (request.status >= 300) {
                    let response = {
                        status: request.status,
                        message: this.errorStatus[request.status]
                    };
                    if (request.status === 422 && request.response) {
                        let errorResponse = this.dataDecode.dataDecode(request.response);
                        if (errorResponse['errors']) {
                            response['errors'] = errorResponse['errors'];
                        }
                    }
                    return reject(response);
                }
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
     *
     * @param method
     * @param url
     * @param headers
     * @param data
     * @param query
     * @param options
     */
    request(method, url, headers, data, query, options) {
        //87f76db7d67bc36fd5ec6ace436cf29f34d10c9042af249a524b982b42208498+Vs2Zub8u32AsiAApZ8klEZYXUC5i48vyIcDqLN6gfWuaH5V8OpNz69n6HxcHn1l
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            /**
             * Create request
             */
            request.open(method, `${url}${this._buildQueryString(query)}`, true);
            /**
             * Append headers
             */
            for (let headerName in headers) {
                request.setRequestHeader(headerName, headers[headerName]);
            }
            request.addEventListener('load', () => {
                if (request.status >= 300) {
                    let response = {
                        status: request.status,
                        message: this.errorStatus[request.status]
                    };
                    if (request.status === 422 && request.response) {
                        let errorResponse = this.dataDecode.dataDecode(request.response);
                        if (errorResponse['errors']) {
                            response['errors'] = errorResponse['errors'];
                        }
                    }
                    return reject(response);
                }
                resolve(this.dataDecode.dataDecode(request.response));
            });
            // Error handler
            request.addEventListener('error', () => {
                console.warn('Error xmlh adapter:', request.status);
                reject(request.response);
            });
            /**
             * Decode message
             */
            request.send(this.dataEncode.dataEncode(Object.keys(data).length === 0 && data.constructor === Object ? data : null));
        });
    }
}
//# sourceMappingURL=XmlhAdapter.js.map