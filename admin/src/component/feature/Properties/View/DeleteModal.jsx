import { toast } from "react-toastify";
import { deleteProperty } from "../../../../services/PropertyService";
import { useState } from "react";
import Spinner from "../../../shared/Spinner/Spinner";
import { useDispatch } from "react-redux";
import { handleDeleteProperty } from "../../../../redux/PropertyDataSlice";

const DeleteModal = ({ property, onDeleteSuccess }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = async () => {
    if (!property?._id) {
      toast.error("Property ID is missing");
      return;
    }

    setIsDeleting(true);
    try {
      const response = await deleteProperty(property._id);

      if (response.status == "204") {
        dispatch(handleDeleteProperty(property));
        toast.success("Property deleted successfully");

        // Close the modal
        document.getElementById("modal-close-button").click();

        // Call the callback to refresh the property list
        if (onDeleteSuccess && typeof onDeleteSuccess === "function") {
          onDeleteSuccess();
        }
      } else {
        toast.error(response.message || "Failed to delete property");
      }
    } catch (error) {
      console.error("Error deleting property:", error);
      toast.error("An unexpected error occurred while deleting property");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div
      className="modal fade"
      id="modal-banner"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="modal-banner"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h6 className="modal-title" id="modal-title-default">
              Delete Property
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
              Are you sure you want to delete property <b>{property?.name}</b>?
              This action cannot be undone.
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
                "Delete Property"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
