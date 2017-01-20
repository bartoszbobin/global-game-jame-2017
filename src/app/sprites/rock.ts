import * as Phaser from 'phaser';
import {Player} from './player';
import {RockHit} from '../data/rock-hit';
import {Promise} from 'es6-promise';

export class Rock extends Phaser.Sprite {
    private rockHit: RockHit;
    private promiseHit: Function;

    constructor(game : Phaser.Game, private player : Player) {
        super(game, player.position.x, player.position.y, 'rock');

        this.game = game;
        this.anchor.setTo(0.5, 0.5);
        this.scale.set(.15, .15);

        this.setStartState();
    }

    update() {
        if (!this.rockHit) {
            return;
        }

        if (Phaser.Rectangle.contains(this.body, this.rockHit.toPoint.x, this.rockHit.toPoint.y)) {
            this.body.velocity.setTo(0, 0);

            let duration = 500; // TODO should be calculated with power
            this.game.add.tween(this)
                .to({ alpha: 0 }, duration, Phaser.Easing.Linear.None)
                .start()
                .onComplete
                    .addOnce(() => {
                        this.setStartState();
                        this.promiseHit();
                    });
        }
    }

    hit(rockHit: RockHit) : Promise<any> {
        this.rockHit = rockHit;
        this.visible = true;
        this.alpha = 1;
        this.game.physics.arcade.moveToXY(this, rockHit.toPoint.x, rockHit.toPoint.y, 1, 1000);

        return new Promise((resolve) => this.promiseHit = resolve);
    }

    private setStartState() {
        this.position.x = this.player.position.x;
        this.position.y = this.player.position.y;
        this.visible = false;
        this.rockHit = null;
    }
}
