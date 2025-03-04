import Heading from "../../../shared/Headings/Heading"
import { useState } from 'react';
import PropertyCard from "./Helpers/PropertyCard";

const Layout = () => {
  const [activeButton, setActiveButton] = useState('sell');
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  return (
    <>
        <section className="property-layout pt-60">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <Heading title="Our Properties" className={"fs-50"} width={60}  description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim ve"}/>
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
                            {
                                array.map((value, index) => (
                                    <PropertyCard key={index} index={index} />
                                ))
                            }
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