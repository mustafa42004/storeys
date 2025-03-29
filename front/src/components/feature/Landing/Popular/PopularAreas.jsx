import Heading from "../../../shared/Headings/Heading";
import Cards from "./Cards";

const PopularAreas = () => {
  const cards = [
    {
      title: "Palm Jumeirah",
      description:
        "Ideal island backed with beautiful beaches overlooking stunning views of Skyline.",
      image: "/assets/img/area-1.png",
      postLink: "/news/67e8216d48de080d641f1888#",
    },
    {
      title: "Dubai Marina",
      description:
        "The city’s hub, Dubai Marina is a meticulously planned community of Dubai.",
      image: "/assets/img/area-2.png",
      postLink: "/news/67e8235e48de080d641f190a",
    },
    {
      title: "Dubai Hills Estates",
      description:
        "A lush 2700 acers suburban lifestyle with lush greenery. & cutting-edge features.",
      image: "/assets/img/area-3.png",
      postLink: "/news/67e8269a48de080d641f19f8",
    },
    {
      title: "Town Square",
      description:
        "Town square is divided into 13 sub-projects spread among 1.6 million square feet of land.",
      image: "/assets/img/area-4.png",
      postLink: "/news/67e8278348de080d641f1a91",
    },
  ];

  return (
    <>
      <section className="popular-areas pt-cs">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <p className="font-sm mb-sm-4 mb-3 fs-20 medium">Popular Areas</p>
              <Heading title="Explore Dubai" className="fs-42" />

              <div className="layout">
                {cards?.map((card, index) => (
                  <Cards
                    key={index}
                    title={card.title}
                    description={card.description}
                    image={card.image}
                    postLink={card.postLink}postL                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PopularAreas;
