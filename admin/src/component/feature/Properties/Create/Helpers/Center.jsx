
const Center = ({ bed, bath, sqft }) => {
  return (
    <>
        <div className="center ">
            <div className="item divide ">
                <div>
                    <h4 className="font-sm text-left dark medium fs-16">{bed || 0} &nbsp; <img src="/assets/img/bed.svg" alt="" className="icon" /></h4>
                </div>
                    <h4 className="font-sm text-left dark medium fs-16">Bedrooms</h4>

            </div>
            <div className="item divide">
                <div>
                    <h4 className="font-sm text-left dark medium fs-16">{bath || 0} &nbsp; <img src="/assets/img/bathroom.svg" alt="" className="icon" /></h4>
                </div>
                    <h4 className="font-sm text-left dark medium fs-16">Bathrooms</h4>

            </div>
            <div className="item">
                <div>
                    <h4 className="font-sm text-left dark medium fs-16">{sqft || 0} m<sup>2</sup> &nbsp; <img src="/assets/img/sqft.svg" alt="" className="icon" /></h4>
                </div>
                    <h4 className="font-sm text-left dark medium fs-16">Square Ft</h4>

            </div>
        </div>
    </>
  )
}

export default Center