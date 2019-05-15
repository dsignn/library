import {IdGeneratorInterface} from "./IdGeneratorInterface";

/**
 *
 */
export class MongoIdGenerator implements IdGeneratorInterface {

    /**
     * @return {string}
     */
    generateId(): string {
        return MongoIdGenerator.statcGenerateId();
    }

    /**
     * @return {string}
     */
    static statcGenerateId() : string {
        let timestamp = (new Date().getTime() / 1000 | 0).toString(16);
        return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
            return (Math.random() * 16 | 0).toString(16);
        }).toLowerCase();
    }
}