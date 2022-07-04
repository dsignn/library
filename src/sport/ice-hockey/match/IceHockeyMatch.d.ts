import { AbstractMatch } from "./../../match/AbstractMatch";
import { MatchInterface } from "./../../match/MatchInterface";
import { PeriodInterface } from "./../../match/PeriodInterface";
import { ScoreInterface } from "./../../score/ScoreInterface";
export declare class IceHockeyMatch extends AbstractMatch {
    addHomeScore(score: ScoreInterface, period?: PeriodInterface): MatchInterface;
    removeHomeScore(score: ScoreInterface, period?: PeriodInterface): MatchInterface;
    addGuestScore(score: ScoreInterface, period?: PeriodInterface): MatchInterface;
    removeGuestScore(score: ScoreInterface, period?: PeriodInterface): MatchInterface;
}
