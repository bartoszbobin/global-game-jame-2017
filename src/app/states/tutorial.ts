import * as Phaser from 'phaser';

export class TutorialState extends Phaser.State {
    private mouseInfo: Phaser.Text;

    init() {
    }

    preload() {
        this.load.image('restart-button', './assets/images/restart-button.png');
        this.load.image('gameOver-background', './assets/images/gameOff.png');

        this.input.keyboard.addCallbacks(this, null, null, this.changeScreen);
    }

    create() {
        this.add.tileSprite(0, 0, 1280, 620, 'gameOver-background');
        this.add.button(425, 450, 'restart-button', this.startGame, this);
    }

    startGame() {
        this.game.state.start('Menu');
    }

    changeScreen(char, keyInfo) {
        if (keyInfo.code === 'ENTER') {
            
        } 
    }
}