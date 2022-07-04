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
     * @inheritdoc
     */
    getFirstName(): string;
    /**
     * @inheritdoc
     */
    getLastName(): string;
    /**
     * @inheritdoc
     */
    getBirthday(): Date;
    /**
     * @inheritdoc
     */
    getRole(): string;
}
