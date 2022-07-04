import { PlayerInteface } from "../player/PlayerInteface";
import { TeamInterface } from "./TeamInteface";

/**
 * @interface AbstractScore
 */
export abstract class AbstractTeam implements TeamInterface {
     
    /**
     * @var number
     */
    protected name: string = '';

    /**
     * @var Array<PlayerInteface>
     */
    protected players = [];

    /**
     * @inheritdoc
     */
    getName(): string {
        return this.name;
    }

    /**
     * @inheritdoc
     */
    setName(name: string): TeamInterface {
        this.name = name;
        return this;
    }
    
    /**
     * @inheritdoc
     */
    getPlayers(): PlayerInteface[] {
        return this.players
    }

    setPlayers(players: PlayerInteface[]): TeamInterface {
        this.players = players;
        return this;
    }

    /**
     * @inheritdoc
     */
     addPlayer(player: PlayerInteface): TeamInterface {
        this.players.push(player);
        return this;
    }

    /**
     * @inheritdoc
     */
    removePlayer(player: PlayerInteface): TeamInterface {
      
        for (var cont =  this.players.length - 1; cont >= 0; cont--) {

            if(player.getFirstName() == this.players[cont].getFirstName() && player.getLastName() == this.players[cont].getLastName()) {
                this.players.slice(cont, 1)   
                break;
            }
        }
        return this;
    }
}
