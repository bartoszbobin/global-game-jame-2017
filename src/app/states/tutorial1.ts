import * as Phaser from 'phaser';

export class Tutorial1State extends Phaser.State {
    private mouseInfo: Phaser.Text;

    private exitButton;

    init() {
    }

    preload() {
        this.load.image('tutorial1-background', './assets/images/tutorial01.png');
        this.load.image('exit-tutorial-button', './assets/images/tutorial-button-exit.png');
        this.load.image('next-tutorial-button', './assets/images/tutorial-button-next.png');
    }

    create() {
        this.add.tileSprite(0, 0, 1280, 620, 'tutorial1-background');
        this.exitButton = this.add.button(30, 500, 'exit-tutorial-button', this.backToMenu, this).scale.setTo(0.5);
        this.exitButton = this.add.button(this.game.width - 280, 500, 'next-tutorial-button', this.backToMenu, this).scale.setTo(0.5);     
    }

    backToMenu(){
        this.game.state.start('Menu');
    }
}