import { GenericPeriod } from "../../match/GenericPeriod";
import { AbstractMatch } from "./../../match/AbstractMatch";
export class IceHockeyMatch extends AbstractMatch {
    constructor() {
        super();
        this.periods = [
            new GenericPeriod('first'),
            new GenericPeriod('second'),
            new GenericPeriod('third')
        ];
    }
    addHomeScore(score, period) {
        return this;
    }
    removeHomeScore(score, period) {
        return this;
    }
    addGuestScore(score, period) {
        return this;
    }
    removeGuestScore(score, period) {
        return this;
    }
}
//# sourceMappingURL=IceHockeyMatch.js.map