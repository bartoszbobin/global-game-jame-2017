import * as Phaser from 'phaser';
import {RockHit} from '../data/rock-hit';
import {HitPower} from '../data/hit-power';

export class RockMark extends Phaser.Sprite {
    private radius : number = 5;
    private power: number;
    constructor(game : Phaser.Game) {
        super(game, 300, 300, 'rock');

        this.game = game;
        this.scale.set(0.15);
        this.anchor.setTo(0.5, 0.5);
    }

    update() {

    }

    public hit(rockHit : RockHit) {
        this.power = rockHit.power;
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

    private drawCircle() : void {
        let factor = (this.power / (.7 * HitPower.MAX_HOLD_TIME / 10));
        this.getP2Body().setCircle(this.radius++ * factor);
    }
}
