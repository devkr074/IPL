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
            <div className="row p-0 sticky-top bg-green">
                <p className="col-12 text-light fs-5 fw-bolder m-0 sticky-top p-2 text-center">IPL - Venues</p>
            </div>
            <div className='row'>
                {venues && venues.map((v) => (
                    <div className='col-6 col-md-4 col-lg-4 p-0 p-1'>
                        <div className='card overflow-hidden m-0 p-0' key={v.venueId}>
                            <img className='card-img-top' style={{ height: "10rem" }} src={v.image} alt={v.name} title={v.name} />
                            <div className="card-body border-top border-2">
                                <img className='position-absolute top-0 start-0 bg-body-tertiary p-1' height={50} src={teams[v.venueId - 1].logo} alt={teams[v.venueId - 1].name} />
                                <p className='text-truncate m-0 py-1 fw-semibold'>{v.name}</p>
                                <p className='m-0'>{v.city}</p>
                            </div>
                        </div>
                    </div>))}
            </div >
        </>
    );
}
export default Venues;