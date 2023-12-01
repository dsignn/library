/**
 *
 */
export class DateStrategy {
    /**
     * @param {string} property
     * @param data
     * @return {any}
     */
    hydrateValue(property, data) {
        return new Date(data);
    }
    /**
     *
     * @param data
     * @returns {{}|*}
     */
    extractValue(data) {
        let extract = data;
        if (data instanceof Date) {
            extract = data.toString();
        }
        return extract;
    }
}
//# sourceMappingURL=DateStrategy.js.map