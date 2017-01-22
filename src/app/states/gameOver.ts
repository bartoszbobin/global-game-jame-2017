import * as Phaser from 'phaser';
import {LevelsManager} from '../levels/levels-manager';

export class GameOverState extends Phaser.State {
    preload() {
        this.load.image('restart-button', './assets/images/restart-button.png');
        this.load.image('gameOver-background', './assets/images/gameOver-background.png');
    }

    create() {
        this.add.tileSprite(0, 0, 1280, 620, 'gameOver-background');
        this.add.button(425, 450, 'restart-button', this.startGame, this);
    }

    startGame() {
        let levelManager = new LevelsManager(this.game);
        levelManager.setInitial();

        this.game.state.start('Menu');
    }
}
