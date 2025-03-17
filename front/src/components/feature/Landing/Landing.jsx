import Header from "../../shared/Header/Header";
import Banner from "../../shared/Banner/Banner";
import DevSection from "./Developers/DevSection";
import About from "../../shared/About/About";
import AboutComp from "./Helpers/AboutComp";
import Properties from "./Properties/Properties";
import FixedBg from "../../shared/FixedBg/FixedBg";
import PopularAreas from "./Popular/PopularAreas";
import Frame from "../../shared/Frame/Frame";
import Testimonial from "../../shared/Testimonial/Testimonial";
import FormSection from "../../shared/Form/FormSection";
import Footer from "../../shared/Footer/Footer";
import { homeBanner } from "../../../utils/static/bannerData";
import { homeFrame } from "../../../utils/static/frameData";
import FixedBgComp from "./Helpers/FixedBgComp";
import { useScrollToTop } from "../../../utils/scrollHook";

const Landing = () => {
  const { title, description, isFilter, bg, width, height } = homeBanner;

  useScrollToTop();

  return (
    <>
      <Header />
      <Banner
        title={title}
        description={description}
        isFilter={isFilter}
        bg={bg}
        width={width}
        height={height}
      />
      <DevSection />
      <About Component={AboutComp} />
      <Properties />
      <FixedBg height={290} Component={<FixedBgComp />} />
      <PopularAreas />
      <Frame frame={homeFrame} />
      <Testimonial />
      <FormSection />
      <Footer />
    </>
  );
};

export default Landing;
