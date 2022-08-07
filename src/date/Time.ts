/**
 * @class
 * Time
 */
export class Time {

    /**
     * @type {number}
     */
    private hours: number = 0;

    /**
     * @type {number}
     */
    private minutes: number = 0;

    /**
     * @type {string}
     */
    private seconds: number = 0;

    /**
     * @type {string}
     */
    private id: string = '';

    /**
     * @param {number} hours
     * @param {number} minutes
     * @param {number} seconds
     */
    constructor(hours: number = 0, minutes: number = 0, seconds: number = 0) {

        /**
         * @type {number}
         */
        this.hours = hours;

        /**
         * @type {number}
         */
        this.minutes = minutes;

        /**
         * @type {number}
         */
        this.seconds = seconds;
    }

    public getIdentifier() {
        return this.id;
    }

    /**
     * @param identifier 
     * @returns {Time}
     */
    public setIdentifier(identifier: string) {
        this.id = identifier;
        return this;
    }

    /**
     * If this is highest then timer 1, 0 if is equal and -1 if is lowest;
     *
     * @param {Time} time
     * @return {number}
     */
    public compare(time) {
        let compare = -1;
        switch (true) {

            case this.getHours() === time.getHours() && this.getMinutes() === time.getMinutes() && this.getSeconds() === time.getSeconds():
                compare = 0;
                break;
            case this.getHours() > time.getHours() ||
            this.getHours() === time.getHours() && this.getMinutes() > time.getMinutes() ||
            this.getHours() === time.getHours() && this.getMinutes() === time.getMinutes() && this.getSeconds() > time.getSeconds():
                compare = 1;
                break;
        }

        return compare;
    }

    /**
     * @param {number} seconds
     * @return {Time}
     */
    public sumSeconds(seconds) {

        let ihours = Math.floor(seconds / 3600);
        let iMinutes = Math.floor(seconds % 3600 / 60);
        let iSeconds = Math.floor(seconds % 3600 % 60);

        if (iSeconds + this.getSeconds() > 59) {
            iMinutes += (iSeconds + this.getSeconds()) / 60;
            this.seconds = Math.floor(iSeconds + this.getSeconds()) % 60;
        } else {
            this.seconds = iSeconds + this.getSeconds();
        }

        if (iMinutes + this.getMinutes() > 59) {
            ihours += (iMinutes + this.getMinutes()) / 60;
            this.minutes = Math.floor(iMinutes + this.getMinutes()) % 60;
        } else {
            this.minutes = iMinutes + this.getMinutes();
        }

        this.hours = Math.floor(ihours + this.getHours());
        return this;
    }

    /**
     * @param {number} seconds
     * @return {Time}
     */
    subtractSecond(seconds) {

        let ihours = Math.floor(seconds / 3600);
        let iMinutes = Math.floor(seconds % 3600 / 60);
        let iSeconds = Math.floor(seconds % 3600 % 60);

        if (this.getSeconds() - iSeconds < 0) {
            iMinutes -= -1;
            this.seconds = Math.floor(60 + (this.getSeconds() - iSeconds));
        } else {
            this.seconds = this.getSeconds() - iSeconds;
        }

        if (this.getMinutes() - iMinutes < 0) {
            ihours -= 1;
            this.minutes = Math.floor(this.getMinutes() - iMinutes) % 60;
        } else {
            this.minutes = this.getMinutes() - iMinutes;
        }

        this.hours = Math.floor(this.getHours() - ihours);
        return this;
    }

    /**
     * @param {Time} time
     */
    public getDiffSecond(time) {
        let seconds = 0;

        let compare = this.compare(time);

        switch (true) {
            case compare > 0:
                seconds = (this.getHours() - time.getHours()) * 3600 + (this.getMinutes() - time.getMinutes()) * 60 + (this.getSeconds() - time.getSeconds())
                break;
            case compare < 0:
                seconds = (time.getHours() - this.getHours()) * 3600 + (time.getMinutes() - this.getMinutes()) * 60 + (time.getSeconds() - this.getSeconds())
                break;
        }

        return seconds;
    }

    /**
     * Reset time to 0, 0, 0
     * @return {Time}
     */
    public reset() {
        this.seconds = 0;
        this.minutes = 0;
        this.hours = 0;
        return this;
    }

    /**
     * @return {Time}
     */
    public clone() {
        let clone = new Time();

        clone.seconds = this.seconds;
        clone.minutes = this.minutes;
        clone.hours = this.hours;

        return clone;
    }

    /**
     * @return {string}
     */
    public toString() {
        return `${this.getHours() < 10 ? '0' + this.getHours() : this.getHours()}:${this.getMinutes() < 10 ? '0' + this.getMinutes() : this.getMinutes()}:${this.getSeconds() < 10 ? '0' + this.getSeconds() : this.getSeconds()}`;
    }

    /**
     * @return {number}
     */
    public getHours() {
        return typeof this.hours === 'string' ? parseInt(this.hours) : this.hours;
    }

    /**
     * @return {number}
     */
    public getStringHours() {
        return this.getHours() < 10 ? `0${this.getHours()}` : this.getHours();
    }

    /**
     * @return {number}
     */
    public getMinutes() {
        return typeof this.minutes === 'string' ? parseInt(this.minutes) : this.minutes;
    }

    /**
     * @return {string}
     */
    public getStringMinutes() {
        return this.getMinutes() < 10 ? `0${this.getMinutes()}` : this.getMinutes();
    }

    /**
     * @return {number}
     */
    public getSeconds() {
        return typeof this.seconds === 'string' ? parseInt(this.seconds) : this.seconds;
    }

    /**
     * @return {string}
     */
    public getStringSeconds() {
        return this.getSeconds() < 10 ? `0${this.getSeconds()}` : this.getSeconds();
    }

    /**
     * Get duration by second
     * return {number}
     */
    public getDuration() {
        return (this.getHours() * 60 * 60) + (this.getMinutes() * 60) + this.getSeconds() ;
    }
}