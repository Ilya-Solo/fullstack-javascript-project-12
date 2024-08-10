import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { signUp } from "../slices/authSlice";

const SignUpForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    username: "",
    password: "",
    passwordConfirmation: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, "Имя пользователя должно содержать от 3 до 20 символов")
      .max(20, "Имя пользователя должно содержать от 3 до 20 символов")
      .required("Имя пользователя обязательно"),
    password: Yup.string()
      .min(6, "Пароль должен содержать не менее 6 символов")
      .required("Пароль обязателен"),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref("password"), null], "Пароли должны совпадать")
      .required("Подтверждение пароля обязательно"),
  });

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      await dispatch(signUp(values)).unwrap();
      navigate("/");
    } catch (error) {
      console.log(error);
      if (error.statusCode === 409) {
        setErrors({ serverError: "Пользователь уже существует" });
      } else {
        setErrors({ serverError: "Произошла ошибка. Попробуйте снова." });
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
          <h1 className="text-center mb-4">Регистрация</h1>
          <div className="form-floating mb-3">
            <Field
              name="username"
              type="text"
              autoComplete="username"
              required
              placeholder="Имя пользователя"
              id="username"
              className={`form-control ${errors.username ? "is-invalid" : ""}`}
            />
            <label htmlFor="username">Имя пользователя</label>
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
              placeholder="Пароль"
              id="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
            />
            <label className="form-label" htmlFor="password">
              Пароль
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
              placeholder="Подтвердите пароль"
              id="passwordConfirmation"
              className={`form-control ${errors.passwordConfirmation ? "is-invalid" : ""}`}
            />
            <label className="form-label" htmlFor="passwordConfirmation">
              Подтвердите пароль
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
            Зарегистрироваться
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SignUpForm;
