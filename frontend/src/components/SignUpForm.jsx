import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { signUp } from "../slices/authSlice";

const SignUpForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    username: "",
    password: "",
    passwordConfirmation: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, t("signUp.errors.wrongUsernameSize"))
      .max(20, t("signUp.errors.wrongUsernameSize"))
      .required(t("signUp.errors.requiredField")),
    password: Yup.string()
      .min(6, t("signUp.errors.shortPassword"))
      .required(t("signUp.errors.requiredField")),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref("password"), null], t("signUp.errors.passwordNotEqual"))
      .required(t("signUp.errors.requiredField")),
  });

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      await dispatch(signUp(values)).unwrap();
      navigate("/");
    } catch (error) {
      console.log(error);
      if (error.statusCode === 409) {
        setErrors({ serverError: t("signUp.errors.alreadyExistingUser") });
      } else {
        setErrors({ serverError: t("signUp.errors.defaultError") });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, errors }) => (
        <Form className="col-12 col-md-6 mt-3 mt-md-0">
          <h1 className="text-center mb-4">{t("signUp.title")}</h1>
          <div className="form-floating mb-3">
            <Field
              name="username"
              type="text"
              autoComplete="username"
              required
              placeholder={t("signUp.username")}
              id="username"
              className={`form-control ${errors.username ? "is-invalid" : ""}`}
            />
            <label htmlFor="username">{t("signUp.username")}</label>
            <ErrorMessage
              name="username"
              component="div"
              className="invalid-tooltip"
            />
          </div>
          <div className="form-floating mb-4">
            <Field
              name="password"
              type="password"
              autoComplete="new-password"
              required
              placeholder={t("formCommonFields.password")}
              id="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
            />
            <label className="form-label" htmlFor="password">
              {t("formCommonFields.password")}
            </label>
            <ErrorMessage
              name="password"
              component="div"
              className="invalid-tooltip"
            />
          </div>
          <div className="form-floating mb-4">
            <Field
              name="passwordConfirmation"
              type="password"
              required
              placeholder={t("signUp.confirmPassword")}
              id="passwordConfirmation"
              className={`form-control ${errors.passwordConfirmation ? "is-invalid" : ""}`}
            />
            <label className="form-label" htmlFor="passwordConfirmation">
              {t("signUp.confirmPassword")}
            </label>
            <ErrorMessage
              name="passwordConfirmation"
              component="div"
              className="invalid-tooltip"
            />
          </div>
          {errors.serverError && (
            <div className="alert alert-danger">{errors.serverError}</div>
          )}
          <button
            type="submit"
            className="w-100 mb-3 btn btn-outline-primary"
            disabled={isSubmitting}
          >
            {t("signUp.register")}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SignUpForm;
