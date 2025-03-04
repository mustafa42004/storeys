import { useState } from "react";
import { useFormik } from 'formik';
import AddMember from "./AddMember";
import { create, update } from "../../../../services/TeamService"
import { toast } from "react-toastify";
import Spinner from "../../../shared/Spinner/Spinner";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { handlePostTeam, handleUpdateTeam } from "../../../../redux/TeamDataSlice";

const WorkProcess = () => {

    const dispatch = useDispatch()
    const params = useParams()
    const navigate = useNavigate()
    const { id } = params;
    const teams = useSelector((state) => state.TeamDataSlice.teams)

    const [initialValues, setInitialValues] = useState({
        team: null
    });
    const [isLoading, setIsLoading] = useState(false);

    const step1 = (data) => {
        form.setFieldValue('team', data);
    };


    useEffect(() => {
        if(id){
            setInitialValues({
                team: teams?.find(team => team._id === id)
            })
        }
    }, [id, params])

    const onCreate = async(formData) => {
        setIsLoading(true);
        try {
            const response = await create(formData);
            if (response.success) {
                dispatch(handlePostTeam(response.result))
                toast.success("Team Added !!");
                navigate(`/teams`)
            }
        } catch (error) {
            console.error("Error updating procedure:", error);
            toast.error("Failed to update procedure. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    const onUpdate = async(formData) => {
        setIsLoading(true);
        try {
            const dataModel = {
                id: id,
                formData
            }
            const response = await update(dataModel);
            if (response.success) {
                dispatch(handleUpdateTeam(response.result))
                toast.success("Team Updated !!");
                navigate(`/teams`)
            }
        } catch (error) {
            console.error("Error updating procedure:", error);
            toast.error("Failed to update procedure. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    const form = useFormik({
        initialValues,
        onSubmit: async (values) => {
            const formData = new FormData();
            if (!id) {
                values.team.forEach((member, index) => {
                    formData.append(`team[${index}][firstName]`, member.firstName);
                    formData.append(`team[${index}][lastName]`, member.lastName);
                    formData.append(`team[${index}][designation]`, member.designation);
                    formData.append(`team[${index}][createdDate]`, member.createdDate);
                    if (member.profile.file) {
                        formData.append(`team[${index}][profile]`, member.profile.file);
                    }
                });
                onCreate(formData);
            } else {
                formData.append(`firstName`, values.team.firstName);
                formData.append(`lastName`, values.team.lastName);
                formData.append(`designation`, values.team.designation);
                formData.append(`updatedDate`, values.team.createdDate);
                if (values.team?.profile?.file) {
                    formData.append(`profile`, values.team.profile.file);
                }
                onUpdate(formData);
            }
            
        }
    });

    return (
        <>
            <div className="container-fluid">
                <form onSubmit={form.handleSubmit}>
                    <div className="row">
                        <div className="col-md-12">
                            <div className=" flex-cs header pt-4 pb-2">
                                <h5>Edit Team</h5>
                                <button className="btn btn-primary btn-lg" disabled={isLoading} type="submit">
                                    <i className="fa-solid fa-floppy-disk" /> &nbsp; Save {isLoading && <Spinner />}
                                </button>
                            </div>
                        </div>
                        <div className="grid-cs">
                            <AddMember onDataChange={step1} teamData={id && initialValues.team} />
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default WorkProcess;
