import { PlayerInteface } from "../player/PlayerInteface";
import { TeamInterface } from "./TeamInteface";
/**
 * @interface AbstractScore
 */
export declare abstract class AbstractTeam implements TeamInterface {
    /**
     * @var number
     */
    protected name: string;
    /**
     * @var Array<PlayerInteface>
     */
    protected players: any[];
    /**
     * @inheritdoc
     */
    getName(): string;
    /**
     * @inheritdoc
     */
    setName(name: string): TeamInterface;
    /**
     * @inheritdoc
     */
    getPlayers(): PlayerInteface[];
    setPlayers(players: PlayerInteface[]): TeamInterface;
    /**
     * @inheritdoc
     */
    addPlayer(player: PlayerInteface): TeamInterface;
    /**
     * @inheritdoc
     */
    removePlayer(player: PlayerInteface): TeamInterface;
}
