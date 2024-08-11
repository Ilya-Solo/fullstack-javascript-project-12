import React, { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useTranslation } from "react-i18next";

const ChannelDeleteModal = ({ show, handleClose, handleDelete }) => {
  const { t } = useTranslation();
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleDelete();
    }
  };

  useEffect(() => {
    if (show) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [show]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t("channels.removeChannel.title")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t("channels.removeChannel.enshuranceQuestion")}</p>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" className="me-2" onClick={handleClose}>
            {t("formCommonFields.cancel")}
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            {t("formCommonFields.delete")}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ChannelDeleteModal;
