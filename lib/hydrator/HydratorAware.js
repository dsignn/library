AbstractHydrator = require('./AbstractHydrator');
/**
 * Hydrator aware
 */
class HydratorAware {

    constructor(hydrator) {
        this._hydrator = hydrator;
    }

    /**
     * @param hydrator {*}
     * @returns {HydratorAware}
     */
    set hydrator(hydrator) {
        switch (true) {
            case hydrator === null:
            case !hydrator instanceof AbstractHydrator !== true:
                throw 'Wrong object for hydrator aware';
                break
        }
        this._hydrator = hydrator;
        return this;
    }

    /**
     * @returns {null}
     */
    get hydrator() {
        return this._hydrator;
    }
}

module.exports = HydratorAware;