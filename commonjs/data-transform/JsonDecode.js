"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonDecode = void 0;
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
