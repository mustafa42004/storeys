import { useParams } from "react-router-dom";
import Header from "../../shared/Header/Header";
import Banner from "../../shared/Banner/Banner";
import { useState, useEffect } from "react";
import { newsInnerBanner } from "../../../utils/static/bannerData";
import Footer from "../../shared/Footer/Footer";
import { useQuery } from "@tanstack/react-query";
import NewsService from "../../../services/news.service";

const NewsInner = () => {
  const { id } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["news-single", id],
    queryFn: NewsService.getNewsById,
    select: (data) => data?.data,
  });

  const [headerHeight, setHeaderHeight] = useState(0); // Capture newsId but don't use it
  const { bg, width } = newsInnerBanner;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    window.innerWidth > 767 ? setIsMobile(true) : setIsMobile(false);
  }, []);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-dark" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <p className="fs-3 text-dark">
          {error?.message || "Something went wrong"}
        </p>
      </div>
    );
  }

  return (
    <div className="News">
      <Header height={setHeaderHeight} className="newsHeading" />
      <Banner
        title={data?.title}
        bg={data?.banner?.s3Url}
        width={width}
        height={400}
        marginTop={headerHeight}
        className="banner"
      />
      <div className="newsInner">
        <div
          className="container"
          dangerouslySetInnerHTML={{ __html: data?.content }}
        ></div>
        {/* Section 1 */}
        {/* <section className="mb-3">
          <h2 className="section-title">{Paragraph_1Data?.title}</h2>
          <p className="text-muted">{Paragraph_1Data?.paragraphs}</p>
        </section> */}

        {/* Section 2 */}
        {/* <section className="mb-4">
          <h2 className="section-title">{Paragraph_2Data?.header}</h2>
          <p className="text-muted">{Paragraph_2Data?.description}</p>
          <ul>
            {Paragraph_2Data?.data?.map(({ header, description }, index) => (
              <li key={index} className="mb-2">
                <strong>{header}</strong> {description}
              </li>
            ))}
          </ul>
          <p className="text-muted">{Paragraph_2Data?.paragraphs}</p>
        </section> */}

        {/* Properties Section */}
        {/* <section className="mb-3">
          <img
            src={imagedData.image}
            alt="Dubai Hills Estate"
            className="img-fluid"
          />
          <h2 className="section-title mt-3">{imagedData.header}</h2>
          <p className="text-muted">{imagedData.description}</p>
          <div className="row mt-3">
            {imagedData?.data?.map(({ category, items }, index) => (
              <div key={index} className="col-md-12 mb-1">
                <h3 className="sub-title">{category}</h3>
                <ul>
                  {items.map(({ header, description }, subIndex) => (
                    <li key={subIndex} className="mb-2">
                      <strong>{header}</strong> {description}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section> */}

        {/* Amenities Section */}
        {/* <section className="mb-4">
          <h2 className="section-title">{amenitiesData.title}</h2>
          <p className="text-muted">{amenitiesData.description}</p>
          <div className="row mt-2">
            {amenitiesData.amenities.map(
              ({ title, description, list, additional }, index) => (
                <div key={index} className="col-md-12 mb-1">
                  <h3 className="sub-title">{title}</h3>
                  <p className="text-muted">{description}</p>
                  {list && (
                    <ul>
                      {list.map((item, subIndex) => (
                        <li key={subIndex} className="mb-2">
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                  {additional && <p className="text-muted">{additional}</p>}
                </div>
              )
            )}
          </div>
        </section> */}

        {/* Investment Section */}
        {/* <section className="mb-4">
          <img
            src={investmentData.image}
            alt="Dubai Hills Estate"
            className="img-fluid"
          />
          <h2 className="section-title mt-3">{investmentData.title}</h2>
          <p className="text-muted">{investmentData.description}</p>
          <ul>
            {investmentData.highlights.map(({ title, description }, index) => (
              <li key={index} className="mb-2">
                <strong>{title}</strong> – {description}
              </li>
            ))}
          </ul>
        </section> */}

        {/* Final Section */}
        {/* <section className="estateInfo">
          <h2 className="section-title">{estateInfo.title}</h2>
          <p className="text-muted">{estateInfo.description}</p>
          <h3 className="sub-title mt-4">{estateInfo.data.title}</h3>
          <p className="text-muted">{estateInfo.data.description}</p>
        </section> */}

        <Footer />
      </div>
    </div>
  );
};

export default NewsInner;
