import {Obstacle} from '../sprites/obstacle';
import {Boat} from '../sprites/Boat';
import {GameControll} from '../controlls/game-controll';

export class LevelBase extends Phaser.Sprite {
    protected get p2Body(): Phaser.Physics.P2.Body { return this.body };

    constructor(
        private levelNumber: number, 
        private boats: Boat[],
        private obstacles: Obstacle[],
        game: Phaser.Game
    ) {
        super(game, 0, 0, `levels/level-${levelNumber}`);

        this.game = game;

        this.anchor.setTo(0.5);
        this.scale.setTo(0.5);

        this.game.add.existing(this);
        this.game.physics.p2.enable(this, true);

        this.p2Body.clearShapes();
        this.p2Body.loadPolygon('levelPhysics', 'level');
        this.p2Body.static = true;
        this.p2Body.x = 640;
        this.p2Body.y = 310;

        this.addObstacles();
    }

    private addObstacles() {
        let group = this.game.add.group();
        group.addMultiple(this.obstacles);
        this.game.add.existing(group);
    }
}