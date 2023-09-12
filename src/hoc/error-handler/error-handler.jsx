import { Modal } from "@components/ui";
import React, { useEffect, useState } from "react";

function ErrorHandler(Wrapper, instance) {
  return function (props) {
    const [error, setError] = useState(null);

    useEffect(() => {
      instance.interceptors.request.use((request) => {
        setError(null);
        return request;
      });
      instance.interceptors.response.use(
        (response) => response,
        (err) => {
          setError(err);
        }
      );
    }, []);

    const dismissError = () => setError(null);

    return (
      <>
        <Modal showModal={Boolean(error)} exitModal={dismissError}>
          {error ? error.message : null}
        </Modal>
        <Wrapper {...props} />
      </>
    );
  };
}

export default ErrorHandler;
