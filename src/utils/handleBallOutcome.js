function handleBallOutcome(balls, inningBalls, roleId) {
    const outcomes = [];
    if (roleId == 1) {
        if (inningBalls <= 96) {
            if (balls <= 10) {
                outcomes.push(...Array(30).fill(0));
                outcomes.push(...Array(30).fill(1));
                outcomes.push(...Array(10).fill(2));
                outcomes.push(...Array(3).fill(3));
                outcomes.push(...Array(8).fill(4));
                outcomes.push(...Array(1).fill(5));
                outcomes.push(...Array(4).fill(6));
                outcomes.push(...Array(1).fill(7));
                outcomes.push(...Array(1).fill(8));
                outcomes.push(...Array(1).fill(9));
                outcomes.push(...Array(0).fill(10));
                outcomes.push(...Array(2).fill(11));
                outcomes.push(...Array(1).fill(12));
                outcomes.push(...Array(1).fill(13));
                outcomes.push(...Array(1).fill(14));
            }
            else {
                outcomes.push(...Array(25).fill(0));
                outcomes.push(...Array(35).fill(1));
                outcomes.push(...Array(10).fill(2));
                outcomes.push(...Array(3).fill(3));
                outcomes.push(...Array(12).fill(4));
                outcomes.push(...Array(1).fill(5));
                outcomes.push(...Array(6).fill(6));
                outcomes.push(...Array(1).fill(7));
                outcomes.push(...Array(1).fill(8));
                outcomes.push(...Array(1).fill(9));
                outcomes.push(...Array(0).fill(10));
                outcomes.push(...Array(1).fill(11));
                outcomes.push(...Array(1).fill(12));
                outcomes.push(...Array(1).fill(13));
                outcomes.push(...Array(1).fill(14));
            }
        }
        else {
            outcomes.push(...Array(27).fill(0));
            outcomes.push(...Array(36).fill(1));
            outcomes.push(...Array(7).fill(2));
            outcomes.push(...Array(2).fill(3));
            outcomes.push(...Array(11).fill(4));
            outcomes.push(...Array(1).fill(5));
            outcomes.push(...Array(7).fill(6));
            outcomes.push(...Array(1).fill(7));
            outcomes.push(...Array(1).fill(8));
            outcomes.push(...Array(1).fill(9));
            outcomes.push(...Array(1).fill(10));
            outcomes.push(...Array(2).fill(11));
            outcomes.push(...Array(1).fill(12));
            outcomes.push(...Array(1).fill(13));
            outcomes.push(...Array(1).fill(14));
        }
    }
    else if (roleId == 2) {
        if (inningBalls <= 96) {
            if (balls <= 10) {
                outcomes.push(...Array(28).fill(0));
                outcomes.push(...Array(27).fill(1));
                outcomes.push(...Array(9).fill(2));
                outcomes.push(...Array(3).fill(3));
                outcomes.push(...Array(8).fill(4));
                outcomes.push(...Array(1).fill(5));
                outcomes.push(...Array(5).fill(6));
                outcomes.push(...Array(1).fill(7));
                outcomes.push(...Array(1).fill(8));
                outcomes.push(...Array(1).fill(9));
                outcomes.push(...Array(0).fill(10));
                outcomes.push(...Array(2).fill(11));
                outcomes.push(...Array(1).fill(12));
                outcomes.push(...Array(1).fill(13));
                outcomes.push(...Array(1).fill(14));
            }
            else {
                outcomes.push(...Array(23).fill(0));
                outcomes.push(...Array(30).fill(1));
                outcomes.push(...Array(10).fill(2));
                outcomes.push(...Array(4).fill(3));
                outcomes.push(...Array(11).fill(4));
                outcomes.push(...Array(1).fill(5));
                outcomes.push(...Array(7).fill(6));
                outcomes.push(...Array(1).fill(7));
                outcomes.push(...Array(1).fill(8));
                outcomes.push(...Array(1).fill(9));
                outcomes.push(...Array(0).fill(10));
                outcomes.push(...Array(2).fill(11));
                outcomes.push(...Array(1).fill(12));
                outcomes.push(...Array(1).fill(13));
                outcomes.push(...Array(1).fill(14));
            }
        }
        else {
            outcomes.push(...Array(23).fill(0));
            outcomes.push(...Array(30).fill(1));
            outcomes.push(...Array(10).fill(2));
            outcomes.push(...Array(4).fill(3));
            outcomes.push(...Array(11).fill(4));
            outcomes.push(...Array(1).fill(5));
            outcomes.push(...Array(7).fill(6));
            outcomes.push(...Array(1).fill(7));
            outcomes.push(...Array(1).fill(8));
            outcomes.push(...Array(1).fill(9));
            outcomes.push(...Array(1).fill(10));
            outcomes.push(...Array(2).fill(11));
            outcomes.push(...Array(1).fill(12));
            outcomes.push(...Array(1).fill(13));
            outcomes.push(...Array(1).fill(14));
        }
    }
    else if (roleId == 3) {
        if (inningBalls <= 96) {
            if (balls <= 10) {
                outcomes.push(...Array(35).fill(0));
                outcomes.push(...Array(12).fill(1));
                outcomes.push(...Array(4).fill(2));
                outcomes.push(...Array(2).fill(3));
                outcomes.push(...Array(1).fill(4));
                outcomes.push(...Array(1).fill(5));
                outcomes.push(...Array(1).fill(6));
                outcomes.push(...Array(1).fill(7));
                outcomes.push(...Array(1).fill(8));
                outcomes.push(...Array(1).fill(9));
                outcomes.push(...Array(1).fill(10));
                outcomes.push(...Array(2).fill(11));
                outcomes.push(...Array(1).fill(12));
                outcomes.push(...Array(1).fill(13));
                outcomes.push(...Array(1).fill(14));
            }
            else {
                outcomes.push(...Array(26).fill(0));
                outcomes.push(...Array(10).fill(1));
                outcomes.push(...Array(4).fill(2));
                outcomes.push(...Array(2).fill(3));
                outcomes.push(...Array(2).fill(4));
                outcomes.push(...Array(1).fill(5));
                outcomes.push(...Array(1).fill(6));
                outcomes.push(...Array(1).fill(7));
                outcomes.push(...Array(1).fill(8));
                outcomes.push(...Array(1).fill(9));
                outcomes.push(...Array(1).fill(10));
                outcomes.push(...Array(2).fill(11));
                outcomes.push(...Array(1).fill(12));
                outcomes.push(...Array(1).fill(13));
                outcomes.push(...Array(1).fill(14));
            }
        }
        else {
            outcomes.push(...Array(26).fill(0));
            outcomes.push(...Array(10).fill(1));
            outcomes.push(...Array(4).fill(2));
            outcomes.push(...Array(2).fill(3));
            outcomes.push(...Array(2).fill(4));
            outcomes.push(...Array(1).fill(5));
            outcomes.push(...Array(1).fill(6));
            outcomes.push(...Array(1).fill(7));
            outcomes.push(...Array(1).fill(8));
            outcomes.push(...Array(1).fill(9));
            outcomes.push(...Array(1).fill(10));
            outcomes.push(...Array(2).fill(11));
            outcomes.push(...Array(1).fill(12));
            outcomes.push(...Array(1).fill(13));
            outcomes.push(...Array(1).fill(14));
        }
    }
    for (let i = outcomes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [outcomes[i], outcomes[j]] = [outcomes[j], outcomes[i]];
    }
    return (outcomes[Math.floor(Math.random() * outcomes.length)]);
}
export default handleBallOutcome;