import Heading from "../../shared/Headings/Heading";
const Awards = ({ awards }) => {
  return (
    <> 
        <section className="pt-cs">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="awards-container">
                            <Heading title="Awards & Recognition" />

                            <div className="grid-cs gtc-4 pt-4 gap-20">
                                {awards.map((award) => (
                                    <div className="award-card">
                                        <img src={award.image} className="image" alt={award.title} />
                                        <div className="content">
                                            <h4 className="font-sm fs-14 font-atyp dark medium text-left">{award.title}</h4>
                                            <p className="font-sm text-left">{award.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default Awards