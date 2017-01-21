import * as Phaser from 'phaser';
import {Player} from './player';
import {RockHit} from '../data/rock-hit';
import {Promise} from 'es6-promise';


export class Boat extends Phaser.Sprite {
    health : number = 100;

    constructor(game : Phaser.Game, positionX : number, positionY : number) {
        super(game, positionX, positionY, 'boat-paper');

        this.game = game;
        this.anchor.setTo(0.5, 0.5);
        this.scale.set(.25, .25);

        let hitAnimation = this.addAnimation('hit');
        let swimUpAnimation = this.addAnimation('swim_up');
        swimUpAnimation.play();
    }

    update() {
    }

    setupBody() {
        this.getP2Body().mass = 1;
    }

    getP2Body() : Phaser.Physics.P2.Body {
        return this.body;
    }

    private addAnimation(key: string): Phaser.Animation {
        this.animations.add('key');
        let animation = this.animations.add(key);
        animation.play(6, true);
        animation.stop();

        return animation;
    }
}
