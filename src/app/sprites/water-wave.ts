import * as Phaser from 'phaser';

export class WaterWave extends Phaser.Sprite {

    constructor(game : Phaser.Game, positionX : number, positionY : number) {
        super(game, positionX, positionY);
        this.anchor.setTo(0.5, 0.5);

        const bmd = game.add.bitmapData(600, 600); // Draw circle
        bmd.ctx.beginPath();
        bmd.ctx.arc(300, 300, 50, Phaser.Math.degToRad(0), Phaser.Math.degToRad(360), false);
        bmd.ctx.closePath();
        bmd.ctx.strokeStyle = '#ffffff';
        bmd.ctx.stroke();

        this.loadTexture(bmd);
    }
}
