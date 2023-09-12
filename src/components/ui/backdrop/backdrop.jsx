import propTypes from "prop-types";
import React from "react";
import { backDrop } from "./backdrop.module.css";

function Backdrop({ showModal, exitModal }) {
  if (showModal) {
    return <div role="presentation" className={backDrop} onClick={exitModal} />;
  }
}

Backdrop.propTypes = {
  showModal: propTypes.bool.isRequired,
  exitModal: propTypes.func.isRequired,
};

export default Backdrop;
