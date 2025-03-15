// import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import DeleteModal from "./DeleteModal";
import { useState } from "react";
import { formateDate } from "../../../../util/formateDate";

export const amenities = [
  {
    _id: "60d21b4667d0d8992e610c85",
    name: "Swimming Pool",
    status: "Active",
    createdDate: "2025-01-01",
  },
  {
    _id: "60d21b4667d0d8992e610c86",
    name: "Gym",
    status: "Active",
    createdDate: "2025-01-01",
  },
  {
    _id: "60d21b4667d0d8992e610c87",
    name: "Parking",
    status: "Active",
    createdDate: "2025-01-01",
  },
  {
    _id: "60d21b4667d0d8992e610c88",
    name: "Laundry",
    status: "Active",
    createdDate: "2025-01-01",
  },
  {
    _id: "60d21b4667d0d8992e610c89",
    name: "Restaurant",
    status: "Active",
    createdDate: "2025-01-01",
  },
  {
    _id: "60d21b4667d0d8992e610c8a",
    name: "Room Service",
    status: "Active",
    createdDate: "2025-01-01",
  },
  {
    _id: "60d21b4667d0d8992e610c8b",
    name: "Wifi",
    status: "Active",
    createdDate: "2025-01-01",
  },
  {
    _id: "60d21b4667d0d8992e610c8c",
    name: "Security",
    status: "Active",
    createdDate: "2025-01-01",
  },
  {
    _id: "60d21b4667d0d8992e610c8d",
    name: "Air Conditioning",
    status: "Active",
    createdDate: "2025-01-01",
  },
];

const Amenity = () => {
  const [selectedAmenity, setSelectedAmenity] = useState(null);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="com-md-12">
            <div className="card mb-4">
              <div className="card-header pb-0">
                <div className="flex-cs header">
                  <h5>Amenity table</h5>
                  <NavLink
                    to="/create-amenity"
                    className="btn bg-gradient-info"
                  >
                    <i className="fa-solid fa-plus" /> &nbsp; Add Amenity
                  </NavLink>
                </div>
              </div>
              <div className="card-body">
                <div className="table-responsive p-0">
                  <table className="table align-items-center mb-0">
                    <thead>
                      <tr>
                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                          Amenity Name
                        </th>
                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                          Created Date
                        </th>
                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                          Actions
                        </th>
                        {/* <th className="text-secondary opacity-7" /> */}
                      </tr>
                    </thead>
                    <tbody>
                      {amenities?.length > 0 &&
                        amenities?.map((amenity, index) => (
                          <tr key={index}>
                            <td>
                              <p className="text-xs font-weight-bold mb-0">
                                {amenity?.name}
                              </p>
                            </td>

                            <td className="align-middle text-center">
                              <span className="text-secondary text-xs font-weight-bold">
                                {formateDate(amenity?.createdDate)}
                              </span>
                            </td>
                            <td className="align-middle flex-cs gap-3 text-center text-center">
                              <NavLink
                                to={`/create-amenity/${amenity?._id}`}
                                className="btn btn-success btn m-0 font-weight-bold text-xs"
                                data-toggle="tooltip"
                                data-original-title="Edit user"
                              >
                                Edit
                              </NavLink>
                              <button
                                data-bs-toggle="modal"
                                data-bs-target="#modal-banner"
                                onClick={() => setSelectedAmenity(amenity)}
                                className=" btn-danger btn m-0 font-weight-bold text-xs"
                              >
                                Delete
                              </button>
                            </td>
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
      <DeleteModal amenity={selectedAmenity} />
    </>
  );
};

export default Amenity;
