import * as Phaser from 'phaser';
import {Mushroom} from '../sprites/mushroom';
import {Player} from '../sprites/player';
import {HitPower} from '../data/hit-power';
import {RockHit} from '../data/rock-hit';
import {Rock} from '../sprites/rock';
import {Level01} from '../sprites/level-01';
import {RockMark} from '../sprites/rock-mark';
import {FinishZone} from '../sprites/finish-zone';
import {Boat} from '../sprites/boat';
import {StickObstacle, RocksGroupObstacle, RockObstacle, WoodObstacle} from "../sprites/obstacle";
import {ScorePanel} from '../sprites/score-panel';

const FINISH_ZONE_KEY = 'finish-zone';

export class GameState extends Phaser.State {
    private mushroom: Mushroom;
    private player: Player;
    private mouseInfo: Phaser.Text;
    private mousePointer: Phaser.Pointer;
    private hitPower: HitPower;
    private rockSprite: Rock;
    private finishZone: FinishZone;
    private level: Level01;
    private playerInfo: Phaser.Text;

    private obstacles: Phaser.Group;
    private boats: Boat[] = [];
    private scorePanel: ScorePanel;

    init() {
        this.mousePointer = this.input.mousePointer;
        this.stage.backgroundColor = '#01A2A6';
        this.game.physics.startSystem(Phaser.Physics.P2JS);
    }

    preload() {
    }

    create() {
        this.addLevel();
        this.addPlayer();
        this.addMouseInfo();
        this.addRockSprite();
        this.addObstacles();
        this.addPlayerInfo();

        this.addBoat(192, 128);
        this.addBoat(237, 288);
        this.addBoat(577, 480);

        this.addFinishZone();

        this.addScorePanel(500, 10);
    }

    render() {
        if (window['__DEV__']) {
            this.game.debug.spriteInfo(this.mushroom, 32, 32);
        }
    }

    update(): void {
        super.update();
        const angleInDeg = Phaser.Math.radToDeg(Phaser.Math.angleBetweenPoints(this.player.position, this.mousePointer.position));

        this.player.setAngleInDeg(angleInDeg);

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
                let rockHit = new RockHit(this.player.position.clone(), this.mousePointer.position.clone(), angleInDeg, hitPower);
                this.rockSprite.hit(rockHit)
                    .then(() => {
                        this.player.increaseUsedRocks();
                        this.applyRockImpactOnItems(rockHit);
                    });
            }
            this.hitPower = null;
        }

        this.mouseInfo.text = `(${this.mousePointer.x}, ${this.mousePointer.y})`;
        if (this.hitPower) {
            this.mouseInfo.text += ` - Hit power ${this.hitPower.getPower()}`;
        }
    }

    private addPlayer() {
        this.player = new Player(this.game, 30, 30);
        this.game.add.existing(this.player);
    }

    private addMouseInfo() {
        this.mouseInfo = this.add.text(10, this.game.height - 30, 'Mouse info', {});

        this.mouseInfo.font = 'Chewy';
        this.mouseInfo.fontSize = 14;
        this.mouseInfo.fill = '#000000';

        this.mouseInfo.anchor.setTo(0);
    }

    private addRockSprite() {
        this.rockSprite = new Rock(this.game, this.player);
        this.game.add.existing(this.rockSprite);
        this.game.physics.enable(this.rockSprite, Phaser.Physics.ARCADE);
    }


    private addObstacles() {
        this.obstacles = this.add.group();
        let obstacles = [
            new StickObstacle(this.game, 300, 300),
            new StickObstacle(this.game, 390, 120, 90),
            new WoodObstacle(this.game, 645, 280, 45),
            new RockObstacle(this.game, 250, 440, 45),
            new RockObstacle(this.game, 720, 500, 0),
            new RocksGroupObstacle(this.game, 300, 400, 0, 10),
        ];
        this.obstacles.addMultiple(obstacles);
        this.game.add.existing(this.obstacles);
    }

    private addBoat(x: number, y: number) {
        const boat = new Boat(this.game, x, y);
        this.boats.push(boat);

        this.game.add.existing(boat);
        this.game.physics.p2.enable(boat, true);
        boat.body.onBeginContact.add(this.completeLevel, this);
        boat.setupBody();
    }

    private addLevel() {
        this.level = new Level01(this.game);
    }

    private applyRockImpactOnItems(rockHit: RockHit) {
        const bodies : any[] = this.game.physics.p2.hitTest(rockHit.toPoint, [this.level]);
        if (bodies.length > 0) {
            return;
        }

        const rockMark: RockMark = new RockMark(this.game);
        this.game.add.existing(rockMark);
        rockMark.hit(rockHit);
    }

    private addFinishZone() {
        const finishZone = new FinishZone(this.game, 1150, 465);
        this.game.add.existing(finishZone);
        this.game.physics.p2.enable(finishZone, true);
        finishZone.setupBody();
    }

    private completeLevel(body) {
        if (body.sprite.key === FINISH_ZONE_KEY) {
            console.log("level completed");
        }
    }

    private addPlayerInfo() {
        this.playerInfo = this.add.text(this.game.width - 100, 20, localStorage.getItem('userName'), {});
    }

    private addScorePanel(x: number, y: number) {
        this.scorePanel = new ScorePanel(this.game, this.player, x, y);
        this.game.add.existing(this.scorePanel);
    }
}
