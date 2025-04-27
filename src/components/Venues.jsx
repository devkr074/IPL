import { useState, useEffect } from 'react';
function Venues() {
    const [teams, setTeams] = useState();
    const [venues, setVenues] = useState();
    useEffect(() => {
        document.title = "IPL - Venues";
        const teams = JSON.parse(localStorage.getItem("teams"));
        const venues = JSON.parse(localStorage.getItem("venues"));
        setTeams(teams);
        setVenues(venues);
    }, []);
    return (
        <>
            <div>
                <p>IPL - Venues</p>
            </div>
            <div>
                {venues && venues.map((v) => (
                    <div key={v.venueId}>
                        <img src={v.image} alt={v.name} title={v.name} />
                        <img src={teams[v.venueId - 1].logo} alt={teams[v.venueId - 1].name} />
                        <p>{v.name}</p>
                        <p>{v.city}</p>
                    </div>))}
            </div >
        </>
    );
}
export default Venues;