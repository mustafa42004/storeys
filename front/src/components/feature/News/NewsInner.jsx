import { useParams } from "react-router-dom";
import { news_communitiesInnerData } from "../../../utils/static/news_communitiesInnerData";// Import the data
import Header from "../../shared/Header/Header";
import Banner from "../../shared/Banner/Banner";
import { useState , useEffect } from "react";
import { newsInnerBanner } from "../../../utils/static/bannerData";
import Footer from "../../shared/Footer/Footer"

const NewsInner = () => {
    const { id } = useParams(); 
    
    const [headerHeight, setHeaderHeight] = useState(0)// Capture newsId but don't use it
    const { bg, width, height } = newsInnerBanner
    const [isMobile , setIsMobile] = useState(false)

    useEffect(()=>{
        window.innerWidth > 767 ? setIsMobile(true) : setIsMobile(false)
    },[])

    

    // Destructure parts from dubaiHillsEstate
    const { 
        bannerTitle, 
        Paragraph_1Data, 
        Paragraph_2Data, 
        imagedData, 
        amenitiesData,
        investmentData,
        estateInfo,
    } = news_communitiesInnerData;

    return (
        <div className="max-w-4xl mx-auto">

            <Header height={setHeaderHeight} className={ `${isMobile ? "fs-26 mx-5 " : "fs-30"}`}/>
            <Banner title={bannerTitle} bg={bg} width={width} height={isMobile ? 500 : 500} marginTop={headerHeight}/>

            {/* Section 1 */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mt-5">{Paragraph_1Data.title}</h2>
                <p className="text-gray-600">{Paragraph_1Data.paragraphs}</p>
            </section>

            {/* Section 2 */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold">{Paragraph_2Data.header}</h2>
                <p className="text-gray-600">{Paragraph_2Data.description}</p>
                <ul className="list-disc pl-5 mt-2">
                    {Paragraph_2Data.data.map(({ header, description }, index) => (
                        <li key={index} className="mt-2">
                            <strong>{header}</strong> {description}
                        </li>
                    ))}
                </ul>
                <p className="text-gray-600">{Paragraph_2Data.paragraphs}</p>
            </section>

            {/* Properties Section */}
            <section className="mb-5 mt-5">
            <img src={imagedData.image} alt="Dubai Hills Estate" className={ `${isMobile ? "mt-4 w-75" : "fs-30 mt-4 w-full"}`}/>
            <h2 className="text-2xl font-bold mt-3">{imagedData.header}</h2>
            <p className="text-gray-600">{imagedData.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">

            {imagedData?.data?.map(({ category, items }, index) => (
                <div key={index} className="mt-6">
                    <h3 className="fs-26 font-semibold">{category}</h3>
                    <ul className="list-disc pl-5 mt-2">
                        {items.map(({ header, description }, subIndex) => (
                            <li key={subIndex} className="mt-2">
                                <strong>{header}</strong> {description}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
            </div>
        </section>

{/*----------------------------------------- */}

        <section className="mb-5 mt-5">
            <h2 className="text-2xl font-semibold">{amenitiesData.title}</h2>
            <p className="text-gray-600">{amenitiesData.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                {amenitiesData.amenities.map(({ title, description, list, additional }, index) => (
                    <div key={index} className="mt-6">
                        <h3 className="fs-26 font-semibold">{title}</h3>
                        <p className="text-gray-600">{description}</p>
                        
                        {list && (
                            <ul className="list-disc pl-5 mt-2">
                                {list.map((item, subIndex) => (
                                    <li key={subIndex} className="mt-2">{item}</li>
                                ))}
                            </ul>
                        )}

                        {additional && <p className="mt-2 text-gray-600">{additional}</p>}
                    </div>
                ))}
            </div>
        </section>
{/*---------------------------------------------------------------------------------*/}

        <section className="mb-10">
            <img src={investmentData.image} alt="Dubai Hills Estate" className="w-full rounded-lg " />

            <h2 className="text-2xl font-semibold mt-4">{investmentData.title}</h2>
            <p className="text-gray-600 mt-2">{investmentData.description}</p>

            <ul className="list-disc pl-5 mt-4">
                {investmentData.highlights.map(({ title, description }, index) => (
                    <li key={index} className="mt-2">
                        <strong>{title}</strong> – {description}
                    </li>
                ))}
            </ul>
        </section>

            {/* Final Section */}
            <section className="mb-8">
            <h2 className="text-2xl font-semibold">{estateInfo.title}</h2>
            <p className="text-gray-600 mt-2">{estateInfo.description}</p>

            <h3 className="fs-22 fw-semibold mt-4">{estateInfo.data.title}</h3>
            <p className="text-gray-600 mt-1">{estateInfo.data.description}</p>
            </section>

            <Footer/>
        </div>
    );
};

export default NewsInner;
