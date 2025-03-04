import Heading from "../../../shared/Headings/Heading"

// Sample data structure for news items
const newsItems = [
    { id: 1, title: "When is the Best Time to Renovate After Purchasing a Property in Dubai", date: "2026-10-01", imgSrc: "/assets/img/news-banner-lg.svg", description: "Dubai's climate and cultural calendar play a major role. Summer months bring extreme heat, making renovations involving outdoor work especially challenging due to reduced outdoor work hours.. 1" },
    { id: 2, title: "Spot the Red Flags: Why Buying Property in Dubai is Like Dating", date: "2025-10-02", imgSrc: "/assets/img/new-banner-sm.svg", description: "Buying a property in Dubai is a lot like dating — there are plenty of fish in the sea, but some come with serious red flags! Just like in the dating world, if you spot any of these warning signs, it's time to swipe left:" },
    { id: 3, title: "Dubai, Jumeirah Village Circle", date: "2025-10-03", imgSrc: "/assets/img/new-banner-sm.svg", description: "Dubai's skyline is often celebrated for its iconic structures and ambitious projects, and it's easy to see why. What might sometimes be perceived as a 'skyline of eyesores' is, in reality," },
    { id: 4, title: "Global Growth in Commercial Real Estate: Why Dubai is Leading the Way", date: "2025-09-30", imgSrc: "/assets/img/new-banner-sm.svg", description: "Commercial real estate is on the rise across the globe, but there's something special about Dubai that sets it apart. As the city continues to grow and innovate, it's becoming a true hotspot " },
    { id: 5, title: "Exploring the Hidden Gems of Dubai", date: "2025-10-04", imgSrc: "/assets/img/new-banner-sm.svg", description: "Discover the lesser-known attractions that make Dubai a unique destination." },
    { id: 6, title: "The Future of Smart Cities: Dubai's Vision", date: "2025-10-05", imgSrc: "/assets/img/new-banner-sm.svg", description: "How Dubai is leading the way in smart city innovations." },
    { id: 7, title: "Culinary Delights: Top Restaurants in Dubai", date: "2025-10-06", imgSrc: "/assets/img/new-banner-sm.svg", description: "A guide to the best dining experiences in the city." },
    { id: 8, title: "Dubai's Art Scene: A Cultural Renaissance", date: "2025-10-07", imgSrc: "/assets/img/new-banner-sm.svg", description: "Exploring the vibrant art community in Dubai." },
    { id: 9, title: "Sustainable Living in Dubai: A Growing Trend", date: "2025-10-08", imgSrc: "/assets/img/new-banner-sm.svg", description: "How residents are embracing eco-friendly practices." },
    { id: 10, title: "The Rise of E-commerce in Dubai", date: "2025-10-09", imgSrc: "/assets/img/new-banner-sm.svg", description: "Understanding the boom in online shopping." },
    { id: 11, title: "Dubai's Nightlife: A Guide to the Best Spots", date: "2025-10-10", imgSrc: "/assets/img/new-banner-sm.svg", description: "Experience the vibrant nightlife of Dubai." },
    { id: 12, title: "Adventure Awaits: Outdoor Activities in Dubai", date: "2023-10-11", imgSrc: "/assets/img/new-banner-sm.svg", description: "Explore the thrilling outdoor adventures available." },
];

const LatestNews = () => {
  // Sort news items by date and get the top 3 latest
  const sortedNews = newsItems.sort((a, b) => new Date(b.date) - new Date(a.date));
  const topNews = sortedNews.slice(0, 3);
  const remainingNews = sortedNews.slice(3);

  return (
    <>
        <section className="dubai-news pt-cs">
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