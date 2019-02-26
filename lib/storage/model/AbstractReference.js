/**
 *
 */
class AbstractReference {

    /**
     */
    constructor() {

        /**
         * @type {null|string}
         */
        this.referenceId = null;

        /**
         * @type {null|string}
         */
        this.name = null;

        /**
         * @type {string};
         */
        Object.defineProperty(
            this,
            "nameService",
            {writable: false, enumerable: true, configurable: true, value: 'AbstractReference'}
        );
    }

    /**
     * @param {string} referenceId
     * @return {AbstractReference}
     */
    setReferenceId(referenceId) {
        this.referenceId = referenceId;
        return this;
    }

    /**
     * @param {string} name
     * @return {AbstractReference}
     */
    setName(name) {
        this.name = name;
        return this;
    }

    /**
     * @param {Object} entity
     * @return {AbstractReference}
     */
    static getReferenceFromEntity(entity) {
        throw "must be implement";
    }
}

module.exports = AbstractReference;