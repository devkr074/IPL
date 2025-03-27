import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
            <button onClick={handlePlay}>Play</button>
        </>
    );
}
export default Home;