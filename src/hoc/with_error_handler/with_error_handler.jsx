import React, { useState, useEffect } from "react";

import Modal from "../../components/ui/modal/modal";

const withErrorHandler = (WrappedComponents, axios) => {
  useEffect(() => {
    axios.interceptors.response.use(null, (error) => {});
  });

  return (props) => (
    <>
      <Modal showModal>sum shit didn't work</Modal>
      <WrappedComponents {...props} />
    </>
  );
};

export default withErrorHandler;
