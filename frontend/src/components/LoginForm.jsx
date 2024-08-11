/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable functional/no-expression-statement */

import React from "react";
import { useTranslation } from "react-i18next";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../slices/authSlice";

const LoginForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    username: "",
    password: "",
  };

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      await dispatch(login(values)).unwrap();
      navigate("/");
    } catch {
      setErrors({ serverError: t("login.errors.wrongLoginOrPasswordError") });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ isSubmitting, errors }) => (
        <Form className="col-12 col-md-6 mt-3 mt-md-0">
          <h1 className="text-center mb-4">{t("login.enter")}</h1>
          <div className="form-floating mb-3">
            <Field
              name="username"
              type="text"
              autoComplete="username"
              required
              placeholder={t("login.username")}
              id="username"
              className="form-control"
            />
            <label htmlFor="username">{t("login.username")}</label>
          </div>
          <div className="form-floating mb-4">
            <Field
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder={t("formCommonFields.password")}
              id="password"
              className="form-control"
            />
            <label className="form-label" htmlFor="password">
              {t("formCommonFields.password")}
            </label>
          </div>
          {errors.serverError && (
            <div className="alert alert-danger">{errors.serverError}</div>
          )}
          <button
            type="submit"
            className="w-100 mb-3 btn btn-outline-primary"
            disabled={isSubmitting}
          >
            {t("login.enter")}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
