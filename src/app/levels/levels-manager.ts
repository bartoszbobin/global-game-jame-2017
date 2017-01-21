import {LevelBuilder} from './levels-builder';
import {LevelBase} from './level-base';
import {StickObstacle, RocksGroupObstacle, RockObstacle, WoodObstacle, NavalMineObstacle} from '../sprites/obstacle'

export class LevelsManager {
    private levels = [] as [{ value: LevelBase }];
    private activeLevelIndex: number = 0;

    get activeLevel(): LevelBase { return this.levels[this.activeLevelIndex].value; };

    constructor(private game: Phaser.Game) {
        // define levels
        this.levels =
            [
                {
                    value: new LevelBuilder(1, game)
                        .withBoats([
                            { x: 192, y: 128 },
                            { x: 237, y: 288 },
                            { x: 1020, y: 420 },
                            { x: 400, y: 340 },
                            { x: 860, y: 380 },
                        ])
                        .withObstacles([
                            new StickObstacle(this.game, 300, 300),
                            new StickObstacle(this.game, 390, 120, 90),
                            new WoodObstacle(this.game, 645, 280, 45),
                            new RockObstacle(this.game, 250, 440, 45),
                            new RockObstacle(this.game, 720, 500, 0),
                            new NavalMineObstacle(this.game, 530, 240, 0),
                            new NavalMineObstacle(this.game, 510, 353, 0),
                            new NavalMineObstacle(this.game, 588, 314, 0)
                        ])
                        .withFinishZone({ x: 1150, y: 470 })
                        .build()
                }
            ];

        this.activeLevelIndex = 0;
    }

    getNext(): LevelBase {
        let nextLevelIndex = this.activeLevelIndex + 1;
        if (this.levels.length < nextLevelIndex) {
            // destroy actual
            this.levels[this.activeLevelIndex].value.destroy();

            // set new one
            this.activeLevelIndex = nextLevelIndex;
            return this.levels[this.activeLevelIndex].value;
        } else {
            return null;
        }
    }
}
