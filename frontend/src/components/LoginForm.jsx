import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const LoginForm = () => {
  const initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('Required'),
    password: Yup.string().required('Required'),
  });

  const onSubmit = (values, { setSubmitting }) => {
    console.log('Form data', values);
    setSubmitting(false);
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-6 mt-3 mt-md-0">
          <h1 className="text-center mb-4">Войти</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting }) => (
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
                  <ErrorMessage name="username" component="div" className="text-danger" />
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
                  <label className="form-label" htmlFor="password">Пароль</label>
                  <ErrorMessage name="password" component="div" className="text-danger" />
                </div>
                <button type="submit" className="w-100 mb-3 btn btn-outline-primary" disabled={isSubmitting}>
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
