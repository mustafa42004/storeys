import { useEffect, useState } from "react";

const DetailCard = ({ data }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    window.innerWidth > 767 ? setIsMobile(false) : setIsMobile(true);
  }, []);

  return (
    <>
      <div className="container pt-cs">
        <div className="row">
          <div className="col-md-12">
            <div className="property-inner-card ">
              <div className="head divide">
                <div className="item ">
                  <h4
                    className={`${
                      isMobile ? "fs-26 text-left" : "font-sm fs-50"
                    }`}
                  >
                    {data?.name}
                  </h4>
                  <p
                    className={`${
                      isMobile ? "fs-14 text-left" : "font-sm text-left fs-20"
                    }`}
                  >
                    {data?.location}
                  </p>
                </div>
                <h4
                  className={`${
                    isMobile ? "font-lg medium fs-30" : "font-lg medium fs-50"
                  }`}
                >
                  {new Intl.NumberFormat("en-AE", {
                    style: "currency",
                    currency: "AED",
                    maximumFractionDigits: 0,
                    currencyDisplay: "code",
                  })
                    ?.format(Number(data?.price))
                    ?.replace("AED", "")
                    ?.trim() + " AED"}{" "}
                </h4>
              </div>
              <div className="bottom">
                <div className="item">
                  <h4
                    className={`${
                      isMobile
                        ? "font-sm text-left fs-20 dark"
                        : "font-sm text-left fs-22 dark"
                    }`}
                  >
                    {data?.type}
                  </h4>
                  <p
                    className={`${
                      isMobile
                        ? "font-sm text-left fs-12"
                        : "font-sm text-left fs-14"
                    }`}
                  >
                    Property Type
                  </p>
                </div>
                <div className="icons">
                  <h4 className="font-sm text-left dark medium ">
                    {data?.bedrooms} &nbsp;{" "}
                    <img src="/assets/img/bed.svg" alt="" className="icon" />
                  </h4>
                  <h4 className="font-sm text-left dark medium ">
                    {data?.bathrooms} &nbsp;{" "}
                    <img
                      src="/assets/img/bathroom.svg"
                      alt=""
                      className="icon"
                    />
                  </h4>
                  <h4 className="font-sm text-left dark medium ">
                    {data?.sqft} m<sup>2</sup> &nbsp;{" "}
                    <img src="/assets/img/sqft.svg" alt="" className="icon" />
                  </h4>
                  <h4 className="font-sm text-left dark medium ">
                    {data?.parking} &nbsp;{" "}
                    <img src="/assets/img/car.svg" alt="" className="icon" />
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailCard;
