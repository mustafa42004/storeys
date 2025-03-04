import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
import DeleteModal from "./DeleteModal"
import { useState } from "react"

const TeamList = () => {

    const teams = useSelector((state) => state.TeamDataSlice.teams)

    const [selectedMember, setSelectedMember] = useState(null)
    
  return (
    <>
        <div className="container-fluid">
            <div className="row">
                <div className="com-md-12">
                    <div className="card mb-4">
                        <div className="card-header pb-0">
                            <div className="flex-cs header">
                                <h5>Team table</h5>
                                <NavLink to='/create-teams' className="btn bg-gradient-info"><i class="fa-solid fa-plus" /> &nbsp; Add Member</NavLink>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive p-0">
                                <table className="table align-items-center mb-0">
                                    <thead>
                                        <tr>
                                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                            Profile
                                        </th>
                                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                            Designation
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
                                            teams?.length > 0 && teams.map((item, index) => {
                                                return (
                                                    <>
                                                        <tr>
                                                            <td>
                                                                <div className="d-flex px-2 py-1">
                                                                <div>
                                                                    <img
                                                                    src={item?.profile?.s3Url}
                                                                    className="avatar avatar-sm me-3"
                                                                    alt="user1"
                                                                    />
                                                                </div>
                                                                <div className="d-flex flex-column justify-content-center">
                                                                    <h6 className="mb-0 text-sm">{  item?.firstName  } { item?.lastName }</h6>
                                                                    {/* <p className="text-xs text-secondary mb-0">
                                                                    john@creative-tim.com
                                                                    </p> */}
                                                                </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <p className="text-xs text-center font-weight-bold mb-0">{item?.designation}</p>
                                                            </td>
                                                            <td className="align-middle text-center">
                                                                <span className="text-secondary text-xs font-weight-bold">
                                                                {item?.createdAt}
                                                                </span>
                                                            </td>
                                                            <td className="align-middle flex-cs gap-3 text-center">
                                                                <NavLink
                                                                    to={`/edit-teams/${item?._id}`}
                                                                    className="btn-success btn m-0 font-weight-bold text-xs"
                                                                    data-toggle="tooltip"
                                                                    data-original-title="Edit user"
                                                                >
                                                                    Edit
                                                                </NavLink>
                                                                <button
                                                                    data-bs-toggle="modal"
                                                                    data-bs-target="#modal-banner"
                                                                    onClick={() => setSelectedMember(item)}
                                                                    className=" btn-danger btn m-0 font-weight-bold text-xs"
                                                                >
                                                                    Delete
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    </>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <DeleteModal member={selectedMember} />
    </>
  )
}

export default TeamList