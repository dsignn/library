"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IceHockeyMatch = void 0;
const AbstractMatch_1 = require("./../../match/AbstractMatch");
class IceHockeyMatch extends AbstractMatch_1.AbstractMatch {
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
