import * as Phaser from 'phaser';
import {Player} from './player';
import RoundedRectangle = PIXI.RoundedRectangle;


export class ScorePanel extends Phaser.Sprite {
    private static OFFSET: number = 10;
    private player: Player;

    private rockCounter: Phaser.Text;

    constructor(game: Phaser.Game, player : Player, x: number, y: number) {
        super(game, x, y);
        this.game = game;
        this.player = player;
        this.anchor.setTo(0.5);

        const graphics = game.add.graphics(x + 10, y - 5);
        graphics.beginFill(0x000000, .85);
        graphics.drawRoundedRect(0, 0, 50, 25, 5);

        this.game.add.existing(graphics);
        let rockSprite = this.game.add.sprite(x, y - 10, 'rock');
        rockSprite.scale.setTo(.25);
        rockSprite.anchor.setTo(.5, 0);

        this.rockCounter = this.game.add.text(x + (rockSprite.width /2) + ScorePanel.OFFSET, y - 2, '0', {
            fontSize: 16,
            fill: '#FFFFFF'
        });

    }

    update() {
        this.rockCounter.setText(`${this.player.getUsedRocks()}`);
    }

}
