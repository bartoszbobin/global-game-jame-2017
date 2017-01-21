import * as Phaser from 'phaser';

export class MenuState extends Phaser.State {

    private letter1;
    private letter2;
    private letter3;
    private userName = '';

    init() {
    }

    preload() {
        this.load.image('menu-start-button', './assets/images/menu-start-button.png');
        this.load.image('menu-background', './assets/images/menu-background.png');

        let letterFont = '64px Arial';
        let letterStyle = '#ffffff';

        this.letter1 = this.game.make.bitmapData(100, 100);
        this.letter1.context.font = letterFont;
        this.letter1.context.fillStyle = letterStyle;

        this.letter2 = this.game.make.bitmapData(100, 100);
        this.letter2.context.font = letterFont;
        this.letter2.context.fillStyle = letterStyle;

        this.letter3 = this.game.make.bitmapData(100, 100);
        this.letter3.context.font = letterFont;
        this.letter3.context.fillStyle = letterStyle;

        this.input.keyboard.addCallbacks(this, null, null, this.addLetter);
    }

    create() {
        this.add.tileSprite(0, 0, 1280, 620, 'menu-background');
        this.add.button(400, 250, 'menu-start-button', this.startGame, this);
    }

    startGame() {
        localStorage.setItem('userName', this.userName);
        this.game.state.start('Game');
    }

    addLetter(char) {
        if (this.userName.length === 0) {
            this.letter1.context.fillText(char, 55, 55);
            this.letter1.addToWorld(400, 400);
            this.userName += char;
        } else if (this.userName.length === 1) {
            this.letter2.context.fillText(char, 55, 55);
            this.letter2.addToWorld(450, 400);
            this.userName += char;
        } else if (this.userName.length === 2) {
            this.letter3.context.fillText(char, 55, 55);
            this.letter3.addToWorld(500, 400);
            this.userName += char;
        }
    }
}




