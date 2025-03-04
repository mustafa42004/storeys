import React, { useEffect, useState } from 'react';

const InfoSection = () => {
  const [propertyInfo, setPropertyInfo] = useState([]);
  const [buildingInfo, setBuildingInfo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const propertyData = [
        { label: 'Type', value: 'Office' },
        { label: 'Purpose', value: 'Office' },
        { label: 'Reference no.', value: '12345' },
        { label: 'Furnishing', value: 'Furnished' },
        { label: 'Added on', value: '2023-01-01' },
      ];

      const buildingData = [
        { label: 'Building Name', value: 'Main Office' },
        { label: 'Total Floors', value: '10' },
        { label: 'Total Building Area', value: '5000 sq ft' },
        { label: 'Offices', value: '50' },
      ];

      setPropertyInfo(propertyData);
      setBuildingInfo(buildingData);
    };

    fetchData();
  }, []);

  return (
    <>
        <section className="property-inner-info pt-cs">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="grid-cs  align-items-stretch gap-20 ">
                            <div>
                                <h4 className="font-lg fs-36 text-left">Property Information</h4>
                                <div className="grid-cs box-cs align-items-start gap-20 mt-3">
                                    <table className="cs-table">
                                        <tbody>
                                            {propertyInfo.slice(0, 3).map((item, index) => (
                                                <tr key={index}>
                                                    <td className="font-sm text-left">{item.label}</td>
                                                    <td className="font-sm dark medium text-left">{item.value}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <table className="cs-table">
                                        <tbody>
                                            {propertyInfo.slice(3).map((item, index) => (
                                                <tr key={index}>
                                                    <td className="font-sm text-left">{item.label}</td>
                                                    <td className="font-sm dark medium text-left">{item.value}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div>
                                <h4 className="font-lg fs-36 text-left">Building Information</h4>
                                <div className="grid-cs box-cs align-items-start gap-20 mt-3">
                                    <table className="cs-table">
                                        <tbody>
                                            {buildingInfo.slice(0, 2).map((item, index) => (
                                                <tr key={index}>
                                                    <td className="font-sm text-left">{item.label}</td>
                                                    <td className="font-sm dark medium text-left">{item.value}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <table className="cs-table">
                                        <tbody>
                                            {buildingInfo.slice(2).map((item, index) => (
                                                <tr key={index}>
                                                    <td className="font-sm text-left">{item.label}</td>
                                                    <td className="font-sm dark medium text-left">{item.value}</td>
                                                </tr>
                                            ))}
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
  )
}

export default InfoSection