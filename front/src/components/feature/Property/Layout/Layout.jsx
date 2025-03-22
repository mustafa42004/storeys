import Heading from "../../../shared/Headings/Heading";
import { useEffect, useState } from "react";
import PropertyCard from "./Helpers/PropertyCard";
import { useQuery } from "@tanstack/react-query";
import propertiesService from "../../../../services/properties.service";
import { useSearchParams } from "react-router-dom";

const Layout = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeButton, setActiveButton] = useState("sell");
  const [currentPage, setCurrentPage] = useState(1);
  const [allProperties, setAllProperties] = useState([]);

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

    setActiveButton(searchParams.get("status") || "sell");
    // Reset properties and page when search params change
    setAllProperties([]);
    setCurrentPage(1);
  }, [searchParams]);

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: [
      "properties",
      {
        city: formData.location,
        bedrooms: parseInt(formData.bedrooms),
        type: formData.type,
        "price[gte]": formData.minPrice,
        "price[lte]": formData.maxPrice,
        status: activeButton,
        page: currentPage,
      },
      activeButton,
    ],
    queryFn: propertiesService.getProperties,
    select: (data) => data?.data,
  });

  useEffect(() => {
    if (data?.docs && !isLoading) {
      if (currentPage === 1) {
        setAllProperties(data.docs);
      } else {
        setAllProperties((prev) => [...prev, ...data.docs]);
      }
    }
  }, [data, isLoading, currentPage]);

  const handleLoadMore = () => {
    if (data?.hasNextPage) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (currentPage > 1) {
      refetch();
    }
  }, [currentPage, refetch]);

  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("status", activeButton);
    setSearchParams(newSearchParams);
  }, [activeButton]);

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
                  onClick={() => {
                    setActiveButton("sell");
                    setCurrentPage(1);
                    setAllProperties([]);
                  }}
                >
                  For Sell
                </button>
                <button
                  className={`cs-btn  ${
                    activeButton === "rent" ? "" : "outline hover"
                  }`}
                  onClick={() => {
                    setActiveButton("rent");
                    setCurrentPage(1);
                    setAllProperties([]);
                  }}
                >
                  For Rent
                </button>
              </div>

              {isLoading && currentPage === 1 && (
                <p className="text-center">Loading...</p>
              )}
              {isError && (
                <p className="text-center">
                  {error?.message ||
                    "Properties not loaded. Something went wrong"}
                </p>
              )}

              <div className="card-layout">
                {allProperties?.length > 0 &&
                  allProperties.map((property, index) => (
                    <PropertyCard
                      key={property._id}
                      property={property}
                      index={index}
                    />
                  ))}
              </div>

              {isLoading && currentPage > 1 && (
                <div className="text-center mt-4">
                  <p>Loading more properties...</p>
                </div>
              )}

              {data?.hasNextPage && (
                <div className="w-100 mt-5 flex-cs">
                  <button
                    className="cs-btn"
                    onClick={handleLoadMore}
                    disabled={!data?.hasNextPage || isLoading}
                  >
                    {data?.hasNextPage ? (
                      <>
                        Explore More{" "}
                        <i className="fa-regular fa-arrow-right"></i>
                      </>
                    ) : (
                      "You have got all the properties"
                    )}
                  </button>
                </div>
              )}

              {!allProperties?.length && (
                <p className="text-center">No properties Found</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Layout;
