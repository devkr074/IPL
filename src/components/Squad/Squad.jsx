import { useState, useEffect } from 'react';
import style from './Squad.module.css';
function Squad() {
    const [activeTab, setActiveTab] = useState(1);
    const [player, setPlayer] = useState([]);
    useEffect(() => {
        document.title = "IPL - Squad";
        const player = JSON.parse(localStorage.getItem('player'));
        setPlayer(player);
    }, []);
    return (
        <>
            <div className={style.container}>
                <div className={style.tabContainer}>
                    <div className={`${style.tab} ${activeTab === 1 ? style.active : ''}`} onClick={() => setActiveTab(1)}>MI</div>
                    <div className={`${style.tab} ${activeTab === 2 ? style.active : ''}`} onClick={() => setActiveTab(2)}>CSK</div>
                    <div className={`${style.tab} ${activeTab === 3 ? style.active : ''}`} onClick={() => setActiveTab(3)}>RCB</div>
                    <div className={`${style.tab} ${activeTab === 4 ? style.active : ''}`} onClick={() => setActiveTab(4)}>KKR</div>
                    <div className={`${style.tab} ${activeTab === 5 ? style.active : ''}`} onClick={() => setActiveTab(5)}>DC</div>
                    <div className={`${style.tab} ${activeTab === 6 ? style.active : ''}`} onClick={() => setActiveTab(6)}>PBKS</div>
                    <div className={`${style.tab} ${activeTab === 7 ? style.active : ''}`} onClick={() => setActiveTab(7)}>RR</div>
                    <div className={`${style.tab} ${activeTab === 8 ? style.active : ''}`} onClick={() => setActiveTab(8)}>SRH</div>
                    <div className={`${style.tab} ${activeTab === 9 ? style.active : ''}`} onClick={() => setActiveTab(9)}>LSG</div>
                    <div className={`${style.tab} ${activeTab === 10 ? style.active : ''}`} onClick={() => setActiveTab(10)}>GT</div>
                </div>
                <div className={style.tabContainer}>
                    {activeTab && (
                        <>
                            <h2>Batsman</h2>
                            {player
                                .filter(player =>
                                    player.playerId >= ((activeTab - 1) * 11) + 1 &&
                                    player.playerId <= (activeTab * 11) &&
                                    player.roleId === 1
                                )
                                .map(player => (
                                    <div key={player.playerId}>
                                        {player.profilePicture && <img src={player.profilePicture} height={180} alt={player.playerName} />}
                                        <div>
                                            {player.playerName}
                                            {player.isCaptain && "(C)"}
                                            {player.isWicketKeeper && "(WK)"}
                                        </div>
                                    </div>
                                ))
                            }

                            <h2>All Rounder</h2>
                            {player
                                .filter(player =>
                                    player.playerId >= ((activeTab - 1) * 11) + 1 &&
                                    player.playerId <= (activeTab * 11) &&
                                    player.roleId === 2
                                )
                                .map(player => (
                                    <div key={player.playerId}>
                                        {player.profilePicture && <img src={player.profilePicture} height={180} alt={player.playerName} />}
                                        <div>
                                            {player.playerName}
                                            {player.isCaptain && "(C)"}
                                            {player.isWicketKeeper && "(WK)"}
                                        </div>
                                    </div>
                                ))
                            }

                            <h2>Bowler</h2>
                            {player.filter(player =>
                                player.playerId >= ((activeTab - 1) * 11) + 1 &&
                                player.playerId <= (activeTab * 11) &&
                                player.roleId === 3
                            ).map(player => (
                                <div key={player.playerId}>
                                    {player.profilePicture && <img src={player.profilePicture} height={180} alt={player.playerName} />}
                                    <div>
                                        {player.playerName}
                                        {player.isCaptain && "(C)"}
                                        {player.isWicketKeeper && "(WK)"}
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