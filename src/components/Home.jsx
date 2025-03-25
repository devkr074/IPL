import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './Home.module.css';
import teams from '../assets/teams.png';
function Home() {
    const navigate = useNavigate();
    const [status, setStatus] = useState(false);
    useEffect(() => {
        const getStatus = localStorage.getItem('status') || false;
        if (getStatus) {
            navigate('/schedule');
        }
        document.title = "IPL - Home";
    }, []);
    function handleStartTournament() {
        // if (localStorage.getItem('status') || false) {
        //     const shouldReset = window.confirm('A game is already in progress. Do you want to reset and start a new game?');
        //     if (shouldReset) {
        //         localStorage.clear();
        //     } else {
        //         return;
        //     }
        // }
        navigate('/team-selection');
    }
    return (
        <div className={style.homeContainer}>
            <img className={style.teamPlayerImage} src={teams} alt="All Teams Player" />
            <button className={style.startBtn} onClick={handleStartTournament}>Start Tournament</button>
        </div>
    );
}
export default Home;