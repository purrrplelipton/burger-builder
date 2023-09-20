import { Modal } from "@components/ui";
import React, { useEffect, useState } from "react";

function ErrorHandler(Wrapper, xs) {
  return function (props) {
    const [exception, setException] = useState(null);

    const dismissError = () => setException(null);

    const requestInterceptor = xs.interceptors.request.use((request) => {
      setException(null);
      return request;
    });

    const responseInterceptor = xs.interceptors.response.use(
      (response) => response,
      (error) => {
        setException(error);
        return error;
      }
    );

    useEffect(
      () => () => {
        xs.interceptors.request.eject(requestInterceptor);
        xs.interceptors.response.eject(responseInterceptor);
      },
      [requestInterceptor, responseInterceptor]
    );

    return (
      <>
        {exception && (
          <Modal showModal={Boolean(exception)} exitModal={dismissError}>
            {exception.message}
          </Modal>
        )}
        <Wrapper {...props} />
      </>
    );
  };
}

export default ErrorHandler;
