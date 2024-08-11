import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import leoProfanity from "leo-profanity";
import { addMessageReqPost } from "../slices/messagesSlice";
import { getChannelsInfo } from "../slices/channelsSlice";

const MessageSchema = Yup.object().shape({
  body: Yup.string().required("").min(1),
});

const MessageInput = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { activeChannelId } = useSelector(getChannelsInfo);
  const { username, token } = useSelector((state) => state.auth);

  return (
    <div className="mt-auto px-5 py-3">
      <Formik
        initialValues={{ body: "" }}
        validationSchema={MessageSchema}
        onSubmit={(values, { resetForm }) => {
          const cleanedValue = {
            ...values,
            body: leoProfanity.clean(values.body),
          };
          console.log(cleanedValue);
          dispatch(
            addMessageReqPost({
              ...cleanedValue,
              channelId: activeChannelId,
              username,
              token,
            }),
          );
          resetForm();
        }}
      >
        {({ errors, touched, isValid, dirty }) => (
          <Form noValidate className="py-1 border rounded-2" autoComplete="off">
            <div className="input-group has-validation">
              <Field
                name="body"
                aria-label={t("messages.newMessage")}
                placeholder={t("messages.enterMessage")}
                className={`border-0 p-0 ps-2 form-control ${errors.body && touched.body ? "is-invalid" : ""}`}
              />
              {errors.body && touched.body && (
                <div className="invalid-feedback">{errors.body}</div>
              )}
              <button
                type="submit"
                disabled={!(isValid && dirty)}
                className="btn btn-group-vertical"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  width="20"
                  height="20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"
                  />
                </svg>
                <span className="visually-hidden">
                  {t("formCommonFields.send")}
                </span>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MessageInput;
