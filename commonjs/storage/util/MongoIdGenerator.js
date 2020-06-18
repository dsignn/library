"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoIdGenerator = void 0;
/**
 *
 */
class MongoIdGenerator {
    /**
     * @return {string}
     */
    generateId() {
        return MongoIdGenerator.statcGenerateId();
    }
    /**
     * @return {string}
     */
    static statcGenerateId() {
        let timestamp = (new Date().getTime() / 1000 | 0).toString(16);
        return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function () {
            return (Math.random() * 16 | 0).toString(16);
        }).toLowerCase();
    }
}
exports.MongoIdGenerator = MongoIdGenerator;
