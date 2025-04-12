function isUserMatch(userTeamId, match) {
    return ((match.homeTeamId === userTeamId) || (match.awayTeamId === userTeamId));
}
export default isUserMatch;