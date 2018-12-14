import React from "react";
import "./Modal.css";

export default function Modal({ handleClose, isOpened, children }) {
  const showHideClassName = isOpened
    ? "modal display-block"
    : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <div className="proto-button-close" onClick={handleClose}>
          Close
        </div>
      </section>
    </div>
  );
};
