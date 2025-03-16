import { useState, useEffect, useCallback } from "react";
import { useFormik } from "formik";
import AddMember from "./AddMember";
import { create, update, fetchById } from "../../../../services/TeamService";
import { toast } from "react-toastify";
import Spinner from "../../../shared/Spinner/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  handlePostTeam,
  handleUpdateTeam,
} from "../../../../redux/TeamDataSlice";
import * as Yup from "yup";

const Teams = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const { id } = params;
  const teams = useSelector((state) => state.TeamDataSlice.teams);

  const [initialValues, setInitialValues] = useState({
    firstName: "",
    lastName: "",
    designation: "",
    profile: {
      file: null,
      preview: null,
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);

  // Validation schema
  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    designation: Yup.string().required("Designation is required"),
  });

  // Form initialization
  const form = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      if (!values.firstName || !values.lastName || !values.designation) {
        setErrors({
          firstName: !values.firstName ? "First name is required" : undefined,
          lastName: !values.lastName ? "Last name is required" : undefined,
          designation: !values.designation
            ? "Designation is required"
            : undefined,
        });
        return;
      }

      const formData = new FormData();
      formData.append("firstName", values.firstName);
      formData.append("lastName", values.lastName);
      formData.append("designation", values.designation);

      if (values.profile?.file) {
        formData.append("profile", values.profile.file);
      }

      if (!id) {
        formData.append("createdDate", new Date().toISOString());
        onCreate(formData);
      } else {
        formData.append("updatedDate", new Date().toISOString());
        onUpdate(formData);
      }
      setSubmitting(false);
    },
  });

  // IMPORTANT: This is the key fix - wrap step1 in useCallback with the right dependencies
  const step1 = useCallback((data) => {
    form.setValues(data);
  }, []); // Empty dependency array - step1 never changes

  useEffect(() => {
    if (id) {
      const team = teams?.find((team) => team._id === id);
      if (team) {
        setInitialValues(team);
      } else {
        // If not found in Redux store, fetch from API
        fetchTeamMember();
      }
    }
  }, [id, teams]);

  const fetchTeamMember = async () => {
    if (!id) return;

    setFetchLoading(true);
    try {
      const response = await fetchById(id);
      if (response.success || response.status === "success") {
        setInitialValues(response.data || response.result);
      } else {
        toast.error(response.message || "Failed to fetch team member details");
      }
    } catch (error) {
      console.error("Error fetching team member:", error);
      toast.error("An unexpected error occurred while fetching team member");
    } finally {
      setFetchLoading(false);
    }
  };

  const onCreate = async (formData) => {
    setIsLoading(true);
    try {
      const response = await create(formData);
      if (response.success || response.status === "success") {
        dispatch(handlePostTeam(response.data || response.result));
        toast.success("Team Member Added Successfully!");
        navigate(`/teams`);
      } else {
        toast.error(response.message || "Failed to create team member");
      }
    } catch (error) {
      console.error("Error creating team member:", error);
      toast.error("Failed to create team member. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const onUpdate = async (formData) => {
    setIsLoading(true);
    try {
      const dataModel = {
        id: id,
        formData,
      };
      const response = await update(dataModel);
      if (response.success || response.status === "success") {
        dispatch(handleUpdateTeam(response.data || response.result));
        toast.success("Team Member Updated Successfully!");
        navigate(`/teams`);
      } else {
        toast.error(response.message || "Failed to update team member");
      }
    } catch (error) {
      console.error("Error updating team member:", error);
      toast.error("Failed to update team member. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-md-8 text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading team member details...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <form onSubmit={form.handleSubmit}>
        <div className="row">
          <div className="col-md-12">
            <div className="flex-cs header pt-4 pb-2">
              <h5>{id ? "Edit Team Member" : "Add Team Member"}</h5>
              <button
                className="btn btn-primary btn-lg"
                disabled={isLoading}
                type="submit"
              >
                <i className="fa-solid fa-floppy-disk" /> &nbsp; Save{" "}
                {isLoading && <Spinner />}
              </button>
            </div>
          </div>
          <div className="col-md-12">
            <AddMember
              onDataChange={step1}
              teamData={id ? initialValues : null}
              errors={form.errors}
              touched={form.touched}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Teams;
