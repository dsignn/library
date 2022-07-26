import { ScoreInterface } from "../score/ScoreInterface";
import { TeamInterface } from "../team/TeamInteface";
import { MatchInterface } from "./MatchInterface";
import { PeriodInterface } from "./PeriodInterface";
/**
 * @interface AbstractPlayer
 */
export declare abstract class AbstractMatch implements MatchInterface {
    /**
     * @var TeamInteface
     */
    protected homeTeam: TeamInterface;
    /**
     * @var Array<ScoreInterface>
     */
    protected homeScores: Array<ScoreInterface>;
    /**
     * @var TeamInteface
     */
    protected guestTeam: TeamInterface;
    /**
     * @var Array<ScoreInterface>
     */
    protected guestScores: Array<ScoreInterface>;
    /**
     * @var Array<PeriodInterface>
     */
    protected periods: Array<PeriodInterface>;
    /**
     * @var PeriodInterface
     */
    protected currentPeriod: PeriodInterface;
    /**
     * @var Date
     */
    protected date: Date;
    /**
     * @inheritdoc
     */
    setHomeTeam(team: TeamInterface): MatchInterface;
    /**
     * @inheritdoc
     */
    getHomeTeam(): TeamInterface;
    /**
     * @inheritdoc
     */
    getHomeScores(): ScoreInterface[];
    /**
     * @inheritdoc
     */
    abstract addHomeScore(score: ScoreInterface, period?: PeriodInterface): MatchInterface;
    /**
     * @inheritdoc
     */
    abstract removeHomeScore(score: ScoreInterface, period?: PeriodInterface): MatchInterface;
    /**
     * @inheritdoc
     */
    setGuestTeam(team: TeamInterface): MatchInterface;
    /**
     * @inheritdoc
     */
    getGuestTeam(): TeamInterface;
    /**
     * @inheritdoc
     */
    getGuestScores(): ScoreInterface[];
    /**
     * @inheritdoc
     */
    abstract addGuestScore(score: ScoreInterface, period?: PeriodInterface): MatchInterface;
    /**
     * @inheritdoc
     */
    abstract removeGuestScore(score: ScoreInterface, period?: PeriodInterface): MatchInterface;
    /**
     * @inheritdoc
     */
    setDate(date: Date): MatchInterface;
    /**
     * @inheritdoc
     */
    getDate(): Date;
    /**
     * @inheritdoc
     */
    setPeriods(periods: PeriodInterface[]): MatchInterface;
    /**
     * @inheritdoc
     */
    getPeriods(): PeriodInterface[];
    /**
     * @inheritdoc
     */
    setCurrentPeriod(period: PeriodInterface): MatchInterface;
    /**
     * @inheritdoc
     */
    getCurrentPeriod(): PeriodInterface;
}
