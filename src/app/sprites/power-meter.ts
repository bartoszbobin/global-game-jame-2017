import * as Phaser from 'phaser';

export class PowerMeter extends Phaser.Sprite {
    private pic: any;

    constructor(game) {
        super(game, 35, 50, 'power-meter');
        this.game = game;
        this.anchor.setTo(0, 0);

        this.cropRect = new Phaser.Rectangle(0, 35, 50, 50);
        this.updateCrop();
    }

    setPosition(x, y, power) {
        this.position.x = x;
        this.position.y = 25 + y - (power / 4);

        this.cropRect.y = 50 - (power / 4);
        this.updateCrop();
    }
}
