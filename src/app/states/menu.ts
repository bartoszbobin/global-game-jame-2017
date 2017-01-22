import * as Phaser from 'phaser';

export class MenuState extends Phaser.State {
    private userName = '';
    private startButton;
    private isBackspaceDisabled = false;
    private userNameText: Phaser.Text;

    init() {
        this.userName = '';
    }

    preload() {
        this.load.image('menu-start-button', './assets/images/menu-start-button.png');
        this.load.image('menu-background', './assets/images/menu-background.png');

        let letterFont = '55px Chewy';
        let letterStyle = '#000000';

        this.userNameText = this.game.add.text(640, 340, '', {
            font: letterFont,
            fill: letterStyle
        });
        this.userNameText.anchor.setTo(0.5, 0.5);

        this.input.keyboard.addCallbacks(this, null, null, this.addLetter);
    }

    create() {
        this.add.tileSprite(0, 0, 1280, 620, 'menu-background');
        this.startButton = this.add.button(425, 425, 'menu-start-button', this.startGame, this);
        this.startButton.inputEnabled = false;
        this.removeLetterOnBackspacePress();
    }

    startGame() {
        localStorage.setItem('userName', this.userName);
        this.game.state.start('Game');
    }

    removeLetterOnBackspacePress() {
        const backspaceKeyCode = 8;

        document.addEventListener("keydown", (e) => {
            if (this.userName.length && e.keyCode === backspaceKeyCode) {
                this.userName = this.userName.substr(0, this.userName.length - 1);

                this.userNameText.setText(this.userName);
                this.game.world.bringToTop(this.userNameText);
            }
        });
    }

    addLetter(char, keyInfo) {
        if (keyInfo.code === "Space" || (keyInfo.code === 'Enter' && this.userName.length < 3)) {
            return false
        }

        if (this.userName.length < 3) {
            this.userName += char.toUpperCase();

            if (this.userName.length === 3) {
                 this.startButton.inputEnabled = true;
            }
        }

        this.userNameText.setText(this.userName);
        this.game.world.bringToTop(this.userNameText);

        if (keyInfo.code === 'Enter' && this.startButton.inputEnabled) {
            this.startGame();
        }
    }
}



