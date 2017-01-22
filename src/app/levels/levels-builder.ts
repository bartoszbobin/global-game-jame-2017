import {Obstacle} from '../sprites/obstacle';
import {Boat} from '../sprites/boat';
import {FinishZone} from '../sprites/finish-zone';
import {LevelBase} from './level-base';

export class LevelBuilder {
    private boatsPositions: { x: number, y: number }[] = [];
    private obstaclesDefinition: () => Obstacle[];
    private finishZone: FinishZone;

    constructor(private levelNumber: number, private game: Phaser.Game) {
    }

    withBoats(boatsPositions: { x: number, y: number }[]): LevelBuilder {
        this.boatsPositions = boatsPositions;
        return this;
    }

    withObstacles(obstaclesDefinition: () => Obstacle[]): LevelBuilder {
        this.obstaclesDefinition = obstaclesDefinition;

        return this;
    }

    withFinishZone(zonePosition: { x: number, y: number }): LevelBuilder {
        this.finishZone = new FinishZone(this.game, zonePosition.x, zonePosition.y);

        return this;
    }

    build(): LevelBase {
        let boats = this.boatsPositions.map(dim => {
            const boat = new Boat(this.game, dim.x, dim.y);

            this.game.add.existing(boat);
            this.game.physics.p2.enable(boat);

            boat.setupBody();

            return boat;
        });

        let obstacles = this.obstaclesDefinition();

        return new LevelBase(this.levelNumber, boats, obstacles, this.finishZone, this.game);
    }
}
