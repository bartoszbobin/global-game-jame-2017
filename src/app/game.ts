import 'pixi';
import 'p2';
import * as Phaser from 'phaser';

import {BootState} from './states/boot';
import {SplashState} from './states/splash';
import {GameState} from './states/game';
import {MenuState} from './states/menu';
import {GameOverState} from './states/gameOver';
import {HighScoreState} from './states/highScore';
import {Tutorial1State} from './states/tutorial1';
import {Tutorial2State} from './states/tutorial2';

export class Game extends Phaser.Game {
    constructor() {
        let width = 1280;
        let height = 620;

        super(width, height, Phaser.AUTO, 'game', null);

        this.state.add('Boot', BootState, false);
        this.state.add('Splash', SplashState, false);
        this.state.add('Game', GameState, false);
        this.state.add('Menu', MenuState, false);
        this.state.add('GameOver', GameOverState, false);
        this.state.add('HighScore', HighScoreState, false);
        this.state.add('Tutorial1', Tutorial1State, false);
        this.state.add('Tutorial2', Tutorial2State, false);

        this.state.start('Boot');
    }
}
