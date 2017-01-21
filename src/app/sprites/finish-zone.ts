import * as Phaser from 'phaser';

export class FinishZone extends Phaser.Sprite {
    constructor(game: Phaser.Game, x: number, y: number) {
        super(game, x, y, 'finish-zone');
        this.game = game;
        this.anchor.setTo(0.5);
    }

    setupBody() {
        this.getP2Body().static = true;
    }

    getP2Body() : Phaser.Physics.P2.Body {
        return this.body;
    }

}
