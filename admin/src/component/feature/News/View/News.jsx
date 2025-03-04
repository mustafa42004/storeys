import { NavLink } from "react-router-dom"

const News = () => {
  return (
    <>
                <div className="container-fluid">
            <div className="row">
                <div className="com-md-12">
                    <div className="card mb-4">
                        <div className="card-header pb-0">
                            <div className="flex-cs header">
                                <h5>News table</h5>
                                <NavLink to='/create-news' className="btn bg-gradient-info"><i class="fa-solid fa-plus" /> &nbsp; Add News</NavLink>
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
                                        <tr>
                                            <td>
                                                <div className="d-flex px-2 py-1">
                                                <div>
                                                    <img
                                                    src="../assets/img/team-2.jpg"
                                                    className="avatar avatar-sm me-3"
                                                    alt="user1"
                                                    />
                                                </div>
                                                <div className="d-flex flex-column justify-content-center">
                                                    <h6 className="mb-0 text-sm">John Michael</h6>
                                                    <p className="text-xs text-secondary mb-0">
                                                    john@creative-tim.com
                                                    </p>
                                                </div>
                                                </div>
                                            </td>
                                            <td>
                                                <p className="text-xs font-weight-bold mb-0">Manager</p>
                                                <p className="text-xs text-secondary mb-0">Organization</p>
                                            </td>
                                            <td className="align-middle text-center text-sm">
                                                <span className="badge badge-sm bg-gradient-success">Online</span>
                                            </td>
                                            <td className="align-middle text-center">
                                                <span className="text-secondary text-xs font-weight-bold">
                                                23/04/18
                                                </span>
                                            </td>
                                            <td className="align-middle text-center">
                                                <a
                                                href="javascript:;"
                                                className="text-secondary font-weight-bold text-xs"
                                                data-toggle="tooltip"
                                                data-original-title="Edit user"
                                                >
                                                Edit
                                                </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="d-flex px-2 py-1">
                                                <div>
                                                    <img
                                                    src="../assets/img/team-3.jpg"
                                                    className="avatar avatar-sm me-3"
                                                    alt="user2"
                                                    />
                                                </div>
                                                <div className="d-flex flex-column justify-content-center">
                                                    <h6 className="mb-0 text-sm">Alexa Liras</h6>
                                                    <p className="text-xs text-secondary mb-0">
                                                    alexa@creative-tim.com
                                                    </p>
                                                </div>
                                                </div>
                                            </td>
                                            <td>
                                                <p className="text-xs font-weight-bold mb-0">Programator</p>
                                                <p className="text-xs text-secondary mb-0">Developer</p>
                                            </td>
                                            <td className="align-middle text-center text-sm">
                                                <span className="badge badge-sm bg-gradient-secondary">Offline</span>
                                            </td>
                                            <td className="align-middle text-center">
                                                <span className="text-secondary text-xs font-weight-bold">
                                                11/01/19
                                                </span>
                                            </td>
                                            <td className="align-middle text-center">
                                                <a
                                                href="javascript:;"
                                                className="text-secondary font-weight-bold text-xs"
                                                data-toggle="tooltip"
                                                data-original-title="Edit user"
                                                >
                                                Edit
                                                </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="d-flex px-2 py-1">
                                                <div>
                                                    <img
                                                    src="../assets/img/team-4.jpg"
                                                    className="avatar avatar-sm me-3"
                                                    alt="user3"
                                                    />
                                                </div>
                                                <div className="d-flex flex-column justify-content-center">
                                                    <h6 className="mb-0 text-sm">Laurent Perrier</h6>
                                                    <p className="text-xs text-secondary mb-0">
                                                    laurent@creative-tim.com
                                                    </p>
                                                </div>
                                                </div>
                                            </td>
                                            <td>
                                                <p className="text-xs font-weight-bold mb-0">Executive</p>
                                                <p className="text-xs text-secondary mb-0">Property</p>
                                            </td>
                                            <td className="align-middle text-center text-sm">
                                                <span className="badge badge-sm bg-gradient-success">Online</span>
                                            </td>
                                            <td className="align-middle text-center">
                                                <span className="text-secondary text-xs font-weight-bold">
                                                19/09/17
                                                </span>
                                            </td>
                                            <td className="align-middle text-center">
                                                <a
                                                href="javascript:;"
                                                className="text-secondary font-weight-bold text-xs"
                                                data-toggle="tooltip"
                                                data-original-title="Edit user"
                                                >
                                                Edit
                                                </a>
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
    </>
  )
}

export default News