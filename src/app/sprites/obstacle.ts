import {ObstacleAsset} from '../data/models';
import * as Phaser from 'phaser';
import {getRandomInt} from '../utils';
import {Boat} from './boat';
import {WaterWave} from './water-wave';

export class Obstacle extends Phaser.Sprite {
    protected get p2Body(): Phaser.Physics.P2.Body { return this.body; };
    protected damagePower : number = 5;

    constructor(game: Phaser.Game, protected asset: ObstacleAsset, positionX: number, positionY: number, protected rotationInArcs: number = 0) {
        super(game, positionX, positionY, asset);

        this.game = game;
        this.anchor.setTo(0.5, 0.5);

        this.game.physics.p2.enable(this);
        this.setupBody();
        this.p2Body.onBeginContact.add((body) => this.handleContact(body), this.game.state);
    }

    setupBody() {
        this.p2Body.static = true;
        this.p2Body.clearShapes();
        this.p2Body.angle = this.rotationInArcs;
        this.loadPolygon();
    }

    protected handleContact(body) {
        if (body.sprite.key === 'boat-paper') {
            body.sprite.addDamage(this.getDamagePower());
        }
    }

    protected loadPolygon() : void {
        // by convention
        try {
            this.p2Body.loadPolygon(`${this.asset}Physics`, this.asset);
        } catch (excetion) {
            throw Error(`Missing Physics for asses: ${this.asset}`);
        }
    }

    protected getDamagePower() : number {
        return this.damagePower;
    }

}

export class StickObstacle extends Obstacle {
    constructor(game: Phaser.Game, positionX: number, positionY: number, rotationInArcs: number = 0) {
        super(game, 'stick', positionX, positionY, rotationInArcs);

        this.p2Body.mass = 150;
        this.p2Body.static = false;
    }
}

export class WoodObstacle extends Obstacle {
    constructor(game: Phaser.Game, positionX: number, positionY: number, rotationInArcs: number = 0) {
        super(game, 'stick', positionX, positionY, rotationInArcs);

        this.scale = new Phaser.Point(2, 2);
        this.p2Body.mass = 450;
        this.p2Body.static = false;
    }
}

export class RockObstacle extends Obstacle {
    constructor(game: Phaser.Game, positionX: number, positionY: number, rotationInArcs: number = 0) {
        super(game, 'rock-obstacle', positionX, positionY, rotationInArcs);
    }
}

export class NavalMineObstacle extends Obstacle {
    private static ROTATION_DEG_FACTOR = Phaser.Math.degToRad(0.15);
    private static MAX_ROTATE_ANGLE = 25;
    private static MAX_DAMAGE_RADIUS = 30;
    private polygonRadius = 16;
    private rotationDirection = -1;

    constructor(game: Phaser.Game, positionX: number, positionY: number, rotationInArcs: number = 0) {
        super(game, 'naval-mine', positionX, positionY, rotationInArcs);

        this.damagePower = 25;
    }

    public isArmed() {
        return !!this.damagePower;
    }

    public update() {
        const currentRotateAngle = Math.abs(Phaser.Math.radToDeg(this.p2Body.rotation));
        if (currentRotateAngle > NavalMineObstacle.MAX_ROTATE_ANGLE) {
            this.rotationDirection *= -1;
        }

        this.p2Body.rotation -= NavalMineObstacle.ROTATION_DEG_FACTOR * this.rotationDirection;
    }

    setupBody(): void {
        super.setupBody();
    }

    protected handleContact(body) {
        if (body.sprite.key === 'boat-paper') {
            body.sprite.addDamage(this.getDamagePower());
            this.blowUp();
        } else if (body.sprite.key === 'naval-mine') {
            let navalMine = (<NavalMineObstacle> body.sprite);

            if (navalMine.isArmed()) {
                this.p2Body.static = true;
                navalMine.blowUp();
            }
        }
    }

    protected loadPolygon() : void {
        this.p2Body.mass = 3000;
        this.p2Body.rotation = Phaser.Math.degToRad(getRandomInt(-NavalMineObstacle.MAX_ROTATE_ANGLE, NavalMineObstacle.MAX_ROTATE_ANGLE));
        this.p2Body.setCircle(this.polygonRadius, 0, 0);
    }

    public blowUp() {
        this.damagePower = 0;

        this.game.add.tween(this)
            .to({ alpha: 0 }, 1000, (val) => {
                if (!this || !this.p2Body) {
                    return;
                }

                if (this.polygonRadius + 4 > NavalMineObstacle.MAX_DAMAGE_RADIUS) {
                    this.p2Body.static = false;
                }

                if (this.polygonRadius >= NavalMineObstacle.MAX_DAMAGE_RADIUS) {
                    this.p2Body.clearShapes();
                } else {

                    this.p2Body.setZeroVelocity();
                    this.p2Body.setZeroForce();
                    this.p2Body.setZeroDamping();
                    this.p2Body.addCircle(this.polygonRadius += 0.25);
                }

                // return val - 0.01;
            }, false, 0, 10)
            .start().onComplete.addOnce(() => {
                this.destroy();
            });
    }
}

export class RocksGroupObstacle extends Phaser.Sprite {
    protected get p2Body(): Phaser.Physics.P2.Body { return this.body; };

    constructor(game: Phaser.Game, positionX: number, positionY: number, rotationInArcs: number = 0, rocksNumber: number = 1) {
        super(game, positionX, positionY);
        this.angle = rotationInArcs;

        this.loadChildRocks(rocksNumber);
        this.game.physics.p2.enable(this);
        this.p2Body.static = true;
    }

    private loadChildRocks(rocksNumber: number) {
        const rotationStep = 360 / rocksNumber;
        const radius = 50;


        for (let i = 0; i < rocksNumber; i++) {
            const angle = getRandomInt(i * rotationStep, (i + 1) * rotationStep) * (Math.PI / 180);
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            let rock = new RockObstacle(this.game, x, y, angle);

            this.addChild(rock);
        }
    }
}
