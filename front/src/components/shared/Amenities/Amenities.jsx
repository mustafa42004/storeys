import React, { useState } from "react";
import Heading from "../Headings/Heading"

const Amenities = () => {
    const allAmenities = [
        "Swimming Pool",
        "Golf Course Area",
        "Tennis Court",
        "Basketball Court",
        "Playground",
        "BBQ Area",
        "Clubhouse",
        "Parking",
        "24/7 Security",
        "Wi-Fi",
        "Laundry Facilities",
        "Pet Park",
        "Business Center",
        "Game Room",
        "Movie Theater",
        "Yoga Studio",
        "Rooftop Deck",
        "Fire Pit",
        "Walking Trails",
        "Fishing Pond",
        "Picnic Area",
        "Community Garden",
        "Event Space",
        "Storage Units",
        "Bicycle Storage",
        "Electric Vehicle Charging",
        "On-Site Maintenance",
        "Concierge Service",
        "Valet Parking",
    ];

    const [showAll, setShowAll] = useState(false);

    const displayedAmenities = showAll ? allAmenities : allAmenities.slice(0, 10);

    return (
        <> 
            <section className="pt-cs amenities">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <Heading title="Features & Amenities" width={70} className={"fs-50"} />
                            <div className="layout">
                                {displayedAmenities.map((amenity, index) => (
                                    <div className="item" key={index}>
                                        <div className="icon">
                                            <img className="icon" src="/assets/img/features-icon.svg" alt="icon" />
                                        </div>
                                        <div className="content">
                                            <h4 className="font-sm medium dark fs-16">{amenity}</h4>
                                        </div>
                                    </div>
                                ))}
                            <button onClick={() => setShowAll(!showAll)} className="btn "> 
                                {showAll ? "Show Less" : `+ ${allAmenities.length - 9} More`} 
                            </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Amenities