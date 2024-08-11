import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useTranslation } from "react-i18next";
import {
  channelUniqnessCheck,
  addChannelReqPost,
} from "../slices/channelsSlice";
import { getAuthInfo } from "../slices/authSlice";

const ChannelCreateModal = ({ showModal, handleCloseModal }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const channels = useSelector((state) => state.channels);
  const { token } = useSelector(getAuthInfo);
  const notify = () => {
    toast.success(t("notifications.addChannel"));
  };

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
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{t("channels.addChannelForm.title")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{ name: "" }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              notify();
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
      <ToastContainer />
    </>
  );
};

export default ChannelCreateModal;
