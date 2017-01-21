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
        // this.load.spritesheet('boat-paper', 'assets/animations/ship.png', 61, 53, 9);    

        this.load.image('levelBackground', 'assets/levels/level-bg.png');
        this.load.physics('levelPhysics', 'assets/levels/level-physics.json');
    }

    create() {
        this.game.state.start('Game');
    }
}
