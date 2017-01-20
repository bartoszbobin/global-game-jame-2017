export class HitPower {

    private startTimestamp : number;

    static getTimeStamp() : number {
        return new Date().getTime();
    }

    constructor() {
        this.startTimestamp = HitPower.getTimeStamp();
    }

    public getPower() {
        return HitPower.getTimeStamp() - this.startTimestamp;
    }
}
