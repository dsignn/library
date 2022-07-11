import { AbstractMatch } from "./../../match/AbstractMatch";
import { MatchInterface } from "./../../match/MatchInterface";
import { PeriodInterface } from "./../../match/PeriodInterface";
import { ScoreInterface } from "./../../score/ScoreInterface";

export class IceHockeyMatch extends AbstractMatch {

    constructor() {
        super();
        
        this.periods = [
            new Period
        ];
    }
    
    
    addHomeScore(score: ScoreInterface, period?: PeriodInterface): MatchInterface {
        return this;
    }

    removeHomeScore(score: ScoreInterface, period?: PeriodInterface): MatchInterface {
        return this;
    }

    addGuestScore(score: ScoreInterface, period?: PeriodInterface): MatchInterface {
        return this;
    }

    removeGuestScore(score: ScoreInterface, period?: PeriodInterface): MatchInterface {
        return this;
    }

}