import { Backdrop } from "@components/ui";
import pt from "prop-types";
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
  children: pt.oneOfType([pt.string, pt.node]),
  showModal: pt.bool.isRequired,
  exitModal: pt.func.isRequired,
};

export default memo(Modal);
