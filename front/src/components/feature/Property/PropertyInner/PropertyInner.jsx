import { useState } from "react"
import Footer from "../../../shared/Footer/Footer"
import FormSection from "../../../shared/Form/FormSection"
import Header from "../../../shared/Header/Header"
import Testimonial from "../../../shared/Testimonial/Testimonial"
import Banner from "./Helpers/Banner"
import DetailCard from "./Helpers/DetailCard"
import PropertyContent from "./Helpers/PropertyContent"
import InfoSection from "./Helpers/InfoSection"
import Amenities from "../../../shared/Amenities/Amenities"
import { useScrollToTop } from "../../../../utils/scrollHook"
const PropertyInner = () => {

    const banner = [
        {
            uniqueid: 1,
            s3Url: "/assets/img/property-inner-banner-1.svg",
            s3Key: "property-inner-banner-1",
        },
        {
            uniqueid: 2,
            s3Url: "/assets/img/property-inner-banner-2.svg",
            s3Key: "property-inner-banner-2",
        },
        {
            uniqueid: 3,
            s3Url: "/assets/img/property-inner-banner-3.svg",
            s3Key: "property-inner-banner-3",
        },
        {
            uniqueid: 4,
            s3Url: "/assets/img/property-inner-banner-4.svg",
            s3Key: "property-inner-banner-4",
        },
        {
            uniqueid: 5,
            s3Url: "/assets/img/property-inner-banner-5.svg",
            s3Key: "property-inner-banner-5",
        },
        {
            uniqueid: 6,
            s3Url: "/assets/img/property-inner-banner-1.svg",
            s3Key: "property-inner-banner-1",
        },
        {
            uniqueid: 7,
            s3Url: "/assets/img/property-inner-banner-2.svg",
            s3Key: "property-inner-banner-2",
        },
        {
            uniqueid: 7,
            s3Url: "/assets/img/property-inner-banner-3.svg",
            s3Key: "property-inner-banner-3",
        },
        {
            uniqueid: 7,
            s3Url: "/assets/img/property-inner-banner-4.svg",
            s3Key: "property-inner-banner-4",
        }
    ]

    const [headerHeight, setHeaderHeight] = useState(0)
    useScrollToTop()
  return (
    <> 
        <Header height={setHeaderHeight} />
        <Banner banner={banner} marginTop={headerHeight} />
        <DetailCard />
        <PropertyContent top={headerHeight} />
        <InfoSection />
        <Amenities />
        <Testimonial />
        <FormSection />
        <Footer />
    </>
  )
}

export default PropertyInner