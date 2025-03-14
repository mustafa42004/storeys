import { useEffect, useRef, useState } from "react";

const AddMember = ({ onDataChange, teamData }) => {
  const stepRefs = useRef([]);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    designation: "",
    profile: {
      file: null,
      preview: null,
    },
  });
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    if (teamData) {
      setData(teamData);
      setIsUpdated(true);
    }
  }, [teamData]);

  const profileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newData = {
        ...data,
        profile: {
          ...data.profile,
          file: file,
        },
      };

      // Generate preview
      const reader = new FileReader();
      reader.onload = () => {
        newData.profile.preview = reader.result;
        setData(newData);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    onDataChange(data);
  }, [data]);

  return (
    <div className="card my-3">
      <div className="card-header flex-cs justify-content-between pt-4 pb-2">
        <h6>
          {isUpdated
            ? `Edit ${data?.firstName} ${data?.lastName}`
            : "Add Member"}
        </h6>
      </div>
      <div className="card-body py-2">
        <input
          type="file"
          ref={stepRefs}
          onChange={profileUpload}
          className="hide-me"
        />
        <div className="work-process-card">
          <div
            onClick={() => stepRefs?.current?.click()}
            className="part1 flex-cs"
          >
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
              <input
                type="text"
                value={data?.firstName}
                onChange={(e) =>
                  setData({ ...data, firstName: e.target.value })
                }
                placeholder="Enter First Name"
                className="form-control"
              />
              <input
                type="text"
                value={data?.lastName}
                onChange={(e) => setData({ ...data, lastName: e.target.value })}
                placeholder="Enter Last Name"
                className="form-control"
              />
            </div>
            <div className="my-3">
              <textarea
                rows={3}
                value={data?.designation}
                onChange={(e) =>
                  setData({ ...data, designation: e.target.value })
                }
                placeholder="Enter Designation"
                className="form-control"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMember;
