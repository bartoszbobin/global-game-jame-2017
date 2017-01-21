const FINISH_ZONE_KEY = 'finish-zone';
import {Boat} from '../sprites/boat';

export class GameControll {
    constructor(private game: Phaser.Game) {
    }

    public createBoat(x: number, y: number) {
        const boat = new Boat(this.game, x, y);

        this.game.add.existing(boat);
        this.game.physics.p2.enable(boat, true);
        boat.body.onBeginContact.add(this.completeLevel, this.game.state);
        boat.setupBody();

        return boat;
    }

    private completeLevel(body) {
        if (body.sprite.key === FINISH_ZONE_KEY) {
            console.log('level completed');
        }
    }
}
