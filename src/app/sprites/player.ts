import * as Phaser from 'phaser';

export class Player extends Phaser.Sprite {
    private static BASE_ANGLE_OFFSET : number = -90;

    private usedRocks : number = 0;

    constructor(game : Phaser.Game, x : number, y : number) {
        super(game, x, y, 'player');
        this.game = game;
        this.anchor.setTo(0.5);
        this.scale.set(.5, .5);
    }

    update() {
    }

    setAngleInDeg(angle: number) {
        this.angle = Player.BASE_ANGLE_OFFSET + angle;
    }

    increaseUsedRocks() : void {
        this.usedRocks++;
    }

    getUsedRocks() : number {
        return this.usedRocks;
    }
}
