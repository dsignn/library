"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonEncode = void 0;
/**
 * @class JsonEncode
 */
class JsonEncode {
    /**
     * @inheritDoc
     */
    dataEncode(data) {
        return JSON.stringify(data);
    }
}
exports.JsonEncode = JsonEncode;
