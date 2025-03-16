import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import DeleteModal from "./DeleteModal";
import { useState, useEffect } from "react";
import { fetch as fetchTeams } from "../../../../services/TeamService";
import { toast, ToastContainer } from "react-toastify";
import { format } from "date-fns";
import Pagination from "../../../shared/Pagination/Pagination";
import Spinner from "../../../shared/Spinner/Spinner";

const TeamList = () => {
  const dispatch = useDispatch();
  const teamsFromRedux = useSelector((state) => state.TeamDataSlice.teams);

  const [teams, setTeams] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalDocs: 0,
    totalPages: 0,
    hasPrevPage: false,
    hasNextPage: false,
  });

  const getTeams = async (page = 1, limit = 10) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetchTeams(page, limit);

      if (response.success || response.status === "success") {
        setTeams(response?.data?.docs || []);

        // Update pagination state
        setPagination({
          page: response?.data?.page || 1,
          limit: response?.data?.limit || 10,
          totalDocs: response?.data?.totalDocs || 0,
          totalPages: response?.data?.totalPages || 0,
          hasPrevPage: response?.data?.hasPrevPage || false,
          hasNextPage: response?.data?.hasNextPage || false,
        });
      } else {
        setError(response.message || "Failed to fetch team members");
        toast.error(response.message || "Failed to fetch team members");
      }
    } catch (err) {
      const errorMessage = "An unexpected error occurred. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
      console.error("Error fetching team members:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTeams(pagination.page, pagination.limit);
  }, []);

  const handlePageChange = (newPage) => {
    if (newPage !== pagination.page) {
      getTeams(newPage, pagination.limit);
    }
  };

  const handleLimitChange = (newLimit) => {
    if (newLimit !== pagination.limit) {
      getTeams(1, newLimit);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return format(new Date(dateString), "MMM dd, yyyy");
    } catch (error) {
      return dateString;
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} />
      <div className="container-fluid">
        <div className="row">
          <div className="com-md-12">
            <div className="card mb-4">
              <div className="card-header pb-0">
                <div className="flex-cs header">
                  <h5>Team Members</h5>
                  <NavLink to="/create-teams" className="btn bg-gradient-info">
                    <i className="fa-solid fa-plus" /> &nbsp; Add Member
                  </NavLink>
                </div>
              </div>
              <div className="card-body">
                {isLoading ? (
                  <div className="text-center py-5">
                    <Spinner />
                    <p className="mt-3">Loading team members...</p>
                  </div>
                ) : error ? (
                  <div className="alert alert-danger">
                    {error}
                    <button
                      className="btn btn-sm btn-outline-danger ms-3"
                      onClick={() =>
                        getTeams(pagination.page, pagination.limit)
                      }
                    >
                      Retry
                    </button>
                  </div>
                ) : (
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
                            Created Date
                          </th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {teams?.length > 0 ? (
                          teams.map((item, index) => (
                            <tr key={item._id || index}>
                              <td>
                                <div className="d-flex px-2 py-1">
                                  <div>
                                    {item?.profile?.s3Url ? (
                                      <img
                                        src={item?.profile?.s3Url}
                                        className="avatar avatar-sm me-3"
                                        alt={`${item.firstName} ${item.lastName}`}
                                      />
                                    ) : (
                                      <div className="avatar avatar-sm me-3 bg-secondary text-white d-flex align-items-center justify-content-center">
                                        {item.firstName?.charAt(0)}
                                        {item.lastName?.charAt(0)}
                                      </div>
                                    )}
                                  </div>
                                  <div className="d-flex flex-column justify-content-center">
                                    <h6 className="mb-0 text-sm">
                                      {item?.firstName} {item?.lastName}
                                    </h6>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <p className="text-xs text-center font-weight-bold mb-0">
                                  {item?.designation || "N/A"}
                                </p>
                              </td>
                              <td className="align-middle text-center">
                                <span className="text-secondary text-xs font-weight-bold">
                                  {formatDate(
                                    item?.createdAt || item?.createdDate
                                  )}
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
                                  data-bs-target="#modal-team-delete"
                                  onClick={() => setSelectedMember(item)}
                                  className="btn-danger btn m-0 font-weight-bold text-xs"
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="4" className="text-center py-4">
                              No team members found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}

                {!isLoading && !error && pagination.totalDocs > 0 && (
                  <Pagination
                    page={pagination.page}
                    totalPages={pagination.totalPages}
                    hasPrevPage={pagination.hasPrevPage}
                    hasNextPage={pagination.hasNextPage}
                    totalDocs={pagination.totalDocs}
                    limit={pagination.limit}
                    onPageChange={handlePageChange}
                    onLimitChange={handleLimitChange}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <DeleteModal
        member={selectedMember}
        onDeleteSuccess={() => getTeams(pagination.page, pagination.limit)}
      />
    </>
  );
};

export default TeamList;
