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

    }

    update() {
    }

    setupBody() {
        this.getP2Body().mass = 1;
    }

    public getP2Body() : Phaser.Physics.P2.Body {
        return this.body;
    }
}
