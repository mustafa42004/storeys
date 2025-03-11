import { toast } from "react-toastify";
import { deleteProperty } from "../../../../services/PropertyService"
import { useState } from "react";
import Spinner from "../../../shared/Spinner/Spinner";
import { useDispatch } from "react-redux";
import { handleDeleteProperty } from "../../../../redux/PropertyDataSlice";

const DeleteModal = ({ property }) => {

    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch()

    const triggerDeleteAction = async() => {
        setIsLoading(true);
        const response = await deleteProperty(property._id)
        try {
            if(response.success){
                dispatch(handleDeleteProperty(property))
                setIsLoading(false);
                toast.success("property deleted !!")
                const modalInstance = bootstrap.Modal.getInstance(document.getElementById('modal-banner'));
                modalInstance.hide();
            } else {
                setIsLoading(false);
                toast.error("Failed to delete property")
            }    
        } catch (error) {
            setIsLoading(false);
            toast.error("Failed to delete property")
        } finally {
            setIsLoading(false);
        }
    }

  return (
    <>
        <div
            className="modal fade"
            id="modal-banner"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="modal-notification"
            aria-hidden="true"
        >
            <div
            className="modal-dialog cs-modal-width modal-danger modal-dialog-centered modal-"
            role="document"
            >
            <div className="modal-content">
                <div className="modal-header">
                <h6
                    className="modal-title"
                    id="modal-title-notification"
                >
                    <span className="fw-bold">Delete property</span>
                </h6>
                <button
                    type="button"
                    className="btn-close btn-lg text-dark"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                >
                    <span className="fs-18" aria-hidden="true">×</span>
                </button>
                </div>
                <div className="modal-body">
                    <h6 className="fw-600 fs-20">Do you want to delete {property?.name} ?</h6>
                </div>
                <div className="modal-footer">
                    <div className="flex-cs gap-2">
                        <button
                            type="button"
                            className="btn bg-secondary text-white m-0"
                            data-bs-dismiss="modal"
                        >
                            Close
                        </button>
                        <button type="button" onClick={triggerDeleteAction} className="btn text-white m-0 bg-danger">Delete {isLoading && <Spinner />}</button>
                    </div>
                </div>
            </div>
            </div>
        </div>
    </>
  )
}

export default DeleteModal