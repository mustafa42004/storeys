import { useState } from "react";
import { useFormik } from "formik";
import AddMember from "./AddMember";
import { create, update } from "../../../../services/TeamService";
import { toast } from "react-toastify";
import Spinner from "../../../shared/Spinner/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  handlePostTeam,
  handleUpdateTeam,
} from "../../../../redux/TeamDataSlice";

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

  const step1 = (data) => {
    form.setValues(data);
  };

  useEffect(() => {
    if (id) {
      const team = teams?.find((team) => team._id === id);
      if (team) {
        setInitialValues(team);
      }
    }
  }, [id, teams]);

  const onCreate = async (formData) => {
    setIsLoading(true);
    try {
      const response = await create(formData);
      if (response.success) {
        dispatch(handlePostTeam(response.result));
        toast.success("Team Member Added!");
        navigate(`/teams`);
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
      if (response.success) {
        dispatch(handleUpdateTeam(response.result));
        toast.success("Team Member Updated!");
        navigate(`/teams`);
      }
    } catch (error) {
      console.error("Error updating team member:", error);
      toast.error("Failed to update team member. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const form = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: async (values) => {
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
    },
  });

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
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Teams;
