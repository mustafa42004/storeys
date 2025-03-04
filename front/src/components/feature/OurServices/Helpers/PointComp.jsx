import PointSection from "../../../shared/PointSection/PointSection"

const PointComp = ({ data }) => {
  return (
    <> 
        <div className="content">
            <PointSection data={data} />
        </div>
    </>
  )
}

export default PointComp