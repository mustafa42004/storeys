const Center = ({ baths = 1, beds = 1, sqft = 1240 }) => {
  return (
    <>
      <div className="center ">
        <div className="item divide ">
          <div>
            <h4 className="font-sm text-left dark medium fs-16">
              {beds} &nbsp;{" "}
              <img src="/assets/img/bed.svg" alt="" className="icon" />
            </h4>
          </div>
          <h4 className="font-sm text-left dark medium fs-16">Bedrooms</h4>
        </div>
        <div className="item divide">
          <div>
            <h4 className="font-sm text-left dark medium fs-16">
              {baths} &nbsp;{" "}
              <img src="/assets/img/bathroom.svg" alt="" className="icon" />
            </h4>
          </div>
          <h4 className="font-sm text-left dark medium fs-16">Bathrooms</h4>
        </div>
        <div className="item">
          <div className="d-flex">
            <h4 className="font-sm text-left dark medium fs-16">
              {sqft} m<sup>2</sup> Sq.Ft
            </h4>
            <img src="/assets/img/sqft.svg" alt="" className="icon" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Center;
