import React, { useState, useEffect } from "react";

import Modal from "../../components/ui/modal/modal";
import Auxiliary from "../auxiliary/auxiliary";

const withErrorHandler = (WrappedComponents, axios) => {
  useEffect(() => {
    axios.interceptors.response.use(null, (error) => {});
  });

  return (props) => (
    <Auxiliary>
      <Modal showModal>sum shit didn't work</Modal>
      <WrappedComponents {...props} />
    </Auxiliary>
  );
};

export default withErrorHandler;
