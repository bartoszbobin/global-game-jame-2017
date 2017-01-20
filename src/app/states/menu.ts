import * as Phaser from 'phaser';

export class MenuState extends Phaser.State {

    init() {
            
    }

    preload() {
        this.load.image('menu-start', './assets/images/menu-start.png');
        this.load.image('san-escobar-map', './assets/images/san-escobar-map.png');

        
    }

    create() {
        this.add.tileSprite(0, 0, 1280, 620, 'san-escobar-map');
        this.add.button(400, 250, 'menu-start', this.startGame, this);
    }

    startGame(){
        this.game.state.start('Game'); 
    }
}




