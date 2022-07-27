import { ScoreInterface } from "../score/ScoreInterface";
import { TeamInterface } from "../team/TeamInteface";
import { PeriodInterface } from "./PeriodInterface";

/**
 * @interface MatchInterface
 */
export interface MatchInterface {

    /**
     * @param {TeamInterface} team
     * @returns {MatchInterface}
     */
    setHomeTeam(team: TeamInterface): MatchInterface;
  
    /**
     * @returns {TeamInterface}
     */
    getHomeTeam(): TeamInterface;  
      
    /**
     * @returns {Array<ScoreInterface>}
     */
    getHomeScores(): Array<ScoreInterface>;

    /**
     * @param {ScoreInterface} score 
     * @returns {MatchInterface}
     */
    addHomeScore(score: ScoreInterface, period?: PeriodInterface): MatchInterface;

    /**
     * @param {ScoreInterface} score 
     * @returns {MatchInterface}
     */
    removeHomeScore(score: ScoreInterface, period?: PeriodInterface): MatchInterface;
    
  
    /**
     * @param {TeamInterface} team
     * @returns {MatchInterface}
     */
    setGuestTeam(team: TeamInterface): MatchInterface;
    
    /**
     * @returns {TeamInterface}
     */
    getGuestTeam(): TeamInterface;
    
    /**
     * @returns {Array<ScoreInterface>}
     */
    getGuestScores(): Array<ScoreInterface>;

    /**
     * @param {ScoreInterface} score 
     * @returns {MatchInterface}
     */
    addGuestScore(score: ScoreInterface, period?: PeriodInterface): MatchInterface;

    /**
     * @param {ScoreInterface} score 
     * @returns {MatchInterface}
     */
    removeGuestScore(score: ScoreInterface, period?: PeriodInterface): MatchInterface;
    
    /**
     * @param {Date} date
     * @returns {MatchInterface}
     */
    setDate(date: Date): MatchInterface;

    /**
     * @returns {Date}
     */
    getDate(): Date;

    /**
     * @param {Array<PeriodInterface>} periods 
     */
    setPeriods(periods: Array<PeriodInterface>): MatchInterface;

    /**
     * @return {Array<PeriodInterface>}
     */
    getPeriods(): Array<PeriodInterface>;

    /**
     * @param period 
     * @returns {MatchInterface}
     */
    setCurrentPeriod(period: PeriodInterface): MatchInterface;

    /**
     * @returns {PeriodInterface}
     */
    getCurrentPeriod(): PeriodInterface;
}