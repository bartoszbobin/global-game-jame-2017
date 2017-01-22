import {LevelBuilder} from './levels-builder';
import {LevelBase} from './level-base';
import {StickObstacle, RocksGroupObstacle, RockObstacle, WoodObstacle, NavalMineObstacle} from '../sprites/obstacle';
import {ScoreManager} from '../data/score-manager';

export class LevelsManager {
    private static activeLevelIndex: number = 0;
    private _activeLevel: LevelBase;

    private levels = [] as [{ value: LevelBuilder }];

    get activeLevel(): LevelBase {
        if (this.levels[LevelsManager.activeLevelIndex]) {
            this._activeLevel = this._activeLevel || this.levels[LevelsManager.activeLevelIndex].value.build();
            return this._activeLevel;
        } else {
            return null;
        }
    };

    constructor(private game: Phaser.Game) {
        // define levels
        this.levels =
            [
                {
                    value: new LevelBuilder(1, game)
                        .withBoats([
                            { x: 264, y: 234 },
                        ])
                        .withObstacles(() => [
                            new StickObstacle(this.game, 300, 300),
                            new StickObstacle(this.game, 200, 300, -45),
                            new StickObstacle(this.game, 370, 120, 90),
                            new StickObstacle(this.game, 420, 190, -20),
                            new WoodObstacle(this.game, 645, 270, 45),
                            new RockObstacle(this.game, 200, 30, -15),
                            new RockObstacle(this.game, 320, 440, 10),
                            new RockObstacle(this.game, 280, 445, 180),
                            new RockObstacle(this.game, 210, 430, 15),
                            new RockObstacle(this.game, 800, 300, -15),
                            new RockObstacle(this.game, 900, 460, 45),
                            new RockObstacle(this.game, 720, 500, 0),
                            new RockObstacle(this.game, 720, 500, 0),
                            new NavalMineObstacle(this.game, 530, 240, 0),
                            new NavalMineObstacle(this.game, 490, 353, 0),
                            new NavalMineObstacle(this.game, 560, 345, 0)
                            // new NavalMineObstacle(this.game, 588, 314, 0),
                            // new NavalMineObstacle(this.game, 500, 210, 0)
                        ])
                        .withFinishZone({ x: 1150, y: 470 })
                },
                {
                    value: new LevelBuilder(2, game)
                        .withBoats([
                            { x: 237, y: 288 },
                            { x: 983, y: 430 },
                        ])
                        .withObstacles(() => [
                            new StickObstacle(this.game, 983, 430),
                        ])
                        .withFinishZone({ x: 1150, y: 550 })
                }
            ];
    }

    setInitial() {
        let nextLevelIndex = LevelsManager.activeLevelIndex + 1;
        this.activeLevel.destroy();
        this._activeLevel = null;

        LevelsManager.activeLevelIndex = 0;
    }

    goToNext() {
        let nextLevelIndex = LevelsManager.activeLevelIndex + 1;
        this.activeLevel.destroy();
        this._activeLevel = null;

        if (this.levels.length <= nextLevelIndex) {
            this.finishGame();
            LevelsManager.activeLevelIndex = 0;
            return;
        }

        LevelsManager.activeLevelIndex = nextLevelIndex;
        this.game.state.restart(true);
    }

    private finishGame() {
        ScoreManager.saveScore(ScoreManager.actualScore);
        ScoreManager.actualScore = 0;
        this.game.state.start('HighScore');
    }
}
