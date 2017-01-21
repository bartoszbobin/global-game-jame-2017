import * as Phaser from 'phaser';
import {LevelsManager} from '../levels/levels-manager';
import {GameState} from '../states/game';

export class FinishZone extends Phaser.Sprite {
    constructor(game: Phaser.Game, x: number, y: number) {
        super(game, x, y, 'finish-zone');
        this.game = game;
        this.anchor.setTo(0.5);
    }

    setupBody() {
        this.getP2Body().static = true;
        this.body.onBeginContact.add(this.handleContact, this.game.state);
    }

    getP2Body() : Phaser.Physics.P2.Body {
        return this.body;
    }

    handleContact(body) {
        console.log('FinishZone - handleContact');
        if (body.sprite.key === 'boat-paper') {
            let state = this.game.state.states.Game as GameState;
            state.levelsManager.goToNext();
        }
    }

}
