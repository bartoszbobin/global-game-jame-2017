import * as Phaser from 'phaser';

export class HighScoreState extends Phaser.State {
    private highScore: Phaser.Text;
    private highScoreResults: Phaser.Text;

    init() {
    }

    preload() {
        this.load.image('restart-button', './assets/images/restart-button.png');
        this.load.image('highscore-background', './assets/images/highscore-background.png');
    }

    create() {       
        this.add.tileSprite(0, 0, 1280, 620, 'highscore-background');
    
        this.add.button(200, 350, 'restart-button', this.startGame, this).scale.setTo(0.65);
        this.showHighScore();
    }

    startGame() {
        this.game.state.start('Menu');
    }

    private showHighScore() {

        let scoreBoard = JSON.parse(localStorage.getItem('highScore'));
        scoreBoard.sort((a, b) => a.score - b.score);
        scoreBoard = scoreBoard.slice(0, 10);

        let scoreBoardText = '';
        let scoreBoardScore = '';
        let i = 1;

        for (let scoreItem of scoreBoard) {
            scoreBoardText += i.toString() + '. ' + scoreItem.userName + '\n' ;    
            i++;     
        }

        for (let scoreItem of scoreBoard) {
            scoreBoardScore += scoreItem.score + '\n' ;    
        }

        this.highScore = this.add.text(650, 15, scoreBoardText, {});

        this.highScore.font = 'Chewy';
        this.highScore.fill = '#BBFF00';
        this.highScore.fontSize = 40;    

        this.highScoreResults = this.add.text(950, 15, scoreBoardScore, {});

        this.highScoreResults.font = 'Chewy';
        this.highScoreResults.fill = '#BBFF00';
        this.highScoreResults.fontSize = 40;    
    }
}
