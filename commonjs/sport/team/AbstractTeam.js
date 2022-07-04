"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractTeam = void 0;
/**
 * @interface AbstractScore
 */
class AbstractTeam {
    constructor() {
        /**
         * @var number
         */
        this.name = '';
        /**
         * @var Array<PlayerInteface>
         */
        this.players = [];
    }
    /**
     * @inheritdoc
     */
    getName() {
        return this.name;
    }
    /**
     * @inheritdoc
     */
    setName(name) {
        this.name = name;
        return this;
    }
    /**
     * @inheritdoc
     */
    getPlayers() {
        return this.players;
    }
    setPlayers(players) {
        this.players = players;
        return this;
    }
    /**
     * @inheritdoc
     */
    addPlayer(player) {
        this.players.push(player);
        return this;
    }
    /**
     * @inheritdoc
     */
    removePlayer(player) {
        for (var cont = this.players.length - 1; cont >= 0; cont--) {
            if (player.getFirstName() == this.players[cont].getFirstName() && player.getLastName() == this.players[cont].getLastName()) {
                this.players.slice(cont, 1);
                break;
            }
        }
        return this;
    }
}
exports.AbstractTeam = AbstractTeam;
