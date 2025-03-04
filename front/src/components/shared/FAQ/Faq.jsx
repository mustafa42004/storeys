import Banner from "./Helpers/Banner"
import Heading from "../Headings/Heading"

const Faq = ({Component}) => {
  return (
    <>
        <section className="faq-section pt-cs">
            <div className="container">
                <div className="row align-items-start">
                    <div className="col-md-12 pb-5">
                        <Heading title="Career FAQs" className="fs-50" />
                    </div>
                    <div className="col-md-6">
                        <Component />
                    </div>
                    <div className="col-md-6">
                        <Banner />
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default Faq