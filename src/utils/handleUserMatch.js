function handleUserMatch(match) {
    const userTeamId = Number(localStorage.getItem("userTeamId"));
    return ((match.homeTeamId == userTeamId) || (match.awayTeamId == userTeamId));
}
export default handleUserMatch;