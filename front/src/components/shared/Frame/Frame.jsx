import Content from "./Content";
const Frame = ({ frame, Component }) => {

    const { title, paragraphs, highlight, image, info, smallTitle, buttons, signature, imageHeight } = frame
// console.log(imageHeight)
  return (
    <>
        <section className="pt-cs mb-5">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="frame-1">
                            <Content title={title} smallTitle={smallTitle} paragraphs={paragraphs} highlight={highlight} buttons={buttons} signature={signature} />
                            <div className="image">
                                {Component ? <Component data={info} /> : <img className="abs" src={image} alt="" style={{height: `${imageHeight}px` || '600px'}} />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default Frame