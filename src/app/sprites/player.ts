import * as Phaser from 'phaser';
import {ScoreManager} from '../data/score-manager';

export class Player extends Phaser.Sprite {
    private static BASE_ANGLE_OFFSET : number = -90;

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
        ScoreManager.actualScore ++;
    }

    getUsedRocks() : number {
        return ScoreManager.actualScore;
    }
}
