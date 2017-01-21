import * as Phaser from 'phaser';

export class Boat extends Phaser.Sprite {
    health : number = 100;

    constructor(game : Phaser.Game, positionX : number, positionY : number) {
        super(game, positionX, positionY, 'boat-paper');

        this.game = game;
        this.anchor.setTo(0.5, 0.5);

        let hitAnimation = this.addAnimation('hit');
        let swimUpAnimation = this.addAnimation('swim_up');
        swimUpAnimation.play();
    }

    update() {
    }

    setupBody() {
        this.getP2Body().mass = 4000;
        this.getP2Body().fixedRotation = true;
        this.getP2Body().angularDamping = 0.15;
        this.getP2Body().angularForce = 0.15;
        this.getP2Body().velocity.x = 0.5;
        this.getP2Body().velocity.y = 0.1;
        this.getP2Body().damping = .15;

        this.getP2Body().setCircle(12);
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
}
