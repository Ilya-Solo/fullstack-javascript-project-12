import React from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signUp } from "../slices/authSlice";

const CustomErrorMessage = () => (
  <div className="invalid-tooltip">Неверные имя пользователя или пароль</div>
);

const SignUpForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    username: "",
    password: "",
    passwordConfirmation: "",
  };

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      await dispatch(signUp(values)).unwrap(); // Ждем завершения регистрации
      navigate("/"); // Переход после успешной регистрации
    } catch (error) {
      console.log(error);
      if (error.response && error.statusCode === 409) {
        setErrors({ serverError: "Пользователь уже существует" });
      } else {
        setErrors({ serverError: "Произошла ошибка. Попробуйте снова." });
      }
    } finally {
      setSubmitting(false); // Сброс статуса отправки после завершения всех операций
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
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
              className="form-control"
            />
            <label htmlFor="username">Имя пользователя</label>
          </div>
          <div className="form-floating mb-4">
            <Field
              name="password"
              type="password"
              autoComplete="new-password"
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
          <div className="form-floating mb-4">
            <Field
              name="passwordConfirmation"
              type="password"
              required
              placeholder="Подтвердите пароль"
              id="passwordConfirmation"
              className="form-control"
            />
            <label className="form-label" htmlFor="passwordConfirmation">
              Подтвердите пароль
            </label>
            {errors.serverError && <CustomErrorMessage />}
          </div>
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
