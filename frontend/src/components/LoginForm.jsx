/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable functional/no-expression-statement */

import React from "react";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../slices/authSlice";

const CustomErrorMessage = () => (
  <div className="invalid-tooltip">Неверные имя пользователя или пароль</div>
);

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    username: "",
    password: "",
  };

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    await axios
      .post("/api/v1/login", values)
      .then((response) => {
        const { user, token } = response.data;
        dispatch(setCredentials({ user, token }));
        navigate("/");
      })
      .catch(() => {
        setErrors({ serverError: "Invalid username or password" });
      });
    setSubmitting(false);
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-6 mt-3 mt-md-0">
          <h1 className="text-center mb-4">Войти</h1>
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({ isSubmitting, errors }) => (
              <Form>
                <div className="form-floating mb-3">
                  <Field
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    placeholder="Ваш ник"
                    id="username"
                    className="form-control"
                  />
                  <label htmlFor="username">Ваш ник</label>
                </div>
                <div className="form-floating mb-4">
                  <Field
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    placeholder="Пароль"
                    id="password"
                    className="form-control"
                  />
                  <label className="form-label" htmlFor="password">
                    Пароль
                  </label>
                  {errors.serverError && <CustomErrorMessage />}
                </div>
                <button
                  type="submit"
                  className="w-100 mb-3 btn btn-outline-primary"
                  disabled={isSubmitting}
                >
                  Войти
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
