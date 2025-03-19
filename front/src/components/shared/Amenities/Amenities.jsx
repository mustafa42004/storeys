import { useState } from "react";
import Heading from "../Headings/Heading";

const Amenities = ({ amenities }) => {
  const [showAll, setShowAll] = useState(false);

  const displayedAmenities = showAll ? amenities : amenities?.slice(0, 10);

  return (
    <>
      <section className="pt-cs amenities">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Heading
                title="Features & Amenities"
                width={70}
                className={"fs-50"}
              />
              <div className="layout">
                {displayedAmenities?.map((amenity, index) => (
                  <div className="item" key={index}>
                    <div className="icon">
                      <img
                        className="icon"
                        src="/assets/img/features-icon.svg"
                        alt="icon"
                      />
                    </div>
                    <div className="content">
                      <h4 className="font-sm medium dark fs-16">
                        {amenity?.name}
                      </h4>
                    </div>
                  </div>
                ))}
                {amenities?.length > 10 && (
                  <button onClick={() => setShowAll(!showAll)} className="btn ">
                    {showAll ? "Show Less" : `+ ${amenities?.length - 9} More`}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Amenities;
