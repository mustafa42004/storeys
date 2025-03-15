import { toast } from "react-toastify";
import { deleteProperty as deleteAmenity } from "../../../../services/AmenityService";
import { useState } from "react";

const DeleteModal = ({ amenity, onDeleteSuccess }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!amenity?._id) {
      toast.error("Amenity ID is missing");
      return;
    }

    setIsDeleting(true);
    try {
      const response = await deleteAmenity(amenity._id);

      if (response.status == "204") {
        toast.success("Amenity deleted successfully");

        // Close the modal
        document.getElementById("modal-close-button").click();

        // Call the callback to refresh the amenity list
        if (onDeleteSuccess && typeof onDeleteSuccess === "function") {
          onDeleteSuccess();
        }
      } else {
        toast.error(response.message || "Failed to delete amenity");
      }
    } catch (error) {
      console.error("Error deleting amenity:", error);
      toast.error("An unexpected error occurred while deleting amenity");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div
      className="modal fade"
      id="modal-amenity"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="modal-amenity"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h6 className="modal-title" id="modal-title-default">
              Delete Amenity
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
              Are you sure you want to delete amenity <b>{amenity?.name}</b>?
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
                "Delete Amenity"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
