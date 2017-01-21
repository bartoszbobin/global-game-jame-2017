import * as Phaser from 'phaser';
import {Boat} from '../sprites/boat';
import {GameControll} from '../controlls/game-controll';
import {StickObstacle, RocksGroupObstacle, RockObstacle, WoodObstacle} from "../sprites/obstacle";

export class Level01 extends Phaser.Sprite {
    private obstacles: Phaser.Group;
    private boats: Boat[] = [];

    constructor(game: Phaser.Game, private gameControll: GameControll) {
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

        this.addObstacles();
        this.addBoats();
    }

    update() {
    }

    getP2Body(): Phaser.Physics.P2.Body {
        return this.body;
    }

    private addBoats() {
        this.boats = [
            this.gameControll.createBoat(192, 128),
            this.gameControll.createBoat(237, 288),
            this.gameControll.createBoat(577, 480)
        ];
    }    

    private addObstacles() {
        this.obstacles = this.game.add.group();
        let obstacles = [
            new StickObstacle(this.game, 300, 300),
            new StickObstacle(this.game, 390, 120, 90),
            new WoodObstacle(this.game, 645, 280, 45),
            new RockObstacle(this.game, 250, 440, 45),
            new RockObstacle(this.game, 720, 500, 0),
            new RocksGroupObstacle(this.game, 300, 400, 0, 10),
        ];
        this.obstacles.addMultiple(obstacles);
        this.game.add.existing(this.obstacles);
    }
}
