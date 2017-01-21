import {ObstacleAsset} from '../data/models';
import * as Phaser from 'phaser';

export class Obstacle extends Phaser.Sprite {
    private get doesDamage(): number {return 10;}
    private get p2Body():Phaser.Physics.P2.Body { return this.body };

    constructor(game: Phaser.Game, private asset: ObstacleAsset, positionX: number, positionY: number, private rotationInArcs: number = 0) {
        super(game, positionX, positionY, asset);

        this.game = game;
        this.anchor.setTo(0.5, 0.5);

        this.game.physics.p2.enable(this);
        this.setupBody();
    }

    setupBody() {
        this.p2Body.static = true;
        this.p2Body.clearShapes();
        this.p2Body.angle = this.rotationInArcs;

        // by convention
        this.p2Body.loadPolygon(`${this.asset}Physics`, this.asset)
    }
}
