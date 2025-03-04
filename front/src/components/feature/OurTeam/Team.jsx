import Footer from "../../shared/Footer/Footer"
import Header from "../../shared/Header/Header"
import { teamBanner } from "../../../utils/static/bannerData"
import Banner from "../../shared/Banner/Banner"
import { useState } from "react"
import Layout from "./Helpers/Layout"
import { useScrollToTop } from "../../../utils/scrollHook"
const Team = () => {

    const [headerHeight, setHeaderHeight] = useState(0)
    useScrollToTop()
  return (
    <> 
        <Header height={setHeaderHeight} />
        <Banner title={teamBanner.title} bg={teamBanner.bg} width={teamBanner.width} height={teamBanner.height} marginTop={headerHeight} />

        <Layout />
        <Footer />
    </>
  )
}

export default Team