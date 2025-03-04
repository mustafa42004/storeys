import Counter from "./Counter"
const AboutComp = () => {
  return (
    <>
        <div className="section1">
            <div className="content">
                <h4 className="fs-50 text-left">About Storeys</h4>
                <h6 className="font-lg  fs-18 text-left">The Brightest And Fastest-Growing Real Estate Brokerage Firm in Dubai</h6>
                <p className="font-sm text-left">At Storeys, we specialize in Sales and Leasing, excelling in the Off-Plan Sector with a team boasting 80+ years of combined experience. Our Hybrid Approach allows us to evolve, learn, and adapt to the ever-changing market.</p>
            </div>
            <div className="team">
                <div className="images">
                    <img className="img-1" src="/assets/img/team-1.svg" alt="" />
                    <img className="ml--12" src="/assets/img/team-1.svg" alt="" />
                    <img className="ml--12" src="/assets/img/team-1.svg" alt="" />
                    <img className="ml--12" src="/assets/img/team-1.svg" alt="" />
                    <img className="ml--12" src="/assets/img/team-1.svg" alt="" />
                    <img className="ml--12" src="/assets/img/team-1.svg" alt="" />
                </div>
                <h4 className="font-sm text-left">Meet our <br /> professional team</h4>
            </div>
            <Counter />
        </div>
    </>
  )
}

export default AboutComp