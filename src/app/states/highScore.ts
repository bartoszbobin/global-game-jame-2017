import * as Phaser from 'phaser';

export class HighScoreState extends Phaser.State {
    private highScore: Phaser.Text;

    init() {
    }

    preload() {
        this.load.image('restart-button', './assets/images/restart-button.png');
        this.load.image('highscore-background', './assets/images/highscore-background.png');
    }

    create() {       
        this.add.tileSprite(0, 0, 1280, 620, 'highscore-background');
    
        this.add.button(500, 450, 'restart-button', this.startGame, this);
        this.showHighScore();
    }

    startGame() {
        this.game.state.start('Menu');
    }

    private showHighScore() {
        let scoreBoard = JSON.parse(localStorage.getItem('highScore'));
        let scoreBoardText = '';

        for (let scoreItem of scoreBoard) {
            scoreBoardText += scoreItem.userName + '          ' + scoreItem.score + '\n' ;          
        }

        this.highScore = this.add.text(750, 50, scoreBoardText, {});

        this.highScore.font = 'Chewy';
        this.highScore.fontSize = 40;       
    }
}
