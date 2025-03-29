import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './Home.module.css'
import poster from '../../assets/poster.png'
function Home() {
    useEffect(() => {
        document.title = "IPL - Indian Premier League";
    }, []);
    const navigate = useNavigate();
    function handlePlay() {
        if (localStorage.getItem('gameStatus')) {
            navigate('/main-menu');
        }
        else {
            navigate('/team');
        }
    }
    return (
        <>
            <div className={style.container}>
                <div className={style.section}>
                    <img src={poster} alt="IPL Trophy" className={style.image} />
                </div>
                <button className={style.button} onClick={handlePlay}>PLAY</button>
            </div>
        </>
    );
}
export default Home;