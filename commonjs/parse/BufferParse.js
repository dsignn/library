"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BufferParse = void 0;
/**
 *
 */
class BufferParse {
    /**
     * @inheritDoc
     */
    parse(data) {
        return JSON.parse(data.toString());
    }
}
exports.BufferParse = BufferParse;
