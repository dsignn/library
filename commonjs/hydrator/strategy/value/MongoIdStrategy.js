"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoIdStrategy = void 0;
/**
 *
 */
class MongoIdStrategy {
    /**
     * @inheritDoc
     */
    extractValue(data) {
        let extract = data;
        switch (true) {
            case typeof data === 'string':
                extract = new (require('mongodb').ObjectID)(data);
                break;
        }
        return extract;
    }
    /**
     * @inheritDoc
     */
    hydrateValue(property, data) {
        let hydrate = data;
        switch (true) {
            case data instanceof require('mongodb').ObjectID === true:
                hydrate = data.toString();
                break;
        }
        return hydrate;
    }
}
exports.MongoIdStrategy = MongoIdStrategy;
