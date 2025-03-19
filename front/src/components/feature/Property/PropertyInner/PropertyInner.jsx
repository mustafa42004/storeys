import { useState } from "react";
import Footer from "../../../shared/Footer/Footer";
import FormSection from "../../../shared/Form/FormSection";
import Header from "../../../shared/Header/Header";
import Testimonial from "../../../shared/Testimonial/Testimonial";
import Banner from "./Helpers/Banner";
import DetailCard from "./Helpers/DetailCard";
import PropertyContent from "./Helpers/PropertyContent";
import InfoSection from "./Helpers/InfoSection";
import Amenities from "../../../shared/Amenities/Amenities";
import { useScrollToTop } from "../../../../utils/scrollHook";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import propertiesService from "../../../../services/properties.service";

const PropertyInner = () => {
  const { id } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["single-property", id],
    queryFn: propertiesService.getPropertyById,
  });

  const [headerHeight, setHeaderHeight] = useState(0);
  useScrollToTop();

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-dark" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <p className="fs-3 text-dark">
          {error?.message || "Something went wrong"}
        </p>
      </div>
    );
  }

  return (
    <>
      <Header height={setHeaderHeight} />
      <Banner banner={data?.data?.image} marginTop={headerHeight} />
      <DetailCard data={data?.data} />
      <Amenities amenities={data?.data?.amenities} />
      <PropertyContent top={headerHeight} />
      <InfoSection
        propertyInfo={data?.data?.propertyInfo}
        buildingInfo={data?.data?.buildingInfo}
      />
      <Testimonial />
      <FormSection />
      <Footer />
    </>
  );
};

export default PropertyInner;
