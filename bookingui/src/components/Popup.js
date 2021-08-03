import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";

function Popup() {
  const { t } = useTranslation();
  return (
    <div>
      <Modal>
        <Modal.Header closeButton>{t("popupDriverDetailsLbl")}</Modal.Header>
        <Modal.Body>
          <h2>Modal Body....</h2>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Popup;
