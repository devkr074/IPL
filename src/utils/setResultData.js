function setResultData(matchId) {
    const matchData = JSON.parse(localStorage.getItem(`match-${matchId}`));
    const schedule = JSON.parse(localStorage.getItem("schedule"));
    if(matchData[`match`])
    schedule[matchId - 1].matchStatusId = 1;
    schedule[matchId - 1].matchResult = (matchData.inning1.runs > matchData.inning2.runs) ? `${matchData.inning1.teamName} won by ${matchData.inning1.runs - matchData.inning2.runs} runs` : `${matchData.inning2.teamName} won by ${10 - matchData.inning2.wickets} wickets`;
    localStorage.setItem("schedule", JSON.stringify(schedule));
}
export default setResultData;