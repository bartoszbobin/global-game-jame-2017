import * as Phaser from 'phaser';
import {centerGameObjects} from '../utils';

export class SplashState extends Phaser.State {
    loaderBg: Phaser.Sprite;
    loaderBar: Phaser.Sprite;

    init() {
    }

    preload() {
        this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg');
        this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar');
        centerGameObjects([this.loaderBg, this.loaderBar]);

        this.load.setPreloadSprite(this.loaderBar);

        //
        // load your assets
        //
        this.load.image('mushroom', 'assets/images/mushroom2.png');
        this.load.image('rock', 'assets/images/rock.png');
        this.load.image('boat-paper', 'assets/images/boat-paper.png');
        this.load.image('levels/level-01', 'assets/levels/level-01.png');
        this.load.image('stick', 'assets/images/stick.png');
        this.load.image('rock-obstacle', 'assets/images/rock-obstacle.png');

        this.load.physics('levelPhysics', 'assets/levels/level-physics.json');
        this.load.physics('boatPhysics', 'assets/images/boat-physics.json');
        this.load.physics('stickPhysics', 'assets/images/stick-physics.json');
        this.load.physics('rock-obstaclePhysics', 'assets/images/rock-obstacle-physics.json');
    }

    create() {
        this.game.state.start('Game');
    }
}
