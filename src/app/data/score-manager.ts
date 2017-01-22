export class ScoreManager {
    static actualScore: number = 0;

    static saveScore(usedRocks: number) {
        let highScore = JSON.parse(localStorage.getItem('highScore')) || [];
        highScore.push({ userName: localStorage.getItem('userName'), score: usedRocks });
        localStorage.setItem('highScore', JSON.stringify(highScore));
    }

    static getTopScores(): { user: string, score: number }[] {
        return [{ user: 'ascc', score: 5 }, { user: 'qwe', score: 10 }];
    }
}