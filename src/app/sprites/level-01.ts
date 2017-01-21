import * as Phaser from 'phaser';

export class Level01 extends Phaser.Sprite {
    constructor(game : Phaser.Game) {
        super(game, 0, 0, 'levels/level-01');

        this.game = game;
        this.anchor.setTo(0.5);
        this.scale.setTo(0.5);

        this.game.add.existing(this);
        this.game.physics.p2.enable(this, true);

        this.getP2Body().clearShapes();
        this.getP2Body().loadPolygon('levelPhysics', 'level');
        this.getP2Body().static = true;
        this.getP2Body().x = 640;
        this.getP2Body().y = 310;
    }

    update() {
    }

    getP2Body() : Phaser.Physics.P2.Body {
        return this.body;
    }
}
