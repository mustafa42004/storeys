const PointSection = ({ data }) => {
  return (
    <>
      <div className="point-section mt-3">
        {data?.map((item, index) => (
          <div className="item" key={index}>
            <h4 className="font-lg font-sans bold fs-50">
              {Number(index) + 1 < 10
                ? `0${Number(index) + 1}`
                : Number(index) + 1}
            </h4>
            <p className="font-sm medium text-left fs-18">
              <span className="fw-600">{item.header} -</span> {item.description}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default PointSection;
