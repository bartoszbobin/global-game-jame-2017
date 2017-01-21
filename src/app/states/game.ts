import * as Phaser from 'phaser';
import {Mushroom} from '../sprites/mushroom';
import {Player} from '../sprites/player';
import {HitPower} from '../data/hit-power';
import {RockHit} from '../data/rock-hit';
import {Rock} from '../sprites/rock';
import {Level} from '../sprites/level';
import {Boat} from "../sprites/boat";

export class GameState extends Phaser.State {
    private mushroom: Mushroom;
    private player: Player;
    private mouseInfo: Phaser.Text;
    private mousePointer: Phaser.Pointer;
    private hitPower: HitPower;
    private rockObject : Rock;
    private level : Level;

    private boats : Boat[] = [];

    init() {
        this.mousePointer = this.input.mousePointer;
        this.game.physics.startSystem(Phaser.Physics.P2JS);
    }

    preload() {
    }

    create() {
        this.addLevel();
        this.addPlayer();
        this.addMouseInfo();
        this.addRock();

        this.addBoat(192, 128);
        this.addBoat(237, 288);
        this.addBoat(577, 480);
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
                if (this.rockObject.isReadyToHit()) {
                   this.hitPower = new HitPower();
                }
            } else {
                if (this.rockObject.isReadyToHit()) {
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
                this.rockObject.hit(rockHit)
                    .then(() => {
                        // TODO count hits for player
                        this.boats[0].getP2Body().applyForce([12,12], rockHit.toPoint.x, rockHit.toPoint.y);
                        var bodies = this.physics.p2.hitTest(rockHit.toPoint, this.boats);
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

        this.mouseInfo.font = 'Nunito';
        this.mouseInfo.fontSize = 16;
        this.mouseInfo.fill = '#FF0000';

        this.mouseInfo.anchor.setTo(0);
    }

    private addRock() {
        this.rockObject = new Rock(this.game, this.player);
        this.game.add.existing(this.rockObject);
        this.game.physics.enable(this.rockObject, Phaser.Physics.ARCADE);
    }

    private addBoat(x : number, y: number) {
        const boat = new Boat(this.game, x, y);
        this.boats.push(boat);

        this.game.add.existing(boat);
        this.game.physics.p2.enable(boat, true);

        boat.setupBody();
        // TODO add polygon
    }

    private addLevel() {
        this.level =  new Level(this.game);
        this.game.add.existing(this.level);
        this.game.physics.p2.enable(this.level, true); // change second param to false to disable debug mode

        this.level.body.clearShapes();
        this.level.body.loadPolygon('levelPhysics', 'level');
        this.level.body.static = true;
        this.level.body.x = 640;
        this.level.body.y = 310;

        this.mushroom = new Mushroom(this.game, 200, 100);
    }
}
