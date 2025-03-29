import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaRedo } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import style from "./MainMenu.module.css";
import trophy from "../../assets/trophy.png";
function MainMenu() {
    useEffect(() => {
        document.title = "IPL - Main Menu";
    }, []);
    const navigate = useNavigate();
    useEffect(() => {
        function handleBackButton(e) {
            e.preventDefault();
            navigate("/");
        }
        window.history.pushState(null, "", window.location.pathname);
        window.addEventListener("popstate", handleBackButton);
        return () => {
            window.removeEventListener("popstate", handleBackButton);
        };
    }, [navigate]);
    function handleContinue() {
        navigate("/schedule");
    }
    function handleStatistic() {
        navigate("/statistic");
    }
    function handleSquad() {
        navigate("/squad");
    }
    function handlePointsTable() {
        navigate("/points-table");
    }
    function handleRestart() {
        localStorage.clear();
        navigate("/");
    }
    return (
        <>
            <div className={style.container}>
                <div className={style.section}>
                    <img src={trophy} alt="IPL Trophy" className={style.trophy} />
                </div>
                <div className={style.section}>
                    <button className={style.button} onClick={handleContinue}><FaPlay size={44} />CONTINUE</button>
                    <div className={style.menuButtonContainer}>
                        <button className={style.menuButton} onClick={handleStatistic}>STATISTIC</button>
                        <button className={style.menuButton} onClick={handleSquad}>SQUAD</button>
                        <button className={style.menuButton} onClick={handlePointsTable}>POINTS TABLE</button>
                    </div>
                    <button className={style.restartButton} onClick={handleRestart}><FaRedo /></button>
                </div>
            </div>
        </>
    );
}
export default MainMenu;