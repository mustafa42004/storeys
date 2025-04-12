// File: src/components/ServiceInner.jsx (adjust path as per your structure)

import { useParams } from "react-router-dom";
import {
  buyproperty,
  holidayhome,
  commercial,
  sellproperty,
  rentproperty,
} from "../../../utils/static/ourServices"; // Adjust path if needed
import { serviceInnerBanner } from "../../../utils/static/bannerData";
import Banner from "../../shared/Banner/Banner";
import Header from "../../shared/Header/Header";
import Footer from "../../shared/Footer/Footer";
import { useState } from "react";
import ImageAbsolute from "../../shared/ImageAbsolute/ImageAbsolute";
import ChooseUs from "../../shared/ChooseUs/ChooseUs";
import TwoSidedSection from "../../shared/TwoSided/TwoSidedSection";
import FixedBg from "../../shared/FixedBg/FixedBg";
import PointComp from "./Helpers/PointComp";
import FixedBgComp from "./Helpers/FixedBgComp";
import { useScrollToTop } from "../../../utils/scrollHook";

const ServiceInner = () => {
  const [headerHeight, setHeaderHeight] = useState(0);
  const { id } = useParams(); // Get the slug from the URL (e.g., "commercial", "holiday-homes", "buy-property")

  // Object of all available services
  const services = {
    buyproperty,
    holidayhome,
    commercial,
    sellproperty,
    rentproperty,
  };

  // Normalize the id to match object keys (e.g., "holiday-homes" → "holidayhome", "buy-property" → "buyproperty")
  const normalizedId = id
    ? id.replace(/-/g, "").toLowerCase() // Remove all hyphens and convert to lowercase
    : "holidayhome";

  // Log for debugging
  console.log("Raw id:", id);
  console.log("Normalized id:", normalizedId);

  // Determine which data to use based on the normalized id
  const serviceData = services[normalizedId] || holidayhome; // Fallback to holidayhome if id doesn't match

  const { frameData, boxData, imagedData, pointData, fixedBgData } =
    serviceData;
  const { bg, width, height } = serviceInnerBanner;

  useScrollToTop();

  return (
    <>
      <Header height={setHeaderHeight} />
      <Banner
        title={serviceData?.bannerTitle}
        bg={bg}
        width={width}
        height={height}
        marginTop={headerHeight}
      />
      <TwoSidedSection
        header={frameData?.title}
        description={frameData?.paragraphs?.join(" ")}
        image={frameData?.image}
      />
      <ChooseUs
        data={boxData?.data}
        header={boxData?.header}
        description={boxData?.description}
        showNumber={true}
      />
      <ImageAbsolute
        header={imagedData?.header}
        width={imagedData?.width}
        data={imagedData?.data}
      />
      <TwoSidedSection
        image={"/assets/img/service-point-img.svg"}
        Component={<PointComp data={pointData?.data} />}
      />
      <FixedBg
        height={380}
        Component={
          <FixedBgComp
            title={fixedBgData.title}
            description={fixedBgData.description}
            buttonText={fixedBgData.buttonText}
          />
        }
      />
      <Footer />
    </>
  );
};

export default ServiceInner;
