import Heading from "../../../shared/Headings/Heading"
import { useState } from 'react';
import PropertyCard from "./Helpers/PropertyCard";
import { propertyData } from "../../../../utils/static/propertyData";


const Layout = () => {
  const [activeButton, setActiveButton] = useState('sell');
  const propertyCards = propertyData[0].cards; 


  return (
    <>
        <section className="property-layout pt-60">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <Heading title="Residence in Palm Jumeirah" className={"fs-50"} width={60} />
                        <div className="category flex-cs py-5 ">
                            <button 
                                className={`cs-btn ${activeButton === 'sell' ? '' : 'outline hover'}`} 
                                onClick={() => setActiveButton('sell')}
                            >
                                For Sell
                            </button>
                            <button 
                                className={`cs-btn  ${activeButton === 'rent' ? '' : 'outline hover'}`} 
                                onClick={() => setActiveButton('rent')}
                            >
                                For Rent
                            </button>
                        </div>

                        <div className="card-layout">
                        {propertyCards.map((property, index) => (
                            <PropertyCard key={property.id} property={property} index={index} />
                        ))}
                        </div>
                        <div className="w-100 mt-5 flex-cs">
                            <button className="cs-btn">Explore More <i className="fa-regular fa-arrow-right"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default Layout