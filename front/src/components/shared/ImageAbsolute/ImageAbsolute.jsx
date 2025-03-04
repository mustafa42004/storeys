import { useState } from "react"
import Heading from "../Headings/Heading"
import { useEffect } from "react"

const ImageAbsolute = ({header, width, data}) => {

    const [isMob, setIsMob] = useState(false)

    useEffect(()=>{
        window.innerWidth > 767 ? setIsMob(false) : setIsMob(true)
    },[])

  return (
    <>
        <div className="container mb-5 pt-cs">
            <div className="row">
                <div className="col-md-12">
                    <Heading title={header} width={isMob ? 85 : width} className={"fs-42"} />

                </div>
            </div>
        </div>
        <section className="image-absolute ">
            {
                !isMob && (
                    <img className="abs-img" src="/assets/img/imaged-banner.svg" alt="imaged-banner" />
                )
            }
            <div className="container">
                <div className="row">
                    <div className="col-md-12">

                        <div className="grid-cs gap 30">
                            <div className="content">
                                {
                                    data?.map((value, index) => (
                                        <div className="item" key={index}>
                                            <h4 className="font-sm text-left bold">{index + 1}. {value?.title}</h4>
                                            <p className="font-sm text-left">{value?.description}</p>

                                            {
                                                value?.list && (
                                                    <ul className="my-3" >
                                                    {
                                                        value?.list?.map((item, listIndex) => (
                                                            <li key={listIndex} className="font-sm text-left"><span className="fw-600">{item?.title}</span> {item?.description}</li>
                                                        ))
                                                    }
                                                    </ul>
                                                )
                                                
                                            }
                                        </div>
                                    ))
                                }
                            </div>
                            <div className="banner">
                                {
                                    isMob && (
                                        <img className="abs-img" src="/assets/img/imaged-banner.svg" alt="imaged-banner" />
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default ImageAbsolute