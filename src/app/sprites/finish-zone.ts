import * as Phaser from 'phaser';
import {LevelsManager} from '../levels/levels-manager';
import {GameState} from '../states/game';
import {Boat} from "./boat";

export class FinishZone extends Phaser.Sprite {
    constructor(game: Phaser.Game, x: number, y: number) {
        super(game, x, y, 'finish-zone');
        this.game = game;
        this.anchor.setTo(0.5);
    }

    setupBody() {
        this.getP2Body().static = true;
        this.getP2Body().setCircle(40);
        this.body.onBeginContact.add((body) => this.handleContact(body), this.game.state);
    }

    getP2Body() : Phaser.Physics.P2.Body {
        return this.body;
    }

    handleContact(body) {
        console.debug('FinishZone - handleContact');
        if (body.sprite.key === 'boat-paper') {
            (<Boat> body.sprite).makeSafe(this.position.clone());
        }
    }

}
