import {Obstacle} from '../sprites/obstacle';
import {Boat} from '../sprites/Boat';
import {FinishZone} from '../sprites/finish-zone';
import {GameControll} from '../controlls/game-controll';
import {LevelBase} from './level-base'

export class LevelBuilder {
    private gameControll: GameControll;
    private boats: Boat[] = [];
    private obstacles: Obstacle[] = [];
    private finishZone: FinishZone;

    constructor(private levelNumber: number, private game: Phaser.Game) {
        this.gameControll = new GameControll(game);
    }

    withBoats(boatsPositions: { x: number, y: number }[]): LevelBuilder {
        this.boats = boatsPositions.map(dim => {
            return this.gameControll.createBoat(dim.x, dim.y);
        });

        return this;
    }

    withObstacles(obstacles: Obstacle[]): LevelBuilder {
        this.obstacles = obstacles;

        return this;
    }

    withFinishZone(zonePosition: { x: number, y: number }): LevelBuilder {
        this.finishZone = new FinishZone(this.game, zonePosition.x, zonePosition.y);

        return this;
    }

    build(): LevelBase {
        return new LevelBase(this.levelNumber, this.boats, this.obstacles, this.finishZone, this.game);
    }
}