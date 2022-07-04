import { PlayerInteface } from "../player/PlayerInteface";
/**
 * @interface TeamInterface
 */
export interface TeamInterface {
    /**
     * @return {string}
     */
    getName(): string;
    /**
     * @param {string} name
     * @return {TeamInterface}
     */
    setName(name: string): TeamInterface;
    /**
     * @return {Array<PlayerInteface>}
     */
    getPlayers(): Array<PlayerInteface>;
    /**
     * @param {PlayerInteface[]} players
     * @return {TeamInterface}
     */
    setPlayers(players: PlayerInteface[]): TeamInterface;
    /**
     * @param {PlayerInteface} player
     * @return {TeamInterface}
     */
    addPlayer(player: PlayerInteface): TeamInterface;
    /**
     * @param {PlayerInteface} player
     * @return {TeamInterface}
     */
    removePlayer(player: PlayerInteface): TeamInterface;
}
