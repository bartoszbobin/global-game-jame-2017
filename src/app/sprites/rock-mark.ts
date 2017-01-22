import * as Phaser from 'phaser';
import {RockHit} from '../data/rock-hit';
import {HitPower} from '../data/hit-power';
import Circle = Phaser.Circle;
import {WaterWave} from './water-wave';
import {ENABLE_POLYGONS} from '../../index';

export class RockMark extends Phaser.Sprite {
    private static WAVE_OFFSET = 20;

    private radius : number = 5;
    private power: number;
    private counter : number = 0;
    private waterWaves : Phaser.Group;
    private circles : WaterWave[] = [];

    constructor(game : Phaser.Game) {
        super(game, 300, 300);
        this.waterWaves = game.add.group();
        this.game = game;
        this.scale.set(0.15);
        this.anchor.setTo(0.5, 0.5);
        this.game.add.existing(this.waterWaves);
    }

    update() {

    }

    public hit(rockHit : RockHit) {
        this.power = rockHit.power;
        this.position.x = rockHit.toPoint.x;
        this.position.y = rockHit.toPoint.y;
        this.game.add.existing(this.waterWaves);

        this.game.physics.p2.enable(this, ENABLE_POLYGONS);
        this.updateCircles();
        this.getP2Body().mass = 10;
        this.getP2Body().static = true;

        this.game.add.tween(this)
            .to({}, 1000, () => this.updateCircles())
            .start().onComplete.addOnce(() => {
                this.game.add.tween(this)
                .to({}, 5000, () => this.expireCircles()).start();
            });
    }

    destroy() {
        super.destroy();
        this.waterWaves.destroy(true);
    }

    public getP2Body() : Phaser.Physics.P2.Body {
        return this.body;
    }

    private updateCircles() : void {
        let factor = (this.power / (.9 * HitPower.MAX_HOLD_TIME / 10));
        this.counter ++;

        if (this.counter === 1 || this.counter % RockMark.WAVE_OFFSET === 0) {
            let waterWave = new WaterWave(this.game, this.position.x, this.position.y);
            waterWave.alpha = 1;
            waterWave.scale.setTo(0.1);
            this.waterWaves.add(waterWave);
            this.circles.push(waterWave);
        }

        for (const circle of this.circles) {
            circle.scale.setTo(circle.scale.x + 0.01);
            circle.alpha -= 0.01;
        }

        this.getP2Body().setCircle(this.radius++ * factor);
    }

    private expireCircles() : void {
        let everyCircleInvisible = true;
        for (const circle of this.circles) {
            if (!circle.alpha) {
                continue;
            }
            circle.scale.setTo(circle.scale.x + 0.01);
            circle.alpha -= 0.01;

            if (circle.alpha > 0) {
                everyCircleInvisible = false;
            }
        }

        if (everyCircleInvisible) {
            this.destroy();
        }
    }
}
