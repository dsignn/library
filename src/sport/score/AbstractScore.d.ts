import { ScoreInterface } from "./ScoreInterface";
/**
 * @interface AbstractScore
 */
export declare abstract class AbstractScore implements ScoreInterface {
    /**
     * @var number
     */
    protected value: number;
    /**
     * @returns {Number}
     */
    getValue(): number;
}
