import Heading from "../Headings/Heading"
import Filters from "./Filters"

const Banner = ({title, description, isFilter, bg, width, height, marginTop}) => {

  return (
    <>
        <section className="main-banner" style={{marginTop: `${marginTop}px` || "0px"}}>
            <div className="banner" style={{backgroundImage: `url(${bg})`, width: `${width}%` || "100%", height: `${height}px` || "280px"}}>
                <Heading title={title} className="light w-100"  description={description} descriptionClassName="light" />
                {isFilter && <Filters />}
            </div>
        </section>
    </>
  )
} 

export default Banner


