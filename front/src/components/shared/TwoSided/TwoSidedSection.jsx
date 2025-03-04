import Heading from "../Headings/Heading"

const TwoSidedSection = ({ header, description, image, className, height, Component }) => {
    // console.log(height);
  return (
    <>
        <section className={`two-sided-section pt-cs`}>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className={`layout ${className}`}>
                            <div className="banner ">
                                <img src={image} style={{height: `${height}px` || "100%"}} alt="services-banner" />
                            </div>
                            {
                                Component ? Component : (
                                    <div className="content">
                                        <Heading title={header} className={` text-left`}/>
                                        <p className="font-sm medium text-left fs-22">
                                            {description}
                                        </p>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default TwoSidedSection