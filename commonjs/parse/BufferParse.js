"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
