import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css'
import trophy from '../../assets/trophy.png'
function Home() {
    useEffect(() => {
        document.title = "IPL - Indian Premier League";
    }, []);
    const navigate = useNavigate();
    function handlePlay() {
        if (localStorage.getItem('data')) {
            navigate('/main-menu');
        }
        else {
            navigate('/teams');
        }
    }
    return (
        <>
            <div className={styles.container}>
                <img src={trophy} alt="IPL Trophy" className={styles.image} />
                <button className={styles.button} onClick={handlePlay}>PLAY</button>
            </div>
        </>
    );
}
export default Home;