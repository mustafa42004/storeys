import Heading from "../../../shared/Headings/Heading"
import Cards from "./Cards"

const PopularAreas = () => {

    const cards = [
        {
            title: "Popular Areas",
            description: "Ideal island backed with beautiful beaches overlooking stunning views of Skyline.",
            image: "/assets/img/area-1.svg"
        },
        {
            title: "Downtown Dubai",
            description: "Modern urban district featuring iconic landmarks and luxury residential towers.",
            image: "/assets/img/area-1.svg"
        },
        {
            title: "Palm Jumeirah",
            description: "Man-made island paradise with luxury resorts and exclusive waterfront properties.",
            image: "/assets/img/area-1.svg"
        },
        {
            title: "Dubai Marina",
            description: "Stunning waterfront community with high-rise apartments and yacht-lined marina.",
            image: "/assets/img/area-1.svg"
        }
    ]

  return (
    <>
        <section className="popular-areas pt-cs">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <p className="font-sm mb-4 fs-20 medium">Popular Areas</p>
                        <Heading title="Explore Dubai" className="fs-50" />

                        <div className="layout">
                            {
                                cards?.map((card, index) => (
                                    <Cards key={index} title={card.title} description={card.description} image={card.image} />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default PopularAreas