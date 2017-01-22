import * as Phaser from 'phaser';
import {centerGameObjects} from '../utils';
import {LevelsManager} from '../levels/levels-manager';

export class SplashState extends Phaser.State {
    loaderBg: Phaser.Sprite;
    loaderBar: Phaser.Sprite;

    init() {
        this.game.physics.startSystem(Phaser.Physics.P2JS);
    }

    preload() {
        this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg');
        this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar');
        centerGameObjects([this.loaderBg, this.loaderBar]);

        this.load.setPreloadSprite(this.loaderBar);

        //
        // load your assets
        //
        this.load.image('player', 'assets/images/player.png');
        this.load.image('finish-zone', 'assets/images/finish.png');
        this.load.image('rock', 'assets/images/rock.png');
        this.load.image('boat-paper', 'assets/images/boat-paper.png');
        this.load.image('levels/level-1', 'assets/levels/level-01.png');
        this.load.image('levels/level-2', 'assets/levels/level-02.png');
        this.load.image('levels/level-3', 'assets/levels/level-03.png');
        this.load.image('stick', 'assets/images/stick.png');
        this.load.image('wood', 'assets/images/wood.png');
        this.load.image('rock-obstacle', 'assets/images/rock-obstacle.png');
        this.load.image('power-meter-bg', 'assets/images/power-meter-bg.png');
        this.load.image('power-meter', 'assets/images/power-meter.png');
        this.load.image('naval-mine', 'assets/images/naval-mine.png');
        this.load.image('whirlpool', 'assets/images/whirlpool.png');

        this.load.physics('levelPhysics-1', 'assets/levels/level-physics.json');
        this.load.physics('levelPhysics-2', 'assets/levels/level-2-physics.json');
        this.load.physics('levelPhysics-3', 'assets/levels/level-3-physics.json');
        this.load.physics('boatPhysics', 'assets/images/boat-physics.json');
        this.load.physics('stickPhysics', 'assets/images/stick-physics.json');
        this.load.physics('woodPhysics', 'assets/images/wood-physics.json');
        this.load.physics('rock-obstaclePhysics', 'assets/images/rock-obstacle-physics.json');
    }

    create() {
        this.game.state.start('Menu');
    }
}
