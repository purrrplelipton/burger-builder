import { Modal } from "@components/ui";
import React, { useEffect, useState } from "react";

function ErrorHandler(Wrapper, axios) {
  return function (props) {
    const [exception, setException] = useState(null);

    const dismissError = () => setException(null);

    const requestInterceptor = axios.interceptors.request.use((request) => {
      setException(null);
      return request;
    });

    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        setException(error);
        return Promise.reject(error);
      }
    );

    useEffect(
      () => () => {
        axios.interceptors.request.eject(requestInterceptor);
        axios.interceptors.response.eject(responseInterceptor);
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
