import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import DeleteModal from './DeleteModal'
import { useState } from 'react'
import { formateDate } from '../../../../util/formateDate'

const Property = () => {

    const properties = useSelector(state => state.PropertyDataSlice.properties)

    const [selectedProperty, setSelectedProperty] = useState(null)

  return (
    <>
        <div className="container-fluid">
            <div className="row">
                <div className="com-md-12">
                    <div className="card mb-4">
                        <div className="card-header pb-0">
                            <div className="flex-cs header">
                                <h5>Property table</h5>
                                <NavLink to='/create-property' className="btn bg-gradient-info"><i class="fa-solid fa-plus" /> &nbsp; Add Property</NavLink>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive p-0">
                                <table className="table align-items-center mb-0">
                                    <thead>
                                        <tr>
                                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                            Image
                                        </th>
                                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                            Property Name
                                        </th>
                                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                            Status
                                        </th>
                                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                            Creat Date
                                        </th>
                                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                            Actions
                                        </th>
                                        {/* <th className="text-secondary opacity-7" /> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            properties?.length > 0 && properties?.map((property, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <div className="d-flex px-2 py-1">
                                                            <div>
                                                                <img
                                                                src={property?.banner?.s3Url}
                                                                className="avatar avatar-sm me-3"
                                                                alt="user1"
                                                                />
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <p className="text-xs font-weight-bold mb-0">{property?.name}</p>
                                                    </td>
                                                    <td className="align-middle text-center text-sm">
                                                        <span className="badge badge-sm bg-gradient-success">{property?.status}</span>
                                                    </td>
                                                    <td className="align-middle text-center">
                                                        <span className="text-secondary text-xs font-weight-bold">
                                                        {formateDate(property?.createdDate)}
                                                        </span>
                                                    </td>
                                                    <td className="align-middle flex-cs gap-3 text-center text-center">
                                                        <NavLink
                                                            to={`/create-property/${property?._id}`}
                                                            className="btn btn-success btn m-0 font-weight-bold text-xs"
                                                            data-toggle="tooltip"
                                                            data-original-title="Edit user"
                                                        >
                                                            Edit
                                                        </NavLink>
                                                        <button
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#modal-banner"
                                                            onClick={() => setSelectedProperty(property)}
                                                            className=" btn-danger btn m-0 font-weight-bold text-xs"
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <DeleteModal property={selectedProperty} />
    </>
  )
}

export default Property