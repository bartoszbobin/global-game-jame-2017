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
        this.levels = [
                {
                    value: new LevelBuilder(1, game)
                        .withPlayer(50, 50)
                        .withBoats([
                            { x: 200, y: 150 }
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
                        .withPlayer(640, 420)
                        .withBoats([
                            { x: 237, y: 538 },
                            { x: 195, y: 460 },
                        ])
                        .withObstacles(() => [
                            new StickObstacle(this.game, 200, 300, -45),
                            new StickObstacle(this.game, 890, 120, 10),
                            new StickObstacle(this.game, 990, 140, 100),
                            new StickObstacle(this.game, 955, 240, 50),
                            new StickObstacle(this.game, 440, 110, -20),
                            new StickObstacle(this.game, 610, 195, -20),
                            new WhirlpoolObstacle(this.game, 310, 400),
                            new WhirlpoolObstacle(this.game, 200, 180),
                            new WoodObstacle(this.game, 110, 510, 45),
                            new WoodObstacle(this.game, 260, 570, -20),
                            new WoodObstacle(this.game, 1190, 340, -250),
                            new RockObstacle(this.game, 200, 30, -15),
                            new RockObstacle(this.game, 315, 440, 10),
                            new RockObstacle(this.game, 280, 445, 180),
                            new RockObstacle(this.game, 310, 480, 15),
                            new RockObstacle(this.game, 800, 300, -15),
                            new RockObstacle(this.game, 900, 460, 45),
                            new RockObstacle(this.game, 720, 500, 0),
                            new RockObstacle(this.game, 720, 500, 0),
                            new RockObstacle(this.game, 680, 190, 20),
                            new NavalMineObstacle(this.game, 330, 130, -10),
                            new NavalMineObstacle(this.game, 1045, 345, 0),
                            new NavalMineObstacle(this.game, 500, 210, 0),
                        ])
                        .withFinishZone({ x: 1150, y: 550 })
                },
                {
                    value: new LevelBuilder(3, game)
                        .withPlayer(570, 50)
                        .withBoats([
                            { x: 195, y: 500 }
                        ])
                        .withObstacles(() => [
                            /* MINES */
                            new NavalMineObstacle(this.game, 150, 200, -10),
                            new NavalMineObstacle(this.game, 150, 250, 0),
                            new NavalMineObstacle(this.game, 150, 300, 0),
                            new NavalMineObstacle(this.game, 150, 350, -10),
                            new NavalMineObstacle(this.game, 150, 400, 0),
                            new NavalMineObstacle(this.game, 150, 450, 0),

                            new NavalMineObstacle(this.game, 250, 200, -10),
                            new NavalMineObstacle(this.game, 250, 250, 0),
                            new NavalMineObstacle(this.game, 250, 300, 0),
                            new NavalMineObstacle(this.game, 250, 350, -10),
                            new NavalMineObstacle(this.game, 250, 400, 0),
                            new NavalMineObstacle(this.game, 250, 450, 0),
                            new NavalMineObstacle(this.game, 250, 500, 0),

                            new NavalMineObstacle(this.game, 350, 100, -10),
                            new NavalMineObstacle(this.game, 350, 150, 0),
                            new NavalMineObstacle(this.game, 350, 200, -10),
                            new NavalMineObstacle(this.game, 350, 250, 0),
                            new NavalMineObstacle(this.game, 350, 300, 0),
                            new NavalMineObstacle(this.game, 350, 350, -10),
                            new NavalMineObstacle(this.game, 350, 400, 0),
                            new NavalMineObstacle(this.game, 350, 450, 0),

                            new NavalMineObstacle(this.game, 450, 200, -10),
                            new NavalMineObstacle(this.game, 450, 250, 0),
                            new NavalMineObstacle(this.game, 450, 300, 0),
                            new NavalMineObstacle(this.game, 450, 350, -10),
                            new NavalMineObstacle(this.game, 450, 400, 0),
                            new NavalMineObstacle(this.game, 450, 450, 0),
                            new NavalMineObstacle(this.game, 450, 500, 0),

                            new NavalMineObstacle(this.game, 550, 150, 0),
                            new NavalMineObstacle(this.game, 550, 200, -10),
                            new NavalMineObstacle(this.game, 550, 250, 0),
                            new NavalMineObstacle(this.game, 550, 300, 0),
                            new NavalMineObstacle(this.game, 550, 350, -10),
                            new NavalMineObstacle(this.game, 550, 400, 0),
                            new NavalMineObstacle(this.game, 550, 450, 0),

                            new NavalMineObstacle(this.game, 650, 200, -10),
                            new NavalMineObstacle(this.game, 650, 250, 0),
                            new NavalMineObstacle(this.game, 650, 300, 0),
                            new NavalMineObstacle(this.game, 650, 350, -10),
                            new NavalMineObstacle(this.game, 650, 400, 0),
                            new NavalMineObstacle(this.game, 650, 450, 0),
                            new NavalMineObstacle(this.game, 650, 500, 0),
                            new NavalMineObstacle(this.game, 650, 550, 0),

                            new NavalMineObstacle(this.game, 750, 100, -10),
                            new NavalMineObstacle(this.game, 750, 150, 0),
                            new NavalMineObstacle(this.game, 750, 200, -10),
                            new NavalMineObstacle(this.game, 750, 250, 0),
                            new NavalMineObstacle(this.game, 750, 300, 0),
                            new NavalMineObstacle(this.game, 750, 350, -10),
                            new NavalMineObstacle(this.game, 750, 400, 0),
                            new NavalMineObstacle(this.game, 750, 450, 0),

                            new NavalMineObstacle(this.game, 850, 200, -10),
                            new NavalMineObstacle(this.game, 850, 250, 0),
                            new NavalMineObstacle(this.game, 850, 300, 0),
                            new NavalMineObstacle(this.game, 850, 350, -10),
                            new NavalMineObstacle(this.game, 850, 400, 0),
                            new NavalMineObstacle(this.game, 850, 450, 0),
                            new NavalMineObstacle(this.game, 850, 500, 0),
                            new NavalMineObstacle(this.game, 850, 550, 0),

                            new NavalMineObstacle(this.game, 950, 100, -10),
                            new NavalMineObstacle(this.game, 950, 150, 0),
                            new NavalMineObstacle(this.game, 950, 200, -10),
                            new NavalMineObstacle(this.game, 950, 250, 0),
                            new NavalMineObstacle(this.game, 950, 300, 0),
                            new NavalMineObstacle(this.game, 950, 350, -10),
                            new NavalMineObstacle(this.game, 950, 400, 0),
                            new NavalMineObstacle(this.game, 950, 450, 0),

                            new NavalMineObstacle(this.game, 1050, 200, -10),
                            new NavalMineObstacle(this.game, 1050, 250, 0),
                            new NavalMineObstacle(this.game, 1050, 300, 0),
                            new NavalMineObstacle(this.game, 1050, 350, -10),
                            new NavalMineObstacle(this.game, 1050, 400, 0),
                            new NavalMineObstacle(this.game, 1050, 450, 0),
                            new NavalMineObstacle(this.game, 1050, 500, 0)

                        ])
                        .withFinishZone({ x: 1180, y: 300 })
                }
            ];
    }

    setInitial() {
        let nextLevelIndex = LevelsManager.activeLevelIndex + 1;
        this.activeLevel.destroy();
        this._activeLevel = null;
        ScoreManager.actualScore = 0;

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
