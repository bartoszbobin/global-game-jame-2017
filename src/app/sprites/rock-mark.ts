import * as Phaser from 'phaser';
import {Player} from './player';
import {RockHit} from '../data/rock-hit';
import {Promise} from 'es6-promise';

export class RockMark extends Phaser.Sprite {
    constructor(game : Phaser.Game) {
        super(game, 300, 300, 'rock');

        this.game = game;
        this.anchor.setTo(0.5, 0.5);

        this.setStartState();
    }

    update() {

    }

    public hit(rockHit : RockHit) {
        this.visible = true;
        this.game.physics.p2.enable(this, true);
        this.getP2Body().mass = 200;
        this.getP2Body().static = true;

        this.position.x = rockHit.toPoint.x;
        this.position.y = rockHit.toPoint.y;
    }

    public getP2Body() : Phaser.Physics.P2.Body {
        return this.body;
    }
    private setStartState() {
        this.visible = false;
    }
}
