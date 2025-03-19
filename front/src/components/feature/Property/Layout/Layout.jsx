import Heading from "../../../shared/Headings/Heading";
import { useEffect, useState } from "react";
import PropertyCard from "./Helpers/PropertyCard";
import { propertyData } from "../../../../utils/static/propertyData";
import { useQuery } from "@tanstack/react-query";
import propertiesService from "../../../../services/properties.service";
import { useSearchParams } from "react-router-dom";

const Layout = () => {
  const [activeButton, setActiveButton] = useState("sell");
  const [searchParams] = useSearchParams();

  const [formData, setFormData] = useState({
    location: "",
    bedrooms: "",
    type: "",
    minPrice: "",
    maxPrice: "",
  });

  useEffect(() => {
    setFormData({
      location: searchParams.get("location") || "",
      bedrooms: searchParams.get("bedrooms") || "",
      type: searchParams.get("type") || "",
      minPrice: searchParams.get("minPrice") || "",
      maxPrice: searchParams.get("maxPrice") || "",
    });
  }, [searchParams]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [
      "properties",
      {
        location: formData.location,
        bedrooms: parseInt(formData.bedrooms),
        type: formData.type,
        "price[gte]": formData.minPrice,
        "price[lte]": formData.maxPrice,
      },
    ],
    queryFn: propertiesService.getProperties,
    select: (data) => data?.data,
  });

  return (
    <>
      <section className="property-layout pt-60">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Heading
                title={
                  formData?.location
                    ? `Residence in ${formData?.location}`
                    : "Available Properties"
                }
                className={"fs-50"}
                width={60}
              />
              <div className="category flex-cs py-5 ">
                <button
                  className={`cs-btn ${
                    activeButton === "sell" ? "" : "outline hover"
                  }`}
                  onClick={() => setActiveButton("sell")}
                >
                  For Sell
                </button>
                <button
                  className={`cs-btn  ${
                    activeButton === "rent" ? "" : "outline hover"
                  }`}
                  onClick={() => setActiveButton("rent")}
                >
                  For Rent
                </button>
              </div>

              {isLoading && <p className="text-center ">Loading...</p>}
              {isError && (
                <p className="text-center">
                  {error?.message ||
                    "Propeties not loaded. Something went wrong"}
                </p>
              )}

              <div className="card-layout">
                {data?.docs?.length &&
                  data?.docs.map((property, index) => (
                    <PropertyCard
                      key={property._id}
                      property={property}
                      index={index}
                    />
                  ))}
              </div>
              <div className="w-100 mt-5 flex-cs">
                <button className="cs-btn">
                  Explore More <i className="fa-regular fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Layout;
