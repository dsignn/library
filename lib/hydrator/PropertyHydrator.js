AbstractHydrator = require('./AbstractHydrator');

/**
 * Hydrate by method property
 */
class PropertyHydrator extends AbstractHydrator {

    /**
     * @constructor
     * @param {Object} objectPrototype
     * @param {Object} strategies
     * @param {Object} nameStrategies
     * */
    constructor(objectPrototype, strategies, nameStrategies) {

        super(strategies ? strategies : null, nameStrategies ? nameStrategies : null);

        /**
         * @type {Object}
         */
        this.objectPrototype = objectPrototype;

        /**
         *
         * @type {Object}
         */
        this.enableHydratorProperty = {};

        /**
         * @type {Object}
         */
        this.enableExtractorProperty = {};
    }

    /**
     * @param {String} nameProperty
     * @return {PropertyHydrator}
     */
    enableHydrateProperty(nameProperty) {
        this.enableHydratorProperty[nameProperty] = true;
        return this;
    }

    /**
     * @param {String} nameProperty
     * @return {PropertyHydrator}
     */
    enableExtractProperty(nameProperty) {
        this.enableExtractorProperty[nameProperty] = true;
        return this;
    }

    /**
     * @param {Object} data
     * @returns {Object}
     */
    hydrate(data) {
        super.hydrate(data);
        let obj = this.referenceObject ? this.referenceObject : new this.objectPrototype.constructor();
        for (let property in data) {

            if (Object.keys(this.enableHydratorProperty).length !== 0 && !this.enableHydratorProperty[property]) {
                continue;
            }

            obj[this._hydratePropertyName(property)] = this._hydrateProperty(property, data[property]);
        }

        return obj;
    }

    /**
     *
     * @param name
     * @param value
     * @private
     */
    _hydrateProperty(name, value) {

        let strategy = this.strategies[name];

        let data = value;
        if (strategy) {

            if (
                this.referenceObject !== null &&
                typeof this.referenceObject === 'object' &&
                this.referenceObject[name] !== null &&
                typeof this.referenceObject[name] === 'object'
            ) {
                strategy.referenceObject = this.referenceObject[name]
            }

            data = strategy.hydrateStrategy(data);
        }
        return data;
    }

    /**
     * @param property
     * @returns {*}
     * @private
     */
    _hydratePropertyName(property) {
        return this.nameStrategies[property] ? this.nameStrategies[property] : property;
    }

    /**
     * @param property
     * @returns {*}
     * @private
     */
    _extractPropertyName(property) {
        let computeProperty = property;
        for (let prop in this.nameStrategies) {
            if (this.nameStrategies.hasOwnProperty(prop) && this.nameStrategies[prop] === property) {
                computeProperty = prop;
                break;
            }
        }
        return computeProperty;
    }

    /**
     * @param {Object} obj
     * @returns {Object}
     */
    extract(obj) {
        super.extract(obj);
        let data = {};
        for (let property in obj) {

            if (Object.keys(this.enableExtractorProperty).length !== 0 && !this.enableExtractorProperty[property]) {
                continue;
            }

            data[this._extractPropertyName(property)] = (this.strategies[property]) ?
                this.strategies[property].extractStrategy(obj[property]) :
                obj[property];
        }

        return data;
    }

    /**
     * @return {Object}
     */
    getObjectPrototype() {
        return this.objectPrototype;
    }


    /**
     * @param objectPrototype
     * @return {PropertyHydrator}
     */
    setObjectPrototype(objectPrototype) {
        this.objectPrototype = objectPrototype;
        return this;
    }
}

module.exports = PropertyHydrator;