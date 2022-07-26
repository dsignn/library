"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractMatch = void 0;
const GenericTeam_1 = require("../team/GenericTeam");
/**
 * @interface AbstractPlayer
 */
class AbstractMatch {
    constructor() {
        /**
         * @var TeamInteface
         */
        this.homeTeam = new GenericTeam_1.GenericTeam();
        /**
         * @var Array<ScoreInterface>
         */
        this.homeScores = [];
        /**
         * @var TeamInteface
         */
        this.guestTeam = new GenericTeam_1.GenericTeam();
        /**
         * @var Array<ScoreInterface>
         */
        this.guestScores = [];
        /**
         * @var Array<PeriodInterface>
         */
        this.periods = [];
        /**
         * @var PeriodInterface
         */
        this.currentPeriod = null;
        /**
         * @var Date
         */
        this.date = null;
    }
    /**
     * @inheritdoc
     */
    setHomeTeam(team) {
        this.homeTeam = team;
        return this;
    }
    /**
     * @inheritdoc
     */
    getHomeTeam() {
        return this.homeTeam;
    }
    /**
     * @inheritdoc
     */
    getHomeScores() {
        return this.homeScores;
    }
    /**
     * @inheritdoc
     */
    setGuestTeam(team) {
        this.guestTeam = team;
        return this;
    }
    /**
     * @inheritdoc
     */
    getGuestTeam() {
        return this.guestTeam;
    }
    /**
     * @inheritdoc
     */
    getGuestScores() {
        return this.guestScores;
    }
    /**
     * @inheritdoc
     */
    setDate(date) {
        this.date = date;
        return this;
    }
    /**
     * @inheritdoc
     */
    getDate() {
        return this.date;
    }
    /**
     * @inheritdoc
     */
    setPeriods(periods) {
        this.periods = periods;
        return this;
    }
    /**
     * @inheritdoc
     */
    getPeriods() {
        return this.periods;
    }
    /**
     * @inheritdoc
     */
    setCurrentPeriod(period) {
        this.currentPeriod = period;
        return this;
    }
    /**
     * @inheritdoc
     */
    getCurrentPeriod() {
        return this.currentPeriod;
    }
}
exports.AbstractMatch = AbstractMatch;
