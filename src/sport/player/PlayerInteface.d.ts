/**
 * @interface PlayerInteface
 */
export interface PlayerInteface {
    /**
     * @return {string}
     */
    getFirstName(): string;
    /**
     * @return {string}
     */
    getLastName(): string;
    /**
    * @return {Date}
     */
    getBirthday(): Date;
    /**
     * @return {string}
     */
    getRole(): string;
    /**
     * @return {string}
     */
    getShirtNumber(): string;
}
