import { Backdrop } from "@c/ui";
import propTypes from "prop-types";
import React, { memo } from "react";
import { modal } from "./modal.module.css";

function Modal({ exitModal, showModal, children }) {
  return (
    <>
      <Backdrop showModal={showModal} exitModal={exitModal} />
      <div
        style={{
          transform: showModal ? "translateY(0)" : "translateY(-100vh)",
          opacity: showModal ? "1" : "0",
        }}
        className={modal}
      >
        {children}
      </div>
    </>
  );
}

Modal.propTypes = {
  children: propTypes.node.isRequired,
  showModal: propTypes.bool.isRequired,
  exitModal: propTypes.func.isRequired,
};

export default memo(Modal);
