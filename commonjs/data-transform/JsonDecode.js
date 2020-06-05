"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @class JsonDecode
 */
class JsonDecode {
    /**
     * @inheritDoc
     */
    dataDecode(data) {
        return JSON.parse(data);
    }
}
exports.JsonDecode = JsonDecode;
