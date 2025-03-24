import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
function Home() {
    const navigate = useNavigate();
    const [status, setStatus] = useState(false);
    useEffect(() => {
        const getStatus = localStorage.getItem('status') || false;
        setStatus(getStatus);
        document.title = "IPL 2025 - Home"
    }, []);
    const handleStartGame = () => {
        if (localStorage.getItem('status') || false) {
            const shouldReset = window.confirm('A game is already in progress. Do you want to reset and start a new game?'
            );
            if (shouldReset) {
                localStorage.clear();
            } else {
                return;
            }
        }
        navigate('/team-selection')
    };
    return (
        <div className="container text-center mt-5">
            <h1>IPL 2025</h1>
            <Button variant="primary" className="m-3" onClick={handleStartGame}>Start New Tournament</Button>
            {status && (<Button variant="success" className="m-3" onClick={() => navigate('/schedule')}>Resume Tournament</Button>)}
        </div>
    );
}
export default Home;