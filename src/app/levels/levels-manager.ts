import {LevelBuilder} from './levels-builder';
import {LevelBase} from './level-base';
import {StickObstacle, RocksGroupObstacle, RockObstacle, WoodObstacle, NavalMineObstacle} from '../sprites/obstacle';

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
                            { x: 192, y: 128 },
                            { x: 237, y: 288 },
                            { x: 1020, y: 420 },
                            { x: 400, y: 340 },
                            { x: 860, y: 380 },
                        ])
                        .withObstacles(() => [
                            new StickObstacle(this.game, 300, 300),
                            new StickObstacle(this.game, 390, 120, 90),
                            new WoodObstacle(this.game, 645, 280, 45),
                            new RockObstacle(this.game, 250, 440, 45),
                            new RockObstacle(this.game, 720, 500, 0),
                            new NavalMineObstacle(this.game, 530, 240, 0),
                            new NavalMineObstacle(this.game, 510, 353, 0),
                            new NavalMineObstacle(this.game, 588, 314, 0),
                            new NavalMineObstacle(this.game, 500, 210, 0)
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
        let highScore = JSON.parse(localStorage.getItem('highScore'));
        highScore.push({ userName: localStorage.getItem('userName'), score: localStorage.getItem('usedRocks') });
        highScore.sort((a, b) => a.score - b.score);
        let hs = highScore.slice(0, 10);
        localStorage.setItem('highScore', JSON.stringify(hs));

        this.game.state.start('HighScore');
    }
}
