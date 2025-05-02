import { useState, useEffect } from "react";
function Venues() {
    const [status, setStatus] = useState();
    const [venues, setVenues] = useState();
    useEffect(() => {
        document.title = "IPL - Venues";
        setStatus(localStorage.getItem("status"));
        setVenues(JSON.parse(localStorage.getItem("venues")));
    }, []);
    return (
        <>
            <div className="row border-bottom border-2 sticky-top">
                <p className="col-12 fs-5 fw-bold text-light text-center bg-green p-2 m-0">IPL - Venues</p>
            </div>
            {(status) ?
                <div className="row">
                    {(venues) && venues.map((v) => (
                        <div key={v.venueId} className="col-6 col-md-4 col-lg-4 p-0 p-1">
                            <div className="card">
                                <img src={v.image} alt={v.name} title={v.name} className="card-img-top img-8" />
                                <div className="card-body border-top border-2 py-2">
                                    <p className="card-title fw-semibold text-truncate m-0">{v.name}</p>
                                    <p className="m-0">{v.city}</p>
                                </div>
                            </div>
                        </div>))}
                </div> : <div role="alert" className="alert fs-7 fw-semibold text-light bg-danger my-2">No Team Selected! Please Select a Team.</div>}
        </>
    );
}
export default Venues;