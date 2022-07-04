import { PlayerInteface } from "./PlayerInteface";

/**
 * @interface AbstractPlayer
 */
export abstract class AbstractPlayer implements PlayerInteface {

    /**
     * @var {string}
     */
    protected firstName = null;

    /**
     * @var {string}
     */
    protected lastName = null;

    /**
     * @var {Date}
     */
    protected date = null;

    /**
     * @var {string}
     */
    protected role = null;
    
    /**
     * @inheritdoc
     */
    getFirstName(): string {
        return this.firstName;
    }

    /**
     * @inheritdoc
     */
    getLastName(): string {
        return this.lastName;
    }

    /**
     * @inheritdoc
     */
    getBirthday(): Date {
        return this.date;
    }

    /**
     * @inheritdoc
     */
    getRole(): string {
        return this.role;
    }
}
