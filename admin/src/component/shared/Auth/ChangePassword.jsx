import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { changePassword } from "../../../services/AuthService";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  //   const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  //   const [showpassword, setShowpassword] = useState(false);
  //   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Validation schema
  const validationSchema = Yup.object({
    currentPassword: Yup.string().required("Current password is required"),
    password: Yup.string()
      .required("New password is required")
      .min(8, "Password must be at least 8 characters")
      .notOneOf(
        [Yup.ref("currentPassword")],
        "New password must be different from current password"
      )
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    confirmPassword: Yup.string()
      .required("Please confirm your password")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const response = await changePassword({
          currentPassword: values.currentPassword,
          password: values.password,
        });

        if (response.success || response.status === "success") {
          toast.success("Password changed successfully");
          formik.resetForm();
        } else {
          toast.error(response.message || "Failed to change password");
        }
      } catch (error) {
        console.error("Error changing password:", error);
        toast.error("An unexpected error occurred");
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="container-fluid py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-xl-8">
          <div className="card">
            <div className="card-header p-3">
              <div className="row">
                <div className="col-md-8 d-flex align-items-center">
                  <h5 className="mb-0">Change Password</h5>
                </div>
              </div>
            </div>
            <div className="card-body p-3">
              <form onSubmit={formik.handleSubmit}>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="currentPassword" className="form-label">
                        Current Password <span className="text-danger">*</span>
                      </label>
                      <div className="input-group">
                        <input
                          type={"password"}
                          className={`form-control ${
                            formik.touched.currentPassword &&
                            formik.errors.currentPassword
                              ? "is-invalid"
                              : ""
                          }`}
                          id="currentPassword"
                          name="currentPassword"
                          placeholder="Enter your current password"
                          value={formik.values.currentPassword}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.currentPassword &&
                          formik.errors.currentPassword && (
                            <div className="invalid-feedback">
                              {formik.errors.currentPassword}
                            </div>
                          )}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="password" className="form-label">
                        New Password <span className="text-danger">*</span>
                      </label>
                      <div className="input-group">
                        <input
                          type={"password"}
                          className={`form-control ${
                            formik.touched.password && formik.errors.password
                              ? "is-invalid"
                              : ""
                          }`}
                          id="password"
                          name="password"
                          placeholder="Enter your new password"
                          value={formik.values.password}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.password && formik.errors.password && (
                          <div className="invalid-feedback">
                            {formik.errors.password}
                          </div>
                        )}
                      </div>
                      <small className="form-text text-muted">
                        Password must be at least 8 characters and include
                        uppercase, lowercase, number, and special character.
                      </small>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="confirmPassword" className="form-label">
                        Confirm New Password{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <div className="input-group">
                        <input
                          type={"password"}
                          className={`form-control ${
                            formik.touched.confirmPassword &&
                            formik.errors.confirmPassword
                              ? "is-invalid"
                              : ""
                          }`}
                          id="confirmPassword"
                          name="confirmPassword"
                          placeholder="Confirm your new password"
                          value={formik.values.confirmPassword}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />

                        {formik.touched.confirmPassword &&
                          formik.errors.confirmPassword && (
                            <div className="invalid-feedback">
                              {formik.errors.confirmPassword}
                            </div>
                          )}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12 mt-4">
                    <div className="d-flex justify-content-end">
                      <button
                        type="button"
                        className="btn btn-outline-secondary me-2"
                        onClick={() => formik.resetForm()}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="btn bg-gradient-primary"
                        disabled={isLoading || !formik.isValid}
                      >
                        {isLoading ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            Changing Password...
                          </>
                        ) : (
                          "Change Password"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
