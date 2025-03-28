import { useState, useEffect } from 'react';
import styles from './Squad.module.css';
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
            <div className={styles.container}>
                <div className={styles.tabContainer}>
                    <div className={`${styles.tab} ${activeTab === 1 ? styles.active : ''}`} onClick={() => setActiveTab(1)}>MI</div>
                    <div className={`${styles.tab} ${activeTab === 2 ? styles.active : ''}`} onClick={() => setActiveTab(2)}>CSK</div>
                    <div className={`${styles.tab} ${activeTab === 3 ? styles.active : ''}`} onClick={() => setActiveTab(3)}>RCB</div>
                    <div className={`${styles.tab} ${activeTab === 4 ? styles.active : ''}`} onClick={() => setActiveTab(4)}>KKR</div>
                    <div className={`${styles.tab} ${activeTab === 5 ? styles.active : ''}`} onClick={() => setActiveTab(5)}>DC</div>
                    <div className={`${styles.tab} ${activeTab === 6 ? styles.active : ''}`} onClick={() => setActiveTab(6)}>PBKS</div>
                    <div className={`${styles.tab} ${activeTab === 7 ? styles.active : ''}`} onClick={() => setActiveTab(7)}>RR</div>
                    <div className={`${styles.tab} ${activeTab === 8 ? styles.active : ''}`} onClick={() => setActiveTab(8)}>SRH</div>
                    <div className={`${styles.tab} ${activeTab === 9 ? styles.active : ''}`} onClick={() => setActiveTab(9)}>LSG</div>
                    <div className={`${styles.tab} ${activeTab === 10 ? styles.active : ''}`} onClick={() => setActiveTab(10)}>GT</div>
                </div>
                <div className={styles.tabContainer}>
                    {activeTab && (
                        <>
                            <h2>Batsman</h2>
                            {players
                                .filter(player =>
                                    player.id >= ((activeTab - 1) * 11) + 1 &&
                                    player.id <= (activeTab * 11) &&
                                    player.role_id === 1
                                )
                                .map(player => (
                                    <div key={player.id}>
                                        {player.profile && <img src={player.profile} height={180} alt={player.name} />}
                                        <div>
                                            {player.name}
                                            {player.captain && "(C)"}
                                            {player.wk && "(WK)"}
                                        </div>
                                    </div>
                                ))
                            }

                            <h2>All Rounder</h2>
                            {players
                                .filter(player =>
                                    player.id >= ((activeTab - 1) * 11) + 1 &&
                                    player.id <= (activeTab * 11) &&
                                    player.role_id === 2
                                )
                                .map(player => (
                                    <div key={player.id}>
                                        {player.profile && <img src={player.profile} height={180} alt={player.name} />}
                                        <div>
                                            {player.name}
                                            {player.captain && "(C)"}
                                            {player.wk && "(WK)"}
                                        </div>
                                    </div>
                                ))
                            }

                            <h2>Bowler</h2>
                            {players.filter(player =>
                                player.id >= ((activeTab - 1) * 11) + 1 &&
                                player.id <= (activeTab * 11) &&
                                player.role_id === 3
                            ).map(player => (
                                <div key={player.id}>
                                    {player.profile && <img src={player.profile} height={180} alt={player.name} />}
                                    <div>
                                        {player.name}
                                        {player.captain && "(C)"}
                                        {player.wk && "(WK)"}
                                    </div>
                                </div>
                            ))
                            }
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
export default Squad;