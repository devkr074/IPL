import { useState, useEffect } from 'react';
function Squad() {
    const [activeTab, setActiveTab] = useState(1);
    const [players, setPlayers] = useState([]);
    useEffect(() => {
        document.title = "IPL - Squad";
        const data = JSON.parse(localStorage.getItem('data'));
        setPlayers(data.players);
    }, []);
    return (
        <>
            <div className="tabs">
                <div className={`tab ${activeTab === 1 ? 'active' : ''}`} onClick={() => setActiveTab(1)}>MI</div>
                <div className={`tab ${activeTab === 2 ? 'active' : ''}`} onClick={() => setActiveTab(2)}>CSK</div>
                <div className={`tab ${activeTab === 3 ? 'active' : ''}`} onClick={() => setActiveTab(3)}>RCB</div>
                <div className={`tab ${activeTab === 4 ? 'active' : ''}`} onClick={() => setActiveTab(4)}>KKR</div>
                <div className={`tab ${activeTab === 5 ? 'active' : ''}`} onClick={() => setActiveTab(5)}>DC</div>
                <div className={`tab ${activeTab === 6 ? 'active' : ''}`} onClick={() => setActiveTab(6)}>PBKS</div>
                <div className={`tab ${activeTab === 7 ? 'active' : ''}`} onClick={() => setActiveTab(7)}>RR</div>
                <div className={`tab ${activeTab === 8 ? 'active' : ''}`} onClick={() => setActiveTab(8)}>SRH</div>
                <div className={`tab ${activeTab === 9 ? 'active' : ''}`} onClick={() => setActiveTab(9)}>LSG</div>
                <div className={`tab ${activeTab === 10 ? 'active' : ''}`} onClick={() => setActiveTab(10)}>GT</div>
            </div>
            <div className="tab-content">
                {activeTab && (
                    <div className="matches-grid">
                        <h2>Batsman</h2>
                        {players.map((player) => {
                            if (player.id >= ((activeTab - 1) * 11) + 1 && player.id <= (activeTab * 11) && player.role_id === 1) {
                                return (
                                    <div key={player.id}>
                                        {player.logo && <img src={player.logo} height={180} />}
                                        <div>{player.name} {player.captain && "(C)"} {player.wk && "(WK)"}</div>
                                    </div>
                                );
                            }
                        })}
                        <h2>All Rounder</h2>
                        {players.map((player) => {
                            if (player.id >= ((activeTab - 1) * 11) + 1 && player.id <= (activeTab * 11) && player.role_id === 2) {
                                return (
                                    <div key={player.id}>
                                        <div>{player.name} {player.captain && "(C)"} {player.wk && "(WK)"}</div>
                                    </div>
                                );
                            }
                        })}
                        <h2>Baller</h2>
                        {players.map((player) => {
                            if (player.id >= ((activeTab - 1) * 11) + 1 && player.id <= (activeTab * 11) && player.role_id === 3) {
                                return (
                                    <div key={player.id}>
                                        <div>{player.name} {player.captain && "(C)"} {player.wk && "(WK)"}</div>
                                    </div>
                                );
                            }
                        })}
                    </div>
                )}
            </div>
        </>
    );
}
export default Squad;