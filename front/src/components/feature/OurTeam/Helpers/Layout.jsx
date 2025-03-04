import React from 'react'
import Heading from '../../../shared/Headings/Heading'
import Cards from './Cards'

const Layout = () => {

    const array = [1, 2, 3, 4, 5]

  return (
    <>
    <section className="pt-cs our-team">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <p className="font-sm mb-4 fs-20 medium">Our Team</p>
                    <Heading title="You’re in safe hands" className="fs-50" />
                    <div className="layout">
                        {
                            array.map((value, index) => (
                                <Cards key={index} image="/assets/img/our-team-1.svg" name="Talan Culhane" designation="Sales Manager" />
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

export default Layout