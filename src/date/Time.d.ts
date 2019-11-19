/**
 * @class
 * Time
 */
export declare class Time {
    /**
     * @type {number}
     */
    private hours;
    /**
     * @type {number}
     */
    private minutes;
    /**
     * @type {string}
     */
    private seconds;
    /**
     * @param {number} hours
     * @param {number} minutes
     * @param {number} seconds
     */
    constructor(hours?: number, minutes?: number, seconds?: number);
    /**
     * If this is highest then timer 1, 0 if is equal and -1 if is lowest;
     *
     * @param {Time} time
     * @return {number}
     */
    compare(time: any): number;
    /**
     * @param {number} seconds
     * @return {Time}
     */
    sumSeconds(seconds: any): this;
    /**
     * @param {number} seconds
     * @return {Time}
     */
    subtractSecond(seconds: any): this;
    /**
     * @param {Time} time
     */
    getDiffSecond(time: any): number;
    /**
     * Reset time to 0, 0, 0
     * @return {Time}
     */
    reset(): this;
    /**
     * @return {Time}
     */
    clone(): Time;
    /**
     * @return {string}
     */
    toString(): string;
    /**
     * @return {number}
     */
    getHours(): number;
    /**
     * @return {number}
     */
    getStringHours(): string | number;
    /**
     * @return {number}
     */
    getMinutes(): number;
    /**
     * @return {string}
     */
    getStringMinutes(): string | number;
    /**
     * @return {number}
     */
    getSeconds(): number;
    /**
     * @return {string}
     */
    getStringSeconds(): string | number;
    /**
     * Get duration by second
     * return {number}
     */
    getDuration(): number;
}
