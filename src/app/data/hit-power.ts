export class HitPower {

    private static MIN_HOLD_TIME = 200;
    public static MAX_HOLD_TIME = 2000;

    private startTimestamp : number;

    static getTimeStamp() : number {
        return new Date().getTime();
    }

    constructor() {
        this.startTimestamp = HitPower.getTimeStamp();
    }

    public getPower() {
        return this.getHoldTime() / 10;
    }

    public waitingTooLong() : boolean {
        return this.getHoldTime() >= HitPower.MAX_HOLD_TIME;
    }

    public waitingTooShort() : boolean {
        return this.getHoldTime() < HitPower.MIN_HOLD_TIME;
    }

    private getHoldTime() {
        return (HitPower.getTimeStamp() - this.startTimestamp);
    }
}
