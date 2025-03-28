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
                                    player.personal_information.player_id >= ((activeTab - 1) * 11) + 1 &&
                                    player.personal_information.player_id <= (activeTab * 11) &&
                                    player.personal_information.role_id === 1
                                )
                                .map(player => (
                                    <div key={player.personal_information.player_id}>
                                        {player.personal_information.profile_picture && <img src={player.personal_information.profile_picture} height={180} alt={player.personal_information.name} />}
                                        <div>
                                            {player.personal_information.name}
                                            {player.personal_information.captain && "(C)"}
                                            {player.personal_information.wicket_keeper && "(WK)"}
                                        </div>
                                    </div>
                                ))
                            }

                            <h2>All Rounder</h2>
                            {players
                                .filter(player =>
                                    player.personal_information.player_id >= ((activeTab - 1) * 11) + 1 &&
                                    player.personal_information.player_id <= (activeTab * 11) &&
                                    player.personal_information.role_id === 2
                                )
                                .map(player => (
                                    <div key={player.personal_information.player_id}>
                                        {player.personal_information.profile_picture && <img src={player.personal_information.profile_picture} height={180} alt={player.personal_information.name} />}
                                        <div>
                                            {player.personal_information.name}
                                            {player.personal_information.captain && "(C)"}
                                            {player.personal_information.wicket_keeper && "(WK)"}
                                        </div>
                                    </div>
                                ))
                            }

                            <h2>Bowler</h2>
                            {players.filter(player =>
                                player.personal_information.player_id >= ((activeTab - 1) * 11) + 1 &&
                                player.personal_information.player_id <= (activeTab * 11) &&
                                player.personal_information.role_id === 3
                            ).map(player => (
                                <div key={player.personal_information.player_id}>
                                    {player.personal_information.profile_picture && <img src={player.personal_information.profile_picture} height={180} alt={player.personal_information.name} />}
                                    <div>
                                        {player.personal_information.name}
                                        {player.personal_information.captain && "(C)"}
                                        {player.personal_information.wicket_keeper && "(WK)"}
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