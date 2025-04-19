function handleBallOutcome(roleId) {
    const outcomes = [];
    if (roleId === 1) {
        outcomes.push(...Array(25).fill(0));
        outcomes.push(...Array(45).fill(1));
        outcomes.push(...Array(8).fill(2));
        outcomes.push(...Array(2).fill(3));
        outcomes.push(...Array(18).fill(4));
        outcomes.push(...Array(10).fill(6));
        outcomes.push(...Array(1).fill(5));
        outcomes.push(...Array(1).fill(7));
        outcomes.push(...Array(1).fill(8));
        outcomes.push(...Array(1).fill(9));
        outcomes.push(...Array(1).fill(10));
        outcomes.push(...Array(3).fill(11));
        outcomes.push(...Array(2).fill(12));
        outcomes.push(...Array(1).fill(13));
        outcomes.push(...Array(1).fill(14));
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
export default handleBallOutcome;