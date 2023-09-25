import { Backdrop } from "@components/ui";
import { bool, func, oneOfType, node, string } from "prop-types";
import React, { memo } from "react";
import { modal as content } from "./modal.module.css";

function Modal({ exitModal, showModal, children }) {
  return (
    <Backdrop show={showModal} onClick={exitModal}>
      <div
        role="presentation"
        onClick={(e) => e.stopPropagation()}
        className={content}
      >
        {children}
      </div>
    </Backdrop>
  );
}
Modal.defaultProps = { children: null };
Modal.propTypes = {
  children: oneOfType([string, node]),
  showModal: bool.isRequired,
  exitModal: func.isRequired,
};

export default memo(Modal);
