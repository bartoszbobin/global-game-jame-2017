import * as Phaser from 'phaser';
import {Mushroom} from '../sprites/mushroom';
import {Player} from '../sprites/player';
import {HitPower} from '../data/hit-power';
import {RockHit} from '../data/rock-hit';
import {Rock} from '../sprites/rock';
import {RockMark} from '../sprites/rock-mark';
import {Boat} from '../sprites/boat';
import {ScorePanel} from '../sprites/score-panel';
import {LevelsManager} from '../levels/levels-manager';
import {LevelBase} from '../levels/level-base';
import {PowerMeter, PowerMeterBg} from '../sprites/power-meter';
import Body = Phaser.Physics.P2.Body;

export class GameState extends Phaser.State {
    levelsManager: LevelsManager;
    private mushroom: Mushroom;
    private player: Player;
    // private mouseInfo: Phaser.Text;
    private mousePointer: Phaser.Pointer;
    private hitPower: HitPower;
    private rockSprite: Rock;
    private level: LevelBase;
    private playerInfo: Phaser.Text;
    private powerMeter: PowerMeter;
    private powerMeterBg: PowerMeterBg;
    private scorePanel: ScorePanel;

    init() {
        this.mousePointer = this.input.mousePointer;
        this.stage.backgroundColor = '#01A2A6';
    }

    preload() {
    }

    create() {
        this.levelsManager = new LevelsManager(this.game);
        this.level = this.levelsManager.activeLevel;

        this.addPlayer(this.level.playerPosition);
        // this.addMouseInfo();
        this.addPowerMeter();
        this.addRockSprite();
        this.addPlayerInfo();
        this.addScorePanel(500, 10);
    }

    update(): void {
        super.update();

        if (this.isGameOver()) {
            return;
        }

        if (this.isLevelFinished()) {
            return;
        }

        this.handlePlayerRotation();
        this.handleRockHitting();

        // this.mouseInfo.text = `(${this.mousePointer.x}, ${this.mousePointer.y})`;
        if (this.hitPower) {
            // this.mouseInfo.text += ` - Hit power ${this.hitPower.getPower()}`;
            if (this.mousePointer && this.mousePointer.x && this.mousePointer.y) {
                this.powerMeter.setPosition(this.mousePointer.x, this.mousePointer.y, this.hitPower.getPower());
                this.powerMeterBg.setPosition(this.mousePointer.x, this.mousePointer.y, this.hitPower.getPower());
            }
        } else {
            if (this.mousePointer && this.mousePointer.x && this.mousePointer.y) {
                this.powerMeter.setPosition(this.mousePointer.x, this.mousePointer.y, 0);
                this.powerMeterBg.setPosition(this.mousePointer.x, this.mousePointer.y, 0);
            }
        }

    }

    private handleRockHitting() {
        if (this.mousePointer.isDown) {
            if (!this.hitPower) {
                if (this.rockSprite.isReadyToHit()) {
                    this.hitPower = new HitPower();
                }
            } else {
                if (this.rockSprite.isReadyToHit()) {
                    if (this.hitPower.waitingTooLong()) {
                        this.hitPower = null;
                    }
                }
            }
        }

        if (this.mousePointer.isUp && this.hitPower) {
            // throwing rock
            if (!this.hitPower.waitingTooShort()) {
                const hitPower: number = this.hitPower.getPower();
                const angleInDeg = Phaser.Math.radToDeg(Phaser.Math.angleBetweenPoints(this.player.position.clone(), this.mousePointer.position.clone()));
                let rockHit = new RockHit(this.player.position.clone(), this.mousePointer.position.clone(), angleInDeg, hitPower);
                this.rockSprite.hit(rockHit)
                    .then(() => {
                        this.player.increaseUsedRocks();
                        this.applyRockImpactOnItems(rockHit);
                    });
            }
            this.hitPower = null;
        }
    }

    private handlePlayerRotation() {
        const angleInDeg = Phaser.Math.radToDeg(Phaser.Math.angleBetweenPoints(this.player.position.clone(), this.mousePointer.position.clone()));
        this.player.setAngleInDeg(angleInDeg);
    }

    private addPlayer(position : Phaser.Point) {
        this.player = new Player(this.game, position.x, position.y);
        this.game.add.existing(this.player);
    }

    // private addMouseInfo() {
    //     this.mouseInfo = this.add.text(10, this.game.height - 30, 'Mouse info', {});

    //     this.mouseInfo.font = 'Chewy';
    //     this.mouseInfo.fontSize = 14;
    //     this.mouseInfo.fill = '#000000';

    //     this.mouseInfo.anchor.setTo(0);
    // }

    private addRockSprite() {
        this.rockSprite = new Rock(this.game, this.player);
        this.game.add.existing(this.rockSprite);
        this.game.physics.enable(this.rockSprite, Phaser.Physics.ARCADE);
    }

    private applyRockImpactOnItems(rockHit: RockHit) {
        const levelHit : any[] = this.game.physics.p2.hitTest(rockHit.toPoint, [this.level]);
        if (levelHit.length > 0) {
            console.debug('Ground hit');
            return;
        }

        const boatHits : any[] = this.game.physics.p2.hitTest(rockHit.toPoint, this.level.boats, 100);
        if (boatHits.length > 0) {
            for (const boat of boatHits) {
                boat.parent.sprite.addDamage(Boat.HIT_BY_ROCK_POINTS);
            }
        }

        const rockMark: RockMark = new RockMark(this.game);
        this.game.add.existing(rockMark);
        rockMark.hit(rockHit);
    }

    private addPlayerInfo() {
        this.playerInfo = this.add.text(575, 565, localStorage.getItem('userName'), {});
        this.playerInfo.font = 'Chewy';
        this.playerInfo.fontSize = 40;
    }

    private addScorePanel(x: number, y: number) {
        this.scorePanel = new ScorePanel(this.game, this.player, 700, 583);
        this.game.add.existing(this.scorePanel);
    }

    private addPowerMeter() {
        this.powerMeterBg = new PowerMeterBg(this.game);
        this.game.add.existing(this.powerMeterBg);

        this.powerMeter = new PowerMeter(this.game);
        this.game.add.existing(this.powerMeter);
    }

    private isGameOver() : boolean {
        for (const boat of this.level.boats) {
            if (boat.isDead()) {
                this.game.state.start('GameOver');
                return true;
            }
        }

        return false;
    }

    private isLevelFinished() : boolean {
        let boats = this.level.boats;
        let boatNumStillInGame = boats.length;

        for (const boat of boats) {
            if (boat.isSafe()) {
                boatNumStillInGame--;
            }
        }

        if (!boatNumStillInGame) {
            let state = this.game.state.states.Game as GameState;
            state.levelsManager.goToNext();
            return true;
        }

        return false;
    }
}
