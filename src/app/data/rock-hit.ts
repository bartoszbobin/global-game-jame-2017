export class RockHit {
    public constructor(public fromPoint : Phaser.Point,
                       public toPoint : Phaser.Point,
                       public angleInDeg : number,
                       public power : number) {
    }
}
