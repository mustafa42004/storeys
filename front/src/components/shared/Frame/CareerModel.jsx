import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import CareerService from "./../../../services/career.service"; // Adjust the import path as necessary

const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  designation: Yup.string().required("Designation is required"),
  resume: Yup.mixed().required("Resume is required"),
});

const CareerModel = () => {
  const { mutate: createContact, isLoading } = useMutation({
    mutationFn: CareerService.createCareer,
    onSuccess: () => {
      toast.success("Application sent successfully");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "An error occurred");
    },
  });

  const handleSubmit = (values, { resetForm }) => {
    const formData = new FormData();
    console.log("runnning");
    formData.append("firstName", values.firstName);
    formData.append("lastName", values.lastName);
    formData.append("email", values.email);
    formData.append("phone", values.phone);
    formData.append("designation", values.designation);
    formData.append("resume", values.resume);

    createContact(formData);
    resetForm();
  };

  return (
    <div
      className="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-body">
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                designation: "",
                resume: null,
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ setFieldValue }) => (
                <Form>
                  <div className="mb-3">
                    <label className="form-label">First Name</label>
                    <Field name="firstName" className="form-control" />
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Last Name</label>
                    <Field name="lastName" className="form-control" />
                    <ErrorMessage
                      name="lastName"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <Field name="email" type="email" className="form-control" />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Phone Number</label>
                    <Field name="phone" className="form-control" />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Designation</label>
                    <Field name="designation" className="form-control" />
                    <ErrorMessage
                      name="designation"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Resume</label>
                    <input
                      type="file"
                      className="form-control"
                      onChange={(event) =>
                        setFieldValue("resume", event.target.files[0])
                      }
                    />
                    <ErrorMessage
                      name="resume"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="modal-footer">
                    <button
                      type="submit"
                      className="cs-btn"
                      disabled={isLoading}
                    >
                      {isLoading ? "Submitting..." : "Submit"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerModel;
