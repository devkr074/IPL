import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
    return (
        <>
            <button onClick={handleContinue}>Continue</button>
            <button onClick={handleStatistics}>Statistics</button>
            <button onClick={handlePointsTable}>Points Table</button>
            <button onClick={handleSquad}>Squad</button>
        </>
    );
}
export default MainMenu;