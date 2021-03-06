import * as Phaser from 'phaser';

export class Boat extends Phaser.Sprite {
    public static HIT_BY_ROCK_POINTS: number = 200;

    private static HEALTH_COLOR_GOOD = '#BBFF00';
    private static HEALTH_COLOR_WEAK = '#FFDB00';
    private static HEALTH_COLOR_BAD = '#FF5C41';

    private static HEALTH_VERTICAL_OFFSET = 9;
    private static HEALTH_HORIZONTAL_OFFSET = -26;

    health : number = 100;
    private healthText: Phaser.Text;
    private safe: boolean = false;

    constructor(game : Phaser.Game, positionX : number, positionY : number) {
        super(game, positionX, positionY, 'boat-paper');

        this.game = game;
        this.anchor.setTo(0.5, 0);
        this.healthText = this.game.add.text(this.position.x, this.position.y, '', {
            font: '11px Chewy'
        });
        this.updateHealthText();

        let hitAnimation = this.addAnimation('hit');
        let swimUpAnimation = this.addAnimation('swim_up');
        swimUpAnimation.play();
    }

    public isSafe() : boolean {
        return this.safe;
    }

    public makeSafe(zonePoint : Phaser.Point) : void {
        this.safe = true;

        this.getP2Body().clearShapes();
        this.getP2Body().static = true;

        this.getP2Body().setZeroDamping();
        this.getP2Body().setZeroRotation();

        this.game.add.tween(this.healthText)
            .to({ alpha: 0 }, 250)
            .start()
            .onComplete.addOnce(() => this.healthText.destroy());

        this.game.add.tween(this)
            .to({ alpha: 0 }, 500)
            .start();
    }

    public whirlpool() : void {

        this.getP2Body().clearShapes();
        this.getP2Body().static = true;

        this.getP2Body().setZeroDamping();
        this.getP2Body().setZeroRotation();

        this.game.add.tween(this.healthText)
            .to({ alpha: 0 }, 250)
            .start()
            .onComplete.addOnce(() => this.healthText.destroy());

        this.game.add.tween(this)
            .to({ alpha: 0 }, 1000)
            .start().onComplete.addOnce(() => this.health = 0);
    }

    public isDead() {
        return this.health <= 0;
    }

    update() {
        this.healthText.position.x = this.position.x + Boat.HEALTH_VERTICAL_OFFSET;
        this.healthText.position.y = this.position.y + Boat.HEALTH_HORIZONTAL_OFFSET;
    }

    updateHealthText() : void {
        if (this.health > 70) {
            this.healthText.fill = Boat.HEALTH_COLOR_GOOD;
        } else if (this.health > 30) {
            this.healthText.fill = Boat.HEALTH_COLOR_WEAK;
        } else {
            this.healthText.fill = Boat.HEALTH_COLOR_BAD;
        }

        this.healthText.setText(`${Math.max(0, this.health)}`);
        this.game.world.bringToTop(this.healthText);
    }

    public addDamage(points : number) {
        console.log('boat', 'health', this.health);
        this.health -= points;
        this.updateHealthText();
        if (this.health <= 0) {
            this.startSinkingAnimation();
        } else {
            this.startWoundedAnimation();
        }
    }

    setupBody() {
        this.getP2Body().mass = 4000;
        this.getP2Body().fixedRotation = true;
        this.getP2Body().angularDamping = 0.15;
        this.getP2Body().angularForce = 0.15;
        this.getP2Body().velocity.x = 0.5;
        this.getP2Body().velocity.y = 0.1;
        this.getP2Body().damping = .15;
        this.getP2Body().setCircle(12, -3, -8);
    }

    handleContact(body) {
        console.log('contact', body);
        if (body.sprite.key === 'finish-zone') {
            console.log('level completed');
        }
    }

    getP2Body() : Phaser.Physics.P2.Body {
        return this.body;
    }

    private addAnimation(key: string): Phaser.Animation {
        this.animations.add('key');
        let animation = this.animations.add(key);
        animation.play(6, true);
        animation.stop();

        return animation;
    }

    private startSinkingAnimation() {
        this.getP2Body().clearShapes();
        this.getP2Body().static = true;
        this.healthText.destroy();

        this.game.add.tween(this)
            .to({alpha: 0}, 500)
            .start();
    }

    private startWoundedAnimation() {
        this.game.add.tween(this)
            .to({alpha: 0.5}, 150)
            .yoyo(true)
            .repeat(1)
            .start().onComplete.addOnce(() => this.game.add.tween(this).to({alpha: 1}, 150).start());
    }
}
