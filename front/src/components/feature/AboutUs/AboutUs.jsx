import Banner from "../../shared/Banner/Banner"
import Footer from "../../shared/Footer/Footer"
import Header from "../../shared/Header/Header"
import { aboutBanner } from "../../../utils/static/bannerData"
import { useEffect, useState } from "react"
import { aboutFrame } from "../../../utils/static/frameData"
import Frame from "../../shared/Frame/Frame"
import FixedBg from "../../shared/FixedBg/FixedBg"
import FixedBgComp from "./Helpers/FixedBgComp"
// import Awards from "../../shared/Awards/Awards"
// import { aboutAwards } from "../../../utils/static/awardsData"
import TwoSidedSection from "../../shared/TwoSided/TwoSidedSection"
import WhoWeAre from "./Helpers/WhoWeAre"
import VisionComp from "./Helpers/VisionComp"
import ChooseUs from "../../shared/ChooseUs/ChooseUs"
import { useScrollToTop } from "../../../utils/scrollHook"

const AboutUs = () => {

  const [headerHeight, setHeaderHeight] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  const data = [
    {
      header: null,
      description: "Proven track record of high-value transactions and successful investments,"
    },
    {
      header: null,
      description: " A 360° real estate service—from finding your dream home to financing, designing, and managing your property"
    },
    {
      header: null,
      description: " A team that puts your goals first, ensuring a seamless and rewarding property journey."
    },
    {
      header: null,
      description: "At Storeys Real Estate, we don’t just sell properties—we build success stories. Let us help you turn your real estate aspirations into reality."
    }
  ]

  useEffect(()=>{
    window.innerWidth > 767 ? setIsMobile(false) : setIsMobile(true)
  },[])

  const object = {...aboutFrame, imageHeight : window.innerWidth > 767 ? aboutFrame.imageHeight : 'auto'}

  useScrollToTop()

  return (
    <>
        <Header height={setHeaderHeight} />

        <Banner title={aboutBanner.title} bg={aboutBanner.bg} width={aboutBanner.width} height={aboutBanner.height} marginTop={headerHeight} />

        <Frame frame={object} />

        <TwoSidedSection header={"About Storeys"} description={"At Storeys Real Estate, we are more than just a real estate firm—we are a team of passionate professionals dedicated to shaping the future of property investment and homeownership in the UAE. We redefine the real estate experience by offering a seamless blend of expertise, innovation, and personalized service. With an annual Gross Transaction Value (GTV) of more than 2 Billion AED, we have built a reputation for delivering exceptional real estate solutions that go beyond buying and selling."} image={"/assets/img/storey-banner.svg"} className="revert" height={434} />

        <WhoWeAre />

        <TwoSidedSection image={"/assets/img/vision-values.svg"} height={isMobile ? 600: 'auto'} Component={<VisionComp />} />

        <TwoSidedSection header={"Leadership & Expertise"} description={"Behind Storeys Real Estate is a team of industry veterans and market specialists who bring years of experience, deep local knowledge, and a forward-thinking approach to real estate. Our leadership is committed to staying ahead of market trends, utilizing cutting-edge technology and data-driven insights to empower our clients."} image={"/assets/img/custom-banner.svg"} />

        <ChooseUs data={data} header={"Why Choose Us"} showNumber={false} />

        <FixedBg  height={isMobile ? 900 : 600} Component={<FixedBgComp />} />

        <Footer />
    </>
  )
}

export default AboutUs