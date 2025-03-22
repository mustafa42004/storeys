import Heading from "../../../shared/Headings/Heading";
import { useEffect, useState, useRef } from "react";
import PropertyCard from "./Helpers/PropertyCard";
import { useQuery } from "@tanstack/react-query";
import propertiesService from "../../../../services/properties.service";
import { useSearchParams } from "react-router-dom";

const Layout = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeButton, setActiveButton] = useState("sell");
  const [currentPage, setCurrentPage] = useState(1);
  const [allProperties, setAllProperties] = useState([]);
  const isButtonChangeRef = useRef(false);

  const [formData, setFormData] = useState({
    location: "",
    bedrooms: "",
    type: "",
    minPrice: "",
    maxPrice: "",
  });

  // Handle search params changes
  useEffect(() => {
    const status = searchParams.get("status") || "sell";

    setFormData({
      location: searchParams.get("location") || "",
      bedrooms: searchParams.get("bedrooms") || "",
      type: searchParams.get("type") || "",
      minPrice: searchParams.get("minPrice") || "",
      maxPrice: searchParams.get("maxPrice") || "",
    });

    // Only reset if the status actually changed
    if (status !== activeButton) {
      console.log(`Status changed from URL: ${activeButton} -> ${status}`);
      setActiveButton(status);
      setCurrentPage(1);
      setAllProperties([]);
    }
  }, [searchParams]);

  // Query for properties
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: [
      "properties",
      {
        limit: 9,
        city: formData.location,
        bedrooms: parseInt(formData.bedrooms),
        type: formData.type,
        "price[gte]": formData.minPrice,
        "price[lte]": formData.maxPrice,
        status: activeButton,
        page: currentPage,
      },
    ],
    queryFn: propertiesService.getProperties,
    select: (data) => data?.data,
    refetchOnWindowFocus: false,
    enabled: true, // Always enabled
  });

  // Update properties when data changes
  useEffect(() => {
    if (data?.docs && !isLoading) {
      console.log(
        `Setting properties for ${activeButton}, page ${currentPage}:`,
        data.docs
      );

      if (currentPage === 1) {
        setAllProperties([...data.docs]);
      } else {
        setAllProperties((prev) => [...prev, ...data.docs]);
      }
    }
  }, [data, isLoading, currentPage]);

  // Handle load more button
  const handleLoadMore = () => {
    if (data?.hasNextPage) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  // Refetch when page changes
  useEffect(() => {
    if (currentPage > 1) {
      refetch();
    }
  }, [currentPage, refetch]);

  // Update URL when active button changes
  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("status", activeButton);
    setSearchParams(newSearchParams);

    // Force a refetch when active button changes
    refetch();
  }, [activeButton, setSearchParams, searchParams, refetch]);

  // Handle button click
  const handleButtonClick = (status) => {
    if (status !== activeButton) {
      console.log(`Button clicked: ${activeButton} -> ${status}`);
      isButtonChangeRef.current = true;
      setActiveButton(status);
      setCurrentPage(1);
      // We'll clear properties after the activeButton state is updated
      setAllProperties([]);
    }
  };

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
                  onClick={() => handleButtonClick("sell")}
                >
                  For Sell
                </button>
                <button
                  className={`cs-btn  ${
                    activeButton === "rent" ? "" : "outline hover"
                  }`}
                  onClick={() => handleButtonClick("rent")}
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
                    <>
                      Explore More <i className="fa-regular fa-arrow-right"></i>
                    </>
                  </button>
                </div>
              )}

              {!isLoading && !allProperties?.length && (
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
