"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IceHockeyMatch = void 0;
const GenericPeriod_1 = require("../../match/GenericPeriod");
const AbstractMatch_1 = require("./../../match/AbstractMatch");
class IceHockeyMatch extends AbstractMatch_1.AbstractMatch {
    constructor() {
        super();
        this.periods = [
            new GenericPeriod_1.GenericPeriod('first'),
            new GenericPeriod_1.GenericPeriod('second'),
            new GenericPeriod_1.GenericPeriod('third')
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
exports.IceHockeyMatch = IceHockeyMatch;
