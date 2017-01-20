import 'pixi';
import 'p2';
import * as Phaser from 'phaser';

import {BootState} from './states/boot';
import {SplashState} from './states/splash';
import {GameState} from './states/game';

export class Game extends Phaser.Game {
    constructor() {
        let width = 1366;
        let height = 768;

        super(width, height, Phaser.AUTO, 'content', null);

        this.state.add('Boot', BootState, false);
        this.state.add('Splash', SplashState, false);
        this.state.add('Game', GameState, false);

        this.state.start('Boot');
    }
}
