import * as Phaser from 'phaser';

export class PowerMeter extends Phaser.Sprite {
    private pic: any;

    constructor(game) {
        super(game, 100, 100, 'player');
        this.game = game;
        this.anchor.setTo(0, 0.5);

        this.pic = this.game.add.sprite(0, 0, 'power-meter');
        this.cropRect = new Phaser.Rectangle(0, 50, 100, 100);
        this.updateCrop();
    }

    setPosition(x, y, power) {
        // console.log(this.cropRect.y);
        this.position.x = x;
        this.position.y = y;

        this.cropRect.y = 100 - (power / 2);
        console.log(this.cropRect.y);
        this.updateCrop();
    }
}
