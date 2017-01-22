import * as Phaser from 'phaser';

export class MenuState extends Phaser.State {

    private letter1;
    private letter2;
    private letter3;
    private userName = '';
    private startButton;
    private tutorialButton;

    init() {
        this.userName = '';
    }

    preload() {
        this.load.image('menu-start-button', './assets/images/menu-start-button.png');
        this.load.image('menu-background', './assets/images/menu-background.png');
        this.load.image('instructions-button', './assets/images/menu-instructions-button.png');

        let letterFont = '55px Chewy';
        let letterStyle = '#000000';

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
        this.startButton = this.add.button(425, 385, 'menu-start-button', this.startGame, this);
        this.tutorialButton = this.add.button(490, 505, 'instructions-button', this.showTutorial, this);
        this.startButton.inputEnabled = false;
    }

    startGame() {
        localStorage.setItem('userName', this.userName);
        this.game.state.start('Game');
    }

    showTutorial() {
        this.game.state.start('Tutorial1');
    }

    addLetter(char, keyInfo) {
        if (this.userName.length === 0) {
            this.letter1.context.fillText(char.toUpperCase(), 55, 55);
            this.letter1.addToWorld(500, 300);
            this.userName += char.toUpperCase();
        } else if (this.userName.length === 1) {
            this.letter2.context.fillText(char.toUpperCase(), 55, 55);
            this.letter2.addToWorld(570, 300);
            this.userName += char.toUpperCase();
        } else if (this.userName.length === 2) {
            this.letter3.context.fillText(char.toUpperCase(), 55, 55);
            this.letter3.addToWorld(640, 300);
            this.userName += char.toUpperCase();
            this.startButton.inputEnabled = true;
        }

        if (this.userName.length === 3 && keyInfo.code === 'Enter') {
            this.startGame();
        }
    }
}




