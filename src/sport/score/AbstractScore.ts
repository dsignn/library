import { ScoreInterface } from "./ScoreInterface";

/**
 * @interface AbstractScore
 */
export abstract class AbstractScore implements ScoreInterface{
     
    /**
     * @var number
     */
    protected value: number = 1;

    /**
     * @returns {Number}
     */
    getValue(): number {
         return this.value;
    } 
}
