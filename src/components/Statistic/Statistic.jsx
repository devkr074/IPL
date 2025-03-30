import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Statistic() {
    const [totalMatchPlayed, setTotalMatchPlayed] = useState(null);
    useEffect(() => {
        document.title = "IPL - Statistic";
        const totalMatchPlayed = Number(localStorage.getItem("totalMatchPlayed"));
        setTotalMatchPlayed(totalMatchPlayed);
    }, []);
    return (
        <>
            <h2>Statistic</h2>
            {totalMatchPlayed===0 ? (<h1>Tournament not started yet</h1>) : (<h1>Nahi dikhanga</h1>)}
        </>
    );
}
export default Statistic;