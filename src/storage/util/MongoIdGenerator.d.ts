import { IdGeneratorInterface } from "./IdGeneratorInterface";
/**
 *
 */
export declare class MongoIdGenerator implements IdGeneratorInterface {
    /**
     * @return {string}
     */
    generateId(): string;
    /**
     * @return {string}
     */
    static statcGenerateId(): string;
}
