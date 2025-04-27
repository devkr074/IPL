import { useState, useEffect } from 'react';
function Venues() {
    const [venues, setVenues] = useState();
    const [teams, setTeams] = useState();
    useEffect(() => {
        document.title = "IPL - Venues";
        const venues = JSON.parse(localStorage.getItem("venues"));
        const teams = JSON.parse(localStorage.getItem("teams"));
        setVenues(venues);
        setTeams(teams);
    }, []);
    return (
        <>
            <div>
                <p>IPL - Venues</p>
            </div>
            <div>
                {venues && venues.map((v) => (
                    <div key={v.venueId}>
                        <img src="https://document.iplt20.com/venues/1/M-A-Chidambaram-Stadium" alt="" />
                        <p>{v.name}</p>
                        <p>{v.city}</p>
                        <p>Home Ground: {teams[v.venueId-1].name}</p>
                    </div>))}
            </div >
        </>
    );
}
export default Venues;