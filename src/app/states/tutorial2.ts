import * as Phaser from 'phaser';

export class Tutorial2State extends Phaser.State {
    private exitButton;

    preload() {
        this.load.image('tutorial1-background', './assets/images/tutorial02.png');
        this.load.image('exit-tutorial-button', './assets/images/tutorial-button-exit.png');
        this.load.image('preview-tutorial-button', './assets/images/tutorial-button-previous.png');
    }

    create() {
        this.add.tileSprite(0, 0, 1280, 620, 'tutorial1-background');
        this.exitButton = this.add.button(30, 500, 'preview-tutorial-button', this.showTutorial1Page, this).scale.setTo(0.5);
        this.exitButton = this.add.button(this.game.width - 340, 500, 'exit-tutorial-button', this.backToMenu, this).scale.setTo(0.5);
    }

    backToMenu() {
        this.game.state.start('Menu');
    }

    showTutorial1Page() {
        this.game.state.start('Tutorial1');
    }
}
