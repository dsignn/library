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
     * @var {string}
     */
    protected shirtNumber = null;
    
    /**
     * @inheritdoc
     */
    getFirstName(): string {
        return this.firstName;
    }

        /**
     * @inheritdoc
     */
    setFirstName(firstName: string): PlayerInteface {
        this.firstName = firstName;
        return this;
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
    setLastName(lastName: string): PlayerInteface {
        this.lastName = lastName;
        return this;
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
    setBirthday(date: Date): PlayerInteface {
        this.date = date;       
        return this;
    }

    /**
     * @inheritdoc
     */
    getRole(): string {
        return this.role;
    }

    /**
     * @inheritdoc
     */
    setRole(role: string): PlayerInteface {
        this.role = role;
        return this;
    }

    /**
     * @inheritdoc
     */
    getShirtNumber(): string {
        return this.shirtNumber;
    }

    /**
     * @inheritdoc
     */
    setShirtNumber(shirtNumber: string): PlayerInteface {
        this.shirtNumber = shirtNumber;
        return this;
    }
}
