import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useTranslation } from "react-i18next";
import {
  channelUniqnessCheck,
  addChannelReqPost,
} from "../slices/channelsSlice";
import { getAuthInfo } from "../slices/authSlice";

const ChannelCreateElement = () => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const dispatch = useDispatch();

  const channels = useSelector((state) => state.channels);
  const { token } = useSelector(getAuthInfo);

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, t("channels.addChannelForm.errors.wrongUsernameSize"))
      .max(20, t("channels.addChannelForm.errors.wrongUsernameSize"))
      .required(t("channels.addChannelForm.errors.channelNameRequired"))
      .test(
        "unique-channel",
        t("channels.addChannelForm.errors.mustBeUniq"),
        (value) => channelUniqnessCheck(channels, value),
      ),
  });

  return (
    <>
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t("channels.title")}</b>
        <button
          type="button"
          className="p-0 text-primary btn btn-group-vertical"
          onClick={handleOpenModal}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="20"
            height="20"
            fill="currentColor"
          >
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
          </svg>
          <span className="visually-hidden">+</span>
        </button>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{t("channels.addChannelForm.title")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{ name: "" }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              dispatch(addChannelReqPost({ name: values.name, token }));
              setSubmitting(false);
              handleCloseModal();
            }}
          >
            {({ isSubmitting, touched, errors }) => (
              <Form>
                <div className="form-group">
                  <label htmlFor="name">
                    {t("channels.addChannelForm.channelName")}
                  </label>
                  <Field
                    name="name"
                    type="text"
                    id="name"
                    className={`form-control ${
                      errors.name && touched.name ? "is-invalid" : ""
                    }`}
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                <div className="d-flex justify-content-end mt-3">
                  <Button
                    variant="secondary"
                    onClick={handleCloseModal}
                    className="me-2"
                  >
                    {t("formCommonFields.cancel")}
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting}
                  >
                    {t("formCommonFields.send")}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ChannelCreateElement;
