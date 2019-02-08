/**
 *
 */
class  HttpClient  {

    /**
     * @param {String} url
     * @param {Object} headers
     */
    constructor(url, headers) {

        this.url = url;

        this.headers = headers;
    }

    /**
     * @param placeholder
     * @param headers
     * @return {Promise}
     */
    get(attachPath, headers) {

        return this.client(
            `${this.url}${attachPath}`,
            {
                headers: this.headers
            }
        );
    }
}

module.exports = HttpClient;