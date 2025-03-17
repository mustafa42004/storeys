import { useMutation } from "@tanstack/react-query";
import ContactService from "../../../services/contact.service";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Content = ({ heading }) => {
  const { mutate: createContact, isLoading } = useMutation({
    mutationFn: ContactService.createContact,
    onSuccess: () => {
      toast.success("Contact created successfully");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "An error occurred");
    },
  });

  // Define validation schema using Yup
  const ContactSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("First name is required"),
    lastName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string()
      .matches(
        /^(\+\d{1,3})?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
        "Invalid phone number"
      )
      .required("Phone number is required"),
    message: Yup.string()
      .min(10, "Message is too short")
      .required("Message is required"),
  });

  // Initial form values
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  };

  const handleSubmit = (values, { resetForm }) => {
    createContact(values);
    resetForm();
  };

  return (
    <>
      <div className="form-content">
        <h4 className="font-lg light text-left lh-36 fs-36">
          {heading || "List Your Property with Storeys \nReal Estate"}
        </h4>
        <h6 className="font-sm light text-left lh-24 fs-16 medium">
          At Storeys, we believe in adding as much value as possible when you
          agree to list your property for sale exclusively!
        </h6>

        <Formik
          initialValues={initialValues}
          validationSchema={ContactSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="grid-cs gap-30 w-80">
                <div>
                  <label htmlFor="firstName" className="font-sm mb-2 light">
                    First Name
                  </label>
                  <Field
                    id="firstName"
                    name="firstName"
                    type="text"
                    className={`w-100 text-white ${
                      errors.firstName && touched.firstName ? "error-input" : ""
                    }`}
                    placeholder="First Name"
                  />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="error-message font-sm mt-2 text-danger text-left"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="font-sm mb-2 light">
                    Last Name
                  </label>
                  <Field
                    id="lastName"
                    name="lastName"
                    type="text"
                    className={`w-100 text-white ${
                      errors.lastName && touched.lastName ? "error-input" : ""
                    }`}
                    placeholder="Last Name"
                  />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="error-message font-sm mt-2 text-danger text-left"
                  />
                </div>
              </div>

              <div className="grid-cs gap-30 w-80 my-4">
                <div>
                  <label htmlFor="email" className="font-sm mb-2 light">
                    Email Address
                  </label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    className={`w-100 text-white ${
                      errors.email && touched.email ? "error-input" : ""
                    }`}
                    placeholder="Email Address"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error-message font-sm mt-2 text-danger text-left"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="font-sm mb-2 light">
                    Mobile Number
                  </label>
                  <Field
                    id="phone"
                    name="phone"
                    type="text"
                    className={`w-100 text-white ${
                      errors.phone && touched.phone ? "error-input" : ""
                    }`}
                    placeholder="Mobile Number"
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="error-message font-sm mt-2 text-danger text-left"
                  />
                </div>
              </div>

              <div className="w-100">
                <label htmlFor="message" className="font-sm mb-2 light">
                  Description
                </label>
                <Field
                  as="textarea"
                  id="message"
                  name="message"
                  rows={5}
                  className={`w-100 text-white ${
                    errors.message && touched.message ? "error-input" : ""
                  }`}
                  placeholder="Enter a Brief Description"
                />
                <ErrorMessage
                  name="message"
                  component="div"
                  className="error-message font-sm mt-2 text-danger text-left"
                />
              </div>

              <button
                type="submit"
                className="cs-btn light mt-4"
                disabled={isLoading}
              >
                {isLoading ? "Submitting..." : "Submit"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Content;
