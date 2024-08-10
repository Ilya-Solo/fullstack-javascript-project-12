import React from "react";
import { useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { channelUniqnessCheck } from "../slices/channelsSlice";

const ChannelRenameModal = ({
  show,
  handleClose,
  handleRename,
  initialName,
}) => {
  const channels = useSelector((state) => state.channels);

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Имя должно содержать не менее 3 символов")
      .max(20, "Имя должно содержать не более 20 символов")
      .required("Имя канала обязательно")
      .test("unique-channel", "Должно быть уникальным", (value) =>
        channelUniqnessCheck(channels, value),
      ),
  });

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Переименовать канал</Modal.Title>
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
                  Отменить
                </Button>
                <Button type="submit" variant="primary" disabled={isSubmitting}>
                  Отправить
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
