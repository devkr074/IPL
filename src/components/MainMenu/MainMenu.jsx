import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './MainMenu.module.css';
import trophy from '../../assets/trophy.png';
import { FaRedo } from 'react-icons/fa';
import { FaPlay } from 'react-icons/fa';
function MainMenu() {
    useEffect(() => {
        document.title = "IPL - Main Menu";
    }, []);
    const navigate = useNavigate();
    useEffect(() => {
        function handleBackButton(e) {
            e.preventDefault();
            navigate('/');
        }
        window.history.pushState(null, '', window.location.pathname);
        window.addEventListener('popstate', handleBackButton);
        return () => {
            window.removeEventListener('popstate', handleBackButton);
        };
    }, [navigate]);
    function handleContinue() {
        navigate('/schedule');
    }
    function handleStatistic() {
        navigate('/statistic');
    }
    function handlePointsTable() {
        navigate('/points-table');
    }
    function handleSquad() {
        navigate('/squad');
    }
    function handleRestart() {
        localStorage.clear();
        navigate('/');
    }
    return (
        <>
            <div className={style.container}>
                <div className={style.imageContainer}>
                    <img src={trophy} alt="IPL Trophy" className={style.image} />
                </div>
                <div className={style.buttonContainer}>
                    <button className={style.mainButton} onClick={handleContinue}> <FaPlay size={44} /> CONTINUE</button>
                    <div className={style.buttonContainer2}>
                        <button className={style.button} onClick={handleStatistic}>STATISTIC</button>
                        <button className={style.button} onClick={handleSquad}>SQUAD</button>
                        <button className={style.button} onClick={handlePointsTable}>POINTS TABLE</button>
                    </div>
                    <button className={style.restartButton} onClick={handleRestart}><FaRedo /></button>
                </div>
            </div>
        </>
    );
}
export default MainMenu;