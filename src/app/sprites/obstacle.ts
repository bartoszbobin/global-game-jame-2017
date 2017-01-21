import {ObstacleAsset} from '../data/models';
import * as Phaser from 'phaser';

export class Obstacle extends Phaser.Sprite {
    private get doesDamage(): number { return 10; }
    protected get p2Body():Phaser.Physics.P2.Body { return this.body };

    constructor(game: Phaser.Game, protected asset: ObstacleAsset, positionX: number, positionY: number, protected rotationInArcs: number = 0) {
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

export class StickObstacle extends Obstacle {
    constructor(game: Phaser.Game, positionX: number, positionY: number, rotationInArcs: number = 0) {
        super(game, 'stick', positionX, positionY, rotationInArcs);

        this.p2Body.mass = 150;
        this.p2Body.static = false;
    }
}

export class RockObstacle extends Obstacle {
    constructor(game: Phaser.Game, positionX: number, positionY: number, rotationInArcs: number = 0) {
        super(game, 'rock-obstacle', positionX, positionY, rotationInArcs);
    }
}

export class RocksGroupObstacle extends Phaser.Sprite {
    constructor(game: Phaser.Game, positionX: number, positionY: number, rotationInArcs: number = 0, rocksNumber: number = 1) {
        super(game, positionX, positionY, 'rock-group');

        for(let i; i<rocksNumber; i++) {
            this.addChild(new RockObstacle(game, 0, 0));
        }

        this.angle = rotationInArcs;
    }
}
