import * as Phaser from 'phaser';

export class GameOverState extends Phaser.State {
    private mouseInfo: Phaser.Text;

    init() {          
    }

    preload() {
        this.load.image('restart-button', './assets/images/restart-button.png');
        this.load.image('gameOver-background', './assets/images/gameOver-background.png');      
    }

    create() {
        this.add.tileSprite(0, 0, 1280, 620, 'gameOver-background');
        this.add.button(550, 450, 'restart-button', this.startGame, this);
    }

    startGame(){
        this.game.state.start('Game'); 
    }
}