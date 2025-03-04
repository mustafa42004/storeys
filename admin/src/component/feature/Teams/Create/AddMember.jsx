import { useEffect, useRef, useState } from "react";

const AddMember = ({ onDataChange, teamData }) => {
    const stepRefs = useRef([]);

    const [data, setData] = useState([
        {
            firstName: '',
            lastName: '',
            designation: '',
            profile: {
                file: null,
                preview: null
            }
        }
    ]);
    const [isUpdated, setIsUpdated] = useState(false);

    useEffect(() => {
        if (teamData) {
            setData(teamData);
            setIsUpdated(true);
        }
    }, [teamData]);

    const bannerUpload = (index, e) => {
        const file = e.target.files[0];
        if (file) {
            const newData = [...data];
            newData[index].profile.file = file;

            // Generate preview
            const reader = new FileReader();
            reader.onload = () => {
                newData[index].profile.preview = reader.result;
                setData(newData);
            };
            reader.readAsDataURL(file);
        }
    };

    const profileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Deep clone the data object
            const newData = {
                ...data,
                profile: {
                    ...data.profile, // deep copy of profile
                    file: file // set the file
                }
            };
    
            // Generate preview
            const reader = new FileReader();
            reader.onload = () => {
                newData.profile.preview = reader.result; // set the preview
                setData(newData); // update state with new data
            };
            reader.readAsDataURL(file);
        }
    };
    
    

    useEffect(() => {
        onDataChange(data);
    }, [data]);

    const addMember = () => {
        setData([...data, {
            firstName: '',
            lastName: '',
            designation: '',
            profile: {
                file: null,
                preview: null
            }
        }]);
    };

    const removeMember = (index) => {
        const newData = [...data];
        newData.splice(index, 1);
        setData(newData);
    };

    return (
        <>
            {
                !isUpdated ? (
                    data?.map((item, index) => (
                        <div key={index} className="card my-3">
                            <div className="card-header flex-cs justify-content-between  pt-4 pb-2">
                                <h6>Member {index + 1}</h6>
                                {
                                    index !== 0 && (
                                        <button type="button" onClick={() => removeMember(index)} className="btn btn-danger">Remove</button>
                                    )
                                }
                            </div>
                            <div className="card-body py-2">
                                <input type="file" ref={el => stepRefs.current[index] = el} onChange={(e) => bannerUpload(index, e)} className="hide-me" />
                                <div className="work-process-card">
                                    <div onClick={() => stepRefs.current[index]?.click()} className="part1 flex-cs">
                                        {item.profile.preview ? (
                                            <img src={item.profile.preview} alt="" />
                                        ) : (
                                            <i className="fa-solid fa-plus fa-2xl" />
                                        )}
                                    </div>
                                    <div className="part2">
                                        <div className="my-3 grid-cs">
                                            <input type="text" value={item.firstName} onChange={(e) => {
                                                const newData = [...data];
                                                newData[index].firstName = e.target.value;
                                                setData(newData);
                                            }} placeholder="Enter First Name" className="form-control" />
                                            <input type="text" value={item.lastName} onChange={(e) => {
                                                const newData = [...data];
                                                newData[index].lastName = e.target.value;
                                                setData(newData);
                                            }} placeholder="Enter Last Name" className="form-control" />
                                        </div>
                                        <div className="my-3">
                                            <textarea rows={3} value={item.designation} onChange={(e) => {
                                                const newData = [...data];
                                                newData[index].designation = e.target.value;
                                                setData(newData);
                                            }} placeholder="Enter Designation" className="form-control" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div  className="card my-3">
                    <div className="card-header flex-cs justify-content-between  pt-4 pb-2">
                        <h6>Edit {data?.firstName} {data?.lastName}</h6>
                    </div>
                    <div className="card-body py-2">
                        <input type="file" ref={ stepRefs } onChange={(e) => profileUpload(e)} className="hide-me" />
                        <div className="work-process-card">
                            <div onClick={() => stepRefs?.current?.click()} className="part1 flex-cs">
                                {data?.profile?.preview ? (
                                    <img src={data?.profile?.preview} alt="" />
                                ) : data?.profile?.s3Url ? (
                                    <img src={data?.profile?.s3Url} alt="" />
                                ) : (
                                    <i className="fa-solid fa-plus fa-2xl" />
                                )}
                            </div>
                            <div className="part2">
                                <div className="my-3 grid-cs">
                                    <input type="text" value={data?.firstName} onChange={(e) => {
                                        setData({...data, firstName: e.target.value})
                                    }} placeholder="Enter First Name" className="form-control" />
                                    <input type="text" value={data?.lastName} onChange={(e) => {
                                        setData({...data, lastName: e.target.value})
                                    }} placeholder="Enter Last Name" className="form-control" />
                                </div>
                                <div className="my-3">
                                    <textarea rows={3} value={data?.designation} onChange={(e) => {
                                        setData({...data, designation: e.target.value})
                                    }} placeholder="Enter Designation" className="form-control" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                )
            }
            {
                !isUpdated && (
                    <div className="empty-layout" onClick={addMember}>
                        <i className="fa-solid fa-plus fa-2xl" />
                    </div>
                )
            }
        </>
    )
}

export default AddMember;