import { toast } from "react-toastify";
import { deleteProperty as deleteTeamMember } from "../../../../services/TeamService";
import { useState } from "react";
import Spinner from "../../../shared/Spinner/Spinner";
import { useDispatch } from "react-redux";
import { handleDeleteTeam } from "../../../../redux/TeamDataSlice";

const DeleteModal = ({ member, onDeleteSuccess }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = async () => {
    if (!member?._id) {
      toast.error("Team member ID is missing");
      return;
    }

    setIsDeleting(true);
    try {
      const response = await deleteTeamMember(member._id);

      if (response.success || response.status == "204") {
        // Update Redux store
        dispatch(handleDeleteTeam(member));

        toast.success("Team member deleted successfully");

        // Close the modal
        document.getElementById("modal-close-button").click();

        // Call the callback to refresh the team list
        if (onDeleteSuccess && typeof onDeleteSuccess === "function") {
          onDeleteSuccess();
        }
      } else {
        toast.error(response.message || "Failed to delete team member");
      }
    } catch (error) {
      console.error("Error deleting team member:", error);
      toast.error("An unexpected error occurred while deleting team member");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div
      className="modal fade"
      id="modal-team-delete"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="modal-team-delete"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h6 className="modal-title" id="modal-title-default">
              Delete Team Member
            </h6>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              id="modal-close-button"
            ></button>
          </div>
          <div className="modal-body">
            <p>
              Are you sure you want to delete team member{" "}
              <b>
                {member?.firstName} {member?.lastName}
              </b>
              ? This action cannot be undone.
            </p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn bg-gradient-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={isDeleting}
              className="btn bg-gradient-danger"
            >
              {isDeleting ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Deleting...
                </>
              ) : (
                "Delete Team Member"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
