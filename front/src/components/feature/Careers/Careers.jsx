import { useEffect, useState } from "react"
import Banner from "../../shared/Banner/Banner"
import Footer from "../../shared/Footer/Footer"
import Header from "../../shared/Header/Header"
import { careersBanner } from "../../../utils/static/bannerData"
import Frame from "../../shared/Frame/Frame"
import { careersFrame } from "../../../utils/static/frameData"
import FixedBgComp from "./Helpers/FixedBgComp"
import FixedBg from "../../shared/FixedBg/FixedBg"
import Testimonial from "../../shared/OurTeamTestimonial/Testimonial"
import Faq from "../../shared/FAQ/Faq"
import FaqComp from "./Helpers/FaqComp"
import { useScrollToTop } from "../../../utils/scrollHook"

const Careers = () => {

  const [headerHeight, setHeaderHeight] = useState(0)
  const [isMobile , setIsMobile]= useState(false)

  useEffect(() => {
    window.innerWidth > 767 ? setIsMobile(false) : setIsMobile(true)
  }, [])

  useScrollToTop()

  return (
    <>
        <Header height={setHeaderHeight} />
        <Banner title={careersBanner.title} bg={careersBanner.bg} width={careersBanner.width} height={careersBanner.height} marginTop={headerHeight}/>
        <Frame frame={careersFrame} />
        <FixedBg height={`${isMobile ? 900 : 590}`} Component={<FixedBgComp />} />
        <Testimonial />
        <Faq Component={FaqComp} />
        <Footer />
    </>
  )
}

export default Careers