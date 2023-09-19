import { Modal } from "@components/ui";
import xs from "@src/xs";
import React, { useEffect, useState } from "react";

function ErrorHandler(Wrapper) {
  return function (props) {
    const [error, setError] = useState(null);

    const dismissError = () => {
      setError(null);
    };

    useEffect(() => {
      const errorInterceptor = xs.interceptors.response.use(
        (response) => response,
        (err) => {
          setError(err);
          return Promise.reject(err);
        }
      );

      return () => {
        xs.interceptors.response.eject(errorInterceptor);
      };
    }, []);

    return (
      <>
        {error && (
          <Modal showModal={Boolean(error)} exitModal={dismissError}>
            {error.message}
          </Modal>
        )}
        <Wrapper {...props} />
      </>
    );
  };
}

export default ErrorHandler;
