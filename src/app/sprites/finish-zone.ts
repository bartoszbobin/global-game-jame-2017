import * as Phaser from 'phaser';

export class FinishZone extends Phaser.Sprite {
    constructor(game: Phaser.Game, x: number, y: number) {
        super(game, x, y, 'mushroom');
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
