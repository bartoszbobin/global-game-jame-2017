import {Obstacle} from '../sprites/obstacle';
import {FinishZone} from '../sprites/finish-zone';
import {Boat} from '../sprites/boat';
import {ENABLE_POLYGONS} from '../data/global';

export class LevelBase extends Phaser.Sprite {
    protected get p2Body(): Phaser.Physics.P2.Body { return this.body; };

    constructor(
        private levelNumber: number,
        public playerPosition: Phaser.Point,
        public boats: Boat[],
        private obstacles: Obstacle[],
        finishZone: FinishZone,
        game: Phaser.Game
    ) {
        super(game, 0, 0, `levels/level-${levelNumber}`);

        this.game = game;

        this.anchor.setTo(0.5);
        this.scale.setTo(0.5);

        this.game.add.existing(this);
        this.game.physics.p2.enable(this, ENABLE_POLYGONS);

        this.p2Body.clearShapes();
        this.p2Body.loadPolygon(`levelPhysics-${levelNumber}`, `level-${this.levelNumber}-polygon`);
        this.p2Body.static = true;
        this.p2Body.x = 640;
        this.p2Body.y = 310;
        this.p2Body.velocity.x = 0.001;
        this.p2Body.velocity.y = 0.001;

        this.addObstacles(obstacles);
        this.addFinishZone(finishZone);
        this.moveBoatsToTop(finishZone);
    }

    destroy() {
        super.destroy(true);
        this.obstacles.forEach(o => o.destroy());
    }

    private addObstacles(obstacles: Obstacle[]) {
        let group = this.game.add.group();
        group.addMultiple(obstacles);
        this.game.add.existing(group);
    }

    private addFinishZone(finishZone: FinishZone) {
        this.game.add.existing(finishZone);
        this.game.physics.p2.enable(finishZone, ENABLE_POLYGONS);
        finishZone.setupBody();
    }

    private moveBoatsToTop(finishZone) {
        if (this.boats && this.boats.length) {
            for (let boat of this.boats) {
                this.game.world.bringToTop(boat);
            }
        }

        this.game.world.bringToTop(finishZone);
    }
}
