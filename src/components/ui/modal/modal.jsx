import { Backdrop } from "@components/ui";
import propTypes from "prop-types";
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
  children: propTypes.oneOfType([propTypes.string, propTypes.node]),
  showModal: propTypes.bool.isRequired,
  exitModal: propTypes.func.isRequired,
};

export default memo(Modal);
