import { serviceInnerBanner } from "../../../utils/static/bannerData"
import Banner from "../../shared/Banner/Banner"
import Header from "../../shared/Header/Header"
import Footer from "../../shared/Footer/Footer"
import { useState } from "react";
import Frame from "../../shared/Frame/Frame";
import ImageAbsolute from "../../shared/ImageAbsolute/ImageAbsolute";
import ChooseUs from "../../shared/ChooseUs/ChooseUs";
import TwoSidedSection from "../../shared/TwoSided/TwoSidedSection";
import FixedBg from "../../shared/FixedBg/FixedBg";
import { holidayHome } from "../../../utils/static/ourServices"
import PointComp from "./Helpers/PointComp";
import FixedBgComp from "./Helpers/FixedBgComp";
import { useScrollToTop } from "../../../utils/scrollHook"
const ServiceInner = () => {

    const [headerHeight, setHeaderHeight] = useState(0)

    const {frameData, boxData, imagedData, pointData, fixedBgData} = holidayHome

    const { bg, width, height } = serviceInnerBanner

    useScrollToTop()

  return (
    <> 
        <Header height={setHeaderHeight}/>
        <Banner title={holidayHome?.bannerTitle} bg={bg} width={width} height={height} marginTop={headerHeight}/>
        <Frame frame={frameData} />
        <ChooseUs data={boxData?.data} header={boxData?.header} description={boxData?.description} />
        <ImageAbsolute header={imagedData?.header} width={imagedData?.width} data={imagedData?.data} />
        <TwoSidedSection image={"/assets/img/service-point-img.svg"}  Component={<PointComp data={pointData?.data} />} />
        <FixedBg height={380} Component={<FixedBgComp title={fixedBgData.title} description={fixedBgData.description} buttonText={fixedBgData.buttonText} />} />
        <Footer />
    </>
  )
}

export default ServiceInner