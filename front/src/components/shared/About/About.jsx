import Banner from "./Banner"

const About = ({Component}) => {
  return (
    <>
        <section className="about-section pt-cs">
            <div className="container">
                <div className="row">
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

export default About