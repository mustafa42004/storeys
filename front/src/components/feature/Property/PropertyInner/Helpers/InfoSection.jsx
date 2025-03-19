const InfoSection = ({ propertyInfo, buildingInfo }) => {
  return (
    <>
      <section className="property-inner-info pt-cs">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="grid-cs align-items-stretch gap-20 ">
                <div>
                  <h4 className="font-lg fs-36 text-left">
                    Property Information
                  </h4>
                  <div className="box-cs align-items-start gap-20 mt-3">
                    <table className="cs-table">
                      <tbody>
                        {Object.entries(propertyInfo || {})
                          ?.slice(0, 3)
                          ?.map(([label, value], index) => (
                            <tr key={index}>
                              <td className="font-sm text-left">{label}</td>
                              <td className="font-sm dark medium text-left">
                                {value}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                    <table className="cs-table">
                      <tbody>
                        {Object.entries(propertyInfo || {})
                          ?.slice(3, 4)
                          ?.map(([label, value], index) => (
                            <tr key={index}>
                              <td className="font-sm text-left">{label}</td>
                              <td className="font-sm dark medium text-left">
                                {value}
                              </td>
                            </tr>
                          ))}
                        <tr>
                          <td className="font-sm text-left">Created </td>
                          <td className="font-sm dark medium text-left">
                            {new Date(
                              propertyInfo?.createdDate || ""
                            ).toLocaleDateString()}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div>
                  <h4 className="font-lg fs-36 text-left">
                    Building Information
                  </h4>
                  <div className=" box-cs align-items-start gap-20 mt-3">
                    <table className="cs-table">
                      <tbody>
                        {Object.entries(buildingInfo || {})
                          ?.slice(0, 2)
                          ?.map(([label, value], index) => (
                            <tr key={index}>
                              <td className="font-sm text-left">{label}</td>
                              <td className="font-sm dark medium text-left">
                                {value}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                    <table className="cs-table">
                      <tbody>
                        {Object.entries(buildingInfo || {})
                          ?.slice(3)
                          ?.map(([label, value], index) => (
                            <tr key={index}>
                              <td className="font-sm text-left">{label}</td>
                              <td className="font-sm dark medium text-left">
                                {value}
                              </td>
                            </tr>
                          ))}
                        <tr>
                          <td className="font-sm text-left">sqft</td>
                          <td className="font-sm dark medium text-left">
                            {buildingInfo?.sqft} m<sup>2</sup>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default InfoSection;
