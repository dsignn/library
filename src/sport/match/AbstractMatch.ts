import { ScoreInterface } from "../score/ScoreInterface";
import { GenericTeam } from "../team/GenericTeam";
import { TeamInterface } from "../team/TeamInteface";
import { GenericPeriod } from "./GenericPeriod";
import { MatchInterface } from "./MatchInterface";
import { PeriodInterface } from "./PeriodInterface";

/**
 * @interface AbstractPlayer
 */
export abstract class AbstractMatch implements MatchInterface {
    
    /**
     * @var TeamInteface
     */
    protected homeTeam: TeamInterface = new GenericTeam();

    /**
     * @var Array<ScoreInterface>
     */
    protected homeScores: Array<ScoreInterface> = [];
   
    /**
     * @var TeamInteface
     */
    protected guestTeam: TeamInterface = new GenericTeam();

    /**
     * @var Array<ScoreInterface>
     */
    protected guestScores: Array<ScoreInterface> = [];

    /**
     * @var Array<PeriodInterface>
     */
    protected periods: Array<PeriodInterface> = [];

    /**
     * @var PeriodInterface
     */
    protected currentPeriod: PeriodInterface = null;

    /**
     * @var Date
     */
    protected date: Date = null;


    /**
     * @inheritdoc
     */
    setHomeTeam(team: TeamInterface): MatchInterface {
        this.homeTeam = team;
        return this;
    }
    
    /**
     * @inheritdoc
     */
    getHomeTeam(): TeamInterface {
        return this.homeTeam;
    }
    
    /**
     * @inheritdoc
     */
    getHomeScores(): ScoreInterface[] {
        return this.homeScores;
    }

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
    setGuestTeam(team: TeamInterface): MatchInterface {
        this.guestTeam = team;
        return this;
    }
        
    /**
     * @inheritdoc
     */
    getGuestTeam(): TeamInterface {
        return this.guestTeam
    }

    /**
     * @inheritdoc
     */
    getGuestScores(): ScoreInterface[] {
        return this.guestScores;
    }

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
    setDate(date: Date): MatchInterface {
        this.date = date;
        return this;
    }

    /**
     * @inheritdoc
     */
    getDate(): Date {
        return this.date;
    }

    /**
     * @inheritdoc
     */
    setPeriods(periods: PeriodInterface[]): MatchInterface {
        this.periods = periods;
        return this;
    }

    /**
     * @inheritdoc
     */
    getPeriods(): PeriodInterface[] {
        return this.periods;
    }

    /**
     * @inheritdoc
     */
    setCurrentPeriod(period: PeriodInterface): MatchInterface {
        this.currentPeriod = period;
        return this;
    }

    /**
     * @inheritdoc
     */
    getCurrentPeriod(): PeriodInterface {
        return this.currentPeriod;
    }
}
