import * as Phaser from 'phaser';

export class Mushroom extends Phaser.Sprite {

    constructor(game, x, y) {
        super(game, x, y, 'mushroom');
        this.game = game;
        this.anchor.setTo(0.5);
    }

    update() {
        this.angle += 1;
    }

}
