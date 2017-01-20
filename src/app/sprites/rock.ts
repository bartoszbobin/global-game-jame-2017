import * as Phaser from 'phaser';
import {Player} from './player';
import {RockHit} from '../data/rock-hit';

export class Rock extends Phaser.Sprite {
    private rockHit: RockHit;

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

            this.game.add.tween(this)
                .to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, true)
                .onComplete
                    .addOnce(() => this.setStartState());
        }
    }

    hit(rockHit: RockHit) {
        this.rockHit = rockHit;
        this.visible = true;
        this.game.physics.arcade.moveToXY(this, rockHit.toPoint.x, rockHit.toPoint.y, 1, 1000);
    }

    private setStartState() {
        this.position.x = this.player.position.x;
        this.position.y = this.player.position.y;
        this.visible = false;
        this.alpha = 1;
    }
}