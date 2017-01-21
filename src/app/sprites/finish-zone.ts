import * as Phaser from 'phaser';

export class FinishZone extends Phaser.Sprite {
    constructor(game: Phaser.Game, x: number, y: number) {
        super(game, x, y, 'finish-zone');
        this.game = game;
        this.anchor.setTo(0.5);
    }

    setupBody() {
        this.getP2Body().static = true;
        this.getP2Body().setCircle(50);
        this.body.onBeginContact.add(this.handleContact, this.game.state);
    }

    getP2Body() : Phaser.Physics.P2.Body {
        return this.body;
    }

    handleContact(body) {
        console.log('FinishZone - handleContact');
        if (body.sprite.key === 'boat-paper') {
            let highScore = JSON.parse(localStorage.getItem('highScore'));
            highScore.push({userName: localStorage.getItem('userName'), score: localStorage.getItem('usedRocks')});
            localStorage.setItem('highScore', JSON.stringify(highScore));

            this.game.state.start('HighScore');
            console.log('level completed');
        }
    }

}
