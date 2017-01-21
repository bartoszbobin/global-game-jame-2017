import * as Phaser from 'phaser';

export class Level extends Phaser.Sprite {
    constructor(game : Phaser.Game) {
        super(game, 0, 0, 'levelBackground');
        this.game = game;
        this.anchor.setTo(0.5);
    }

    update() {
    }
}
