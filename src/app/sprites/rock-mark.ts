import * as Phaser from 'phaser';
import {Player} from './player';
import {RockHit} from '../data/rock-hit';
import {Promise} from 'es6-promise';

export class RockMark extends Phaser.Sprite {
    private radius : number = 5;
    constructor(game : Phaser.Game) {
        super(game, 300, 300, 'rock');

        this.game = game;
        this.scale.set(0.15);
        this.anchor.setTo(0.5, 0.5);

        this.setStartState();
    }

    update() {

    }

    public hit(rockHit : RockHit) {
        this.visible = true;
        this.position.x = rockHit.toPoint.x;
        this.position.y = rockHit.toPoint.y;

        this.game.physics.p2.enable(this, true);
        this.drawCircle();
        this.getP2Body().mass = 10;
        this.getP2Body().static = true;

        this.game.add.tween(this)
            .to({ alpha: 0 }, 1000, () => this.drawCircle())
            .start()
            .onComplete
            .addOnce(() => this.destroy());
    }

    public getP2Body() : Phaser.Physics.P2.Body {
        return this.body;
    }
    private setStartState() {
        this.visible = false;
    }
    private drawCircle() : void {
        this.getP2Body().setCircle(this.radius++ * .7);
    }
}
