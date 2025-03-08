import { useParams } from "react-router-dom";
import { dubaiHillsEstate } from "../../../utils/static/news_communitiesInnerData";// Import the data
import Header from "../../shared/Header/Header";
import Banner from "../../shared/Banner/Banner";
import { useState } from "react";
import { newsInnerBanner } from "../../../utils/static/bannerData";

const NewsInner = () => {
    const { newsId} = useParams(); 
    
    const [headerHeight, setHeaderHeight] = useState(0)// Capture newsId but don't use it
    const { bg, width, height } = newsInnerBanner

    // Destructure parts from dubaiHillsEstate
    const { 
        // bannerTitle, 
        Paragraph_1Data, 
        Paragraph_2Data, 
        imagedData, 
        amenitiesData,
        Paragraph_3Data,
    } = dubaiHillsEstate;

    return (
        <div className="max-w-4xl mx-auto p-6">

            <Header height={setHeaderHeight}/>
            <Banner title={dubaiHillsEstate?.bannerTitle} bg={bg} width={width} height={height} marginTop={headerHeight}/>

            {/* Section 1 */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold">{Paragraph_1Data.title}</h2>
                <p className="text-gray-600">{Paragraph_1Data.paragraphs}</p>
                {/* <img src={Paragraph_1Data.image} alt="Dubai Hills Estate" className="mt-4 w-full" /> */}
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
            <img src={imagedData.image} alt="Dubai Hills Estate" className="mt-4 w-full" />
            <h2 className="text-2xl font-semibold">{imagedData.header}</h2>
            <p className="text-gray-600">{imagedData.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">

            {imagedData?.data?.map(({ category, items }, index) => (
                <div key={index} className="mt-6">
                    <h3 className="text-xl font-bold">{category}</h3>
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
                        <h3 className="fs-20 font-semibold">{title}</h3>
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

            {/* Final Section */}
            <section>
                <h2 className="text-2xl font-semibold">{Paragraph_3Data.header}</h2>
                <p className="text-gray-600">{Paragraph_3Data.description}</p>
                {Paragraph_3Data.data.map(({ title, description }, index) => (
                    <div key={index} className="mt-4">
                        <h3 className="font-bold">{title}</h3>
                        <p className="text-gray-600">{description}</p>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default NewsInner;



  