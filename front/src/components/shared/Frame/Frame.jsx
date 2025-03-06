import Content from "./Content";
const Frame = ({ frame, Component }) => {

    const { title, paragraphs, highlight, image, info, smallTitle, buttons, signature, imageHeight } = frame
// console.log(imageHeight)
  return (
    <>
        <section className="hol-man-sec pt-cs mb-5">
            <div className="container">
                <div className="row justify-content-between align-items-center flex-lg-row flex-column-reverse row-gap-40">
                    <div className="col-lg-6 col-md-12">
                        {Component ? <Component data={info} /> : <img src={image} alt="" width="100%" />}
                    </div>
                    <div className="col-lg-5 col-md-12">
                        <Content title={title} smallTitle={smallTitle} paragraphs={paragraphs} highlight={highlight} buttons={buttons} signature={signature} />
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default Frame