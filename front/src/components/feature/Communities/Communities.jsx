import Header from "../../shared/Header/Header"
import Footer from "../../shared/Footer/Footer"
import Banner from "../../shared/Banner/Banner"
import { communitiesBanner } from "../../../utils/static/bannerData"
import { useState } from "react"
import CommunityCards from "./Helpers/CommunityCards"
import { useScrollToTop } from "../../../utils/scrollHook"
const Communities = () => {

    const [headerHeight, setHeaderHeight] = useState(0)
    useScrollToTop()
  return (
    <> 
        <Header height={setHeaderHeight} />
        <Banner title={communitiesBanner.title} bg={communitiesBanner.bg} width={communitiesBanner.width} height={communitiesBanner.height} marginTop={headerHeight} />
        <CommunityCards />
        <Footer />
    </>
  )
}

export default Communities