function getBallOutcome(roleId) {
    const outcomes = [];
    if (roleId === 1) {
        outcomes.push(...Array(25).fill(0));    // Dot Ball
        outcomes.push(...Array(45).fill(1));    // 1 Run
        outcomes.push(...Array(8).fill(2));     // 2 Runs
        outcomes.push(...Array(2).fill(3));     // 3 Runs
        outcomes.push(...Array(18).fill(4));    // 4 Runs
        outcomes.push(...Array(10).fill(6));    // 6 Runs
        outcomes.push(...Array(1).fill(5));     // Caught   1
        outcomes.push(...Array(1).fill(7));     // LBW      2
        outcomes.push(...Array(1).fill(8));     // Bowled   3
        outcomes.push(...Array(1).fill(9));     // Stumped  4
        outcomes.push(...Array(1).fill(10));    // Run Out  5
        outcomes.push(...Array(3).fill(11));    // Wide
        outcomes.push(...Array(2).fill(12));    // No Ball
        outcomes.push(...Array(1).fill(13));    // Leg Byes
        outcomes.push(...Array(1).fill(14));    // Byes
    } else if (roleId === 2) {
        outcomes.push(...Array(25).fill(0));
        outcomes.push(...Array(42).fill(1));
        outcomes.push(...Array(8).fill(2));
        outcomes.push(...Array(1).fill(3));
        outcomes.push(...Array(20).fill(4));
        outcomes.push(...Array(10).fill(6));
        outcomes.push(...Array(2).fill(5));
        outcomes.push(...Array(1).fill(7));
        outcomes.push(...Array(2).fill(8));
        outcomes.push(...Array(1).fill(9));
        outcomes.push(...Array(1).fill(10));
        outcomes.push(...Array(3).fill(11));
        outcomes.push(...Array(2).fill(12));
        outcomes.push(...Array(1).fill(13));
        outcomes.push(...Array(1).fill(14));
    } else if (roleId === 3) {
        outcomes.push(...Array(60).fill(0));
        outcomes.push(...Array(25).fill(1));
        outcomes.push(...Array(4).fill(2));
        outcomes.push(...Array(0).fill(3));
        outcomes.push(...Array(4).fill(4));
        outcomes.push(...Array(2).fill(6));
        outcomes.push(...Array(6).fill(5));
        outcomes.push(...Array(6).fill(7));
        outcomes.push(...Array(6).fill(8));
        outcomes.push(...Array(1).fill(9));
        outcomes.push(...Array(1).fill(10));
        outcomes.push(...Array(2).fill(11));
        outcomes.push(...Array(1).fill(12));
        outcomes.push(...Array(1).fill(13));
        outcomes.push(...Array(1).fill(14));
    }
    for (let i = outcomes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [outcomes[i], outcomes[j]] = [outcomes[j], outcomes[i]];
    }
    return outcomes[Math.floor(Math.random() * outcomes.length)];
}
export default getBallOutcome;