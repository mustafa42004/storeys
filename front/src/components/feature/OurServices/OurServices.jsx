import Header from "../../shared/Header/Header"
import Footer from "../../shared/Footer/Footer"
import { ourServicesBanner } from "../../../utils/static/bannerData"
import Banner from "../../shared/Banner/Banner"
import { useState } from "react"
import TwoSidedSection from "../../shared/TwoSided/TwoSidedSection"
import ServicesCards from "./Helpers/ServicesCards"
import FixedBg from "../../shared/FixedBg/FixedBg"
import FixedBgComp from "./Helpers/FixedBgComp"
import { useScrollToTop } from "../../../utils/scrollHook"
const OurServices = () => {

    const [headerHeight, setHeaderHeight] = useState(0)
    const data = {
        header: "Tailored Real Estate Solutions Just for You",
        description: "At Storeys Real Estate, we provide a full spectrum of real estate services tailored to meet the diverse needs of our clients. Whether you're looking to buy, sell, rent, or invest, our expert team ensures a seamless and rewarding experience.",
        image: "/assets/img/custom-banner.svg"
      }

      const fixedBgData = {
        title: "Your Real Estate Journey",
        description: "At Storeys Real Estate, we take pride in offering end-to-end real estate solutions that cater to every aspect of property ownership and investment.",
        buttonText: "Let’s build your story together"
      }

      useScrollToTop()

  return (
    <>
        <Header height={setHeaderHeight} />
        <Banner title={ourServicesBanner.title} bg={ourServicesBanner.bg} width={ourServicesBanner.width} height={ourServicesBanner.height} marginTop={headerHeight}/>
        <TwoSidedSection header={data.header} description={data.description} image={data.image} />
        <ServicesCards />
        <FixedBg height={370} Component={<FixedBgComp title={fixedBgData.title} description={fixedBgData.description} buttonText={fixedBgData.buttonText} />} />
        <Footer />
    </>
  )
}

export default OurServices