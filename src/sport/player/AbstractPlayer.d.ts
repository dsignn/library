import { PlayerInteface } from "./PlayerInteface";
/**
 * @interface AbstractPlayer
 */
export declare abstract class AbstractPlayer implements PlayerInteface {
    /**
     * @var {string}
     */
    protected firstName: any;
    /**
     * @var {string}
     */
    protected lastName: any;
    /**
     * @var {Date}
     */
    protected date: any;
    /**
     * @var {string}
     */
    protected role: any;
    /**
     * @var {string}
     */
    protected shirtNumber: any;
    /**
     * @inheritdoc
     */
    getFirstName(): string;
    /**
 * @inheritdoc
 */
    setFirstName(firstName: string): PlayerInteface;
    /**
     * @inheritdoc
     */
    getLastName(): string;
    /**
     * @inheritdoc
     */
    setLastName(lastName: string): PlayerInteface;
    /**
     * @inheritdoc
     */
    getBirthday(): Date;
    /**
     * @inheritdoc
     */
    setBirthday(date: Date): PlayerInteface;
    /**
     * @inheritdoc
     */
    getRole(): string;
    /**
     * @inheritdoc
     */
    setRole(role: string): PlayerInteface;
    /**
     * @inheritdoc
     */
    getShirtNumber(): string;
    /**
     * @inheritdoc
     */
    setShirtNumber(shirtNumber: string): PlayerInteface;
}
