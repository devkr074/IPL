import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MainMenu.module.css';
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
    function handleStatistics() {
        navigate('/statistics');
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
            <div className={styles.container}>
                <div className={styles.imageContainer}>
                    <img src={trophy} alt="IPL Trophy" className={styles.image} />
                </div>
                <div className={styles.buttonContainer}>
                    <button className={styles.mainButton} onClick={handleContinue}> <FaPlay size={44} /> CONTINUE</button>
                    <div className={styles.buttonContainer2}>
                        <button className={styles.button} onClick={handleStatistics}>STATISTICS</button>
                        <button className={styles.button} onClick={handleSquad}>SQUAD</button>
                        <button className={styles.button} onClick={handlePointsTable}>POINTS TABLE</button>
                    </div>
                    <button className={styles.restartButton} onClick={handleRestart}><FaRedo /></button>
                </div>
            </div>
        </>
    );
}
export default MainMenu;