import {LevelBuilder} from './levels-builder';
import {LevelBase} from './level-base';
import {
    StickObstacle, RocksGroupObstacle, RockObstacle, WoodObstacle, NavalMineObstacle,
    WhirlpoolObstacle
} from '../sprites/obstacle';
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
                        .withPlayer(50, 50)
                        .withBoats([
                            // { x: 200, y: 150 }
                            { x: 1120, y: 460 }
                        ])
                        .withObstacles(() => [
                            new StickObstacle(this.game, 320, 270, -10),
                            new StickObstacle(this.game, 200, 300, -45),
                            new StickObstacle(this.game, 370, 120, 90),
                            new StickObstacle(this.game, 420, 190, -20),
                            new WhirlpoolObstacle(this.game, 310, 404),
                            new WhirlpoolObstacle(this.game, 110, 210),
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
                            new NavalMineObstacle(this.game, 560, 345, 0),
                            new NavalMineObstacle(this.game, 500, 210, 0),
                        ])
                        .withFinishZone({ x: 1150, y: 470 })
                },
                {
                    value: new LevelBuilder(2, game)
                        .withBoats([
                            { x: 237, y: 538 },
                            { x: 195, y: 460 },
                        ])
                        .withObstacles(() => [
                            new StickObstacle(this.game, 320, 270. -10),
                            new StickObstacle(this.game, 120, 350, -85),
                            new StickObstacle(this.game, 200, 300, -45),
                            new StickObstacle(this.game, 970, 150, 90),
                            new StickObstacle(this.game, 420, 190, -20),
                            new WhirlpoolObstacle(this.game, 310, 400),
                            new WhirlpoolObstacle(this.game, 200, 180),
                            new WoodObstacle(this.game, 110, 510, 45),
                            new WoodObstacle(this.game, 260, 570, -20),
                            new RockObstacle(this.game, 200, 30, -15),
                            new RockObstacle(this.game, 320, 440, 10),
                            new RockObstacle(this.game, 280, 445, 180),
                            new RockObstacle(this.game, 310, 480, 15),
                            new RockObstacle(this.game, 800, 300, -15),
                            new RockObstacle(this.game, 900, 460, 45),
                            new RockObstacle(this.game, 720, 500, 0),
                            new RockObstacle(this.game, 720, 500, 0),
                            new NavalMineObstacle(this.game, 330, 130, -10),
                            new NavalMineObstacle(this.game, 490, 353, 0),
                            new NavalMineObstacle(this.game, 1045, 345, 0),
                            new NavalMineObstacle(this.game, 500, 210, 0),
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
