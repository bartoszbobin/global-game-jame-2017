import * as Phaser from 'phaser';

export class MenuState extends Phaser.State {

    init() {          
    }

    preload() {
        this.load.image('menu-start-button', './assets/images/menu-start-button.png');
        this.load.image('menu-background', './assets/images/menu-background.png');      
    }

    create() {
        this.add.tileSprite(0, 0, 1280, 620, 'menu-background');
        this.add.button(400, 250, 'menu-start-button', this.startGame, this);
    }

    startGame(){
        this.game.state.start('Game'); 
    }
}




