import Heading from "../../../shared/Headings/Heading"

// Sample data structure for news items
const newsItems = [
    { id: 1, title: "When is the Best Time to Renovate After Purchasing a Property in Dubai", date: "2026-10-01", imgSrc: "/assets/img/news-banner-lg.svg", description: "Dubai's climate and cultural calendar play a major role. Summer months bring extreme heat, making renovations involving outdoor work especially challenging due to reduced outdoor work hours.. 1" },
    { id: 2, title: "Spot the Red Flags: Why Buying Property in Dubai is Like Dating", date: "2025-10-02", imgSrc: "/assets/img/news-banner-sm.svg", description: "Buying a property in Dubai is a lot like dating — there are plenty of fish in the sea, but some come with serious red flags! Just like in the dating world, if you spot any of these warning signs, it's time to swipe left:" },
    { id: 3, title: "Dubai, Jumeirah Village Circle", date: "2025-10-09", imgSrc: "/assets/img/news-banner-sm-2.svg", description: "Dubai’s skyline is often celebrated for its iconic structures and ambitious projects, and it’s easy to see why. What might sometimes be perceived as a “skyline of eyesores” is, in reality," },
    { id: 4, title: "Global Growth in Commercial Real Estate: Why Dubai is Leading the Way", date: "2025-09-30", imgSrc: "/assets/img/newsBanner-1.svg", description: "Commercial real estate is on the rise across the globe, but there's something special about Dubai that sets it apart. As the city continues to grow and innovate, it's becoming a true hotspot " },
    { id: 5, title: "Dubai's Luxury Real Estate Boom: What Buyers Need to Know", date: "2025-10-03", imgSrc: "/assets/img/newsBanner-2.svg", description: "As Dubai continues to evolve, its property market remains a beacon of investment opportunity, particularly in the realm of luxury real estate. From iconic skyscrapers to " },
    { id: 6, title: "Dubai Real Estate Investment Trends in 2024: Where to Invest?", date: "2025-10-04", imgSrc: "/assets/img/newsBanner-3.svg", description: "As we step into 2024, the Dubai real estate market continues to be a dynamic and enticing landscape for investors worldwide. With a robust economy, strategic location, and " },
    { id: 7, title: "Navigating the Dubai Real Estate Landscape", date: "2025-10-05", imgSrc: "/assets/img/newsBanner-4.svg", description: "Dubai's dynamic Real Estate market has long attracted investors seeking lucrative opportunities.  An increasingly prominent" },
    { id: 8, title: "Dubai's Top Residential Communities", date: "2025-10-06", imgSrc: "/assets/img/newsBanner-5.svg", description: "As the demand for premium living spaces continues to rise, Dubai offers a plethora of residential communities that are tailored for a " },
    { id: 9, title: "Luxury Apartments Vs Villas: Choosing the Riht", date: "2025-10-07", imgSrc: "/assets/img/newsBanner-6.svg", description: "Dubai, with its iconic skyline and luxurious lifestyle, has become a global hub for real estate investment. As potential homebuyers " },
];

const LatestNews = () => {
  // Sort news items by date and get the top 3 latest
  const sortedNews = newsItems.sort((a, b) => new Date(b.date) - new Date(a.date));
  const topNews = sortedNews.slice(0, 3);
  const remainingNews = sortedNews.slice(3);

  return (
    <>
        <section className="dubai-news pt-cs ">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <Heading title={"Latest News"} className={"fs-50"}/>

                        <div className="grid-cs gap-30 mt-5 align-items-center">
                            {topNews.length > 0 && (
                                <div className="cs-model-card">
                                    <div className="banner lg">
                                        <img src={topNews[0].imgSrc} alt="news-banner" />
                                    </div>
                                    <div className="content">
                                        <h4 className="font-sm font-atyp medium text-left">{topNews[0].title}</h4>
                                        <p className="font-sm text-left">{topNews[0].description}</p>
                                    </div>
                                </div>
                            )}
                            <div className="grid-cs gtc-1 gap-30">
                                {topNews.slice(1, 3).map(news => (
                                    <div key={news.id} className="cs-model-card revert">
                                        <div className="banner lg">
                                            <img src={news.imgSrc} alt="news-banner" />
                                        </div>
                                        <div className="content">
                                            <h4 className="font-sm font-atyp medium text-left">{news.title}</h4>
                                            <p className="font-sm text-left">{news.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>


                        <div className="grid-cs gtc-3 gap-20 mt-5">
                            {remainingNews.map(news => (
                                <div key={news.id} className="cs-model-card">
                                    <div className="banner">
                                        <img src={news.imgSrc} alt="news-banner" />
                                    </div>
                                    <div className="content">
                                        <h4 className="font-sm font-atyp medium text-left">{news.title}</h4>
                                        <p className="font-sm fs-16 text-left">{news.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default LatestNews