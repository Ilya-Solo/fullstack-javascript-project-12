import React from "react";
import { useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { channelUniqnessCheck } from "../slices/channelsSlice";

const ChannelRenameModal = ({
  show,
  handleClose,
  handleRename,
  initialName,
}) => {
  const { t } = useTranslation();
  const channels = useSelector((state) => state.channels);

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
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t("channels.renameChannel.title")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ name: initialName }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            handleRename(values.name);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <div className="mb-2">
                <Field
                  name="name"
                  id="name"
                  className={`form-control ${touched.name && errors.name ? "is-invalid" : ""}`}
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="d-flex justify-content-end">
                <Button
                  variant="secondary"
                  className="me-2"
                  onClick={handleClose}
                >
                  {t("formCommonFields.cancel")}
                </Button>
                <Button type="submit" variant="primary" disabled={isSubmitting}>
                  {t("formCommonFields.send")}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default ChannelRenameModal;
